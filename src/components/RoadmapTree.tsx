import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";

export type TreeNode = {
  id: string;
  label: string;
  type: "root" | "education" | "job";
  description?: string;
  children?: TreeNode[];
  _children?: TreeNode[]; // Collapsed children
  isExpanded?: boolean;
  isLoading?: boolean;
  level?: string;
  field?: string;
};

interface RoadmapTreeProps {
  initialNode: TreeNode;
}

export function RoadmapTree({ initialNode }: RoadmapTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TreeNode>(initialNode);
  const { session } = useAuth();
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);

  // We need a stable reference to data for D3 to update from events
  const dataRef = useRef(data);
  dataRef.current = data;

  const handleNodeClick = async (e: any, d: any) => {
    const node = d.data as TreeNode;
    if (node.isLoading) return;

    if (node.children) {
      // Collapse
      node._children = node.children;
      node.children = undefined;
      node.isExpanded = false;
      setData({ ...dataRef.current });
    } else if (node._children) {
      // Expand from cache
      node.children = node._children;
      node._children = undefined;
      node.isExpanded = true;
      setData({ ...dataRef.current });
    } else {
      // Fetch from API
      await fetchChildren(node, false);
    }
  };

  const fetchChildren = async (node: TreeNode, regenerate: boolean) => {
    node.isLoading = true;
    setData({ ...dataRef.current });

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${(supabase as any).realtime?.accessToken ?? ""}` } : {})
        },
        body: JSON.stringify({
          currentLevel: dataRef.current.level || dataRef.current.label,
          field: dataRef.current.field || dataRef.current.label,
          parentNodeId: node.id,
          parentContext: node.label,
          regenerate
        })
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      
      node.children = json.children;
      node.isExpanded = true;
    } catch (e) {
      console.error(e);
      alert("Failed to load path.");
    } finally {
      node.isLoading = false;
      setData({ ...dataRef.current });
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    
    const width = containerRef.current.clientWidth || 1000;
    const height = containerRef.current.clientHeight || 800;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Setup zoom
    const g = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on("zoom", (e) => {
        g.attr("transform", e.transform);
      });
    svg.call(zoom);

    // Initial transform to center root
    svg.call(zoom.transform, d3.zoomIdentity.translate(80, height / 2));

    const root = d3.hierarchy(data);
    const dx = 35; // vertical spacing
    const dy = 280; // horizontal spacing
    const tree = d3.tree<TreeNode>().nodeSize([dx, dy]);
    
    tree(root);

    // Links
    g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal<any, any>()
          .x(d => (d as any).y)
          .y(d => (d as any).x));

    const node = g.append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    // Node circles
    node.append("circle")
      .attr("fill", d => d.data.type === 'job' ? "#3b82f6" : d.data.type === 'education' ? "#a855f7" : "#10b981")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2)
      .attr("r", 5)
      .style("cursor", "pointer")
      .on("click", handleNodeClick);

    // Loading indicator
    const loadingNodes = node.filter(d => !!d.data.isLoading);
    loadingNodes.append("path")
      .attr("d", d3.arc()({
        innerRadius: 8,
        outerRadius: 10,
        startAngle: 0,
        endAngle: Math.PI * 1.5
      }) as string)
      .attr("fill", "#cbd5e1")
      .style("animation", "spin 1s linear infinite");

    // Text labels
    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children || d.data._children || d.data.isLoading ? -12 : 12)
      .attr("text-anchor", d => d.children || d.data._children || d.data.isLoading ? "end" : "start")
      .text(d => d.data.label)
      .attr("fill", "#cbd5e1")
      .style("font-size", "13px")
      .style("font-weight", d => (d.data.type === 'root' ? "bold" : "normal"))
      .style("cursor", "pointer")
      .on("click", handleNodeClick)
      .on("mouseenter", (e, d) => {
        d3.select(e.currentTarget).attr("fill", "#fff");
        setHoveredNode(d.data);
      })
      .on("mouseleave", (e, d) => {
        d3.select(e.currentTarget).attr("fill", "#cbd5e1");
        setHoveredNode(null);
      });

    // Add Regenerate button inline for nodes that have children (either expanded or collapsed)
    const regeneratableNodes = node.filter(d => !d.data.isLoading && d.data.type !== 'root' && !!(d.data.children || d.data._children));
    regeneratableNodes.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children || d.data._children ? -12 - d.data.label.length * 7 - 10 : 12 + d.data.label.length * 7 + 10)
      .attr("text-anchor", d => d.children || d.data._children ? "end" : "start")
      .text("↻")
      .attr("fill", "#64748b")
      .style("font-size", "14px")
      .style("cursor", "pointer")
      .on("mouseenter", (e) => d3.select(e.currentTarget).attr("fill", "#fff"))
      .on("mouseleave", (e) => d3.select(e.currentTarget).attr("fill", "#64748b"))
      .on("click", (e, d) => {
        e.stopPropagation();
        fetchChildren(d.data, true);
      });

  }, [data]);

  return (
    <div className="relative w-full h-[650px] bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-xl" ref={containerRef}>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      <svg ref={svgRef} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 bg-[#1e293b]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 pointer-events-none">
        <h3 className="text-sm font-semibold text-white">OSINT Style Roadmap</h3>
        <p className="text-xs text-slate-400 mt-1">Click nodes to expand/collapse. Zoom and pan to navigate.</p>
        <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-wider text-slate-300">
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Root</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#a855f7]"></span> Education</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> Job</span>
        </div>
      </div>
      
      {/* Info Panel for hovered node */}
      <div className={`absolute bottom-6 left-6 max-w-sm bg-[#1e293b] border border-slate-700 p-4 rounded-xl shadow-2xl transition-opacity duration-200 pointer-events-none ${hoveredNode && hoveredNode.description ? 'opacity-100' : 'opacity-0'}`}>
        {hoveredNode && (
          <>
            <strong className="text-white block mb-1 text-sm">{hoveredNode.label}</strong>
            <span className="capitalize text-[10px] font-bold tracking-wider mb-2 block" 
                  style={{ color: hoveredNode.type === 'job' ? "#3b82f6" : hoveredNode.type === 'education' ? "#a855f7" : "#10b981" }}>
              {hoveredNode.type}
            </span>
            {hoveredNode.description && <p className="text-xs text-slate-400 leading-relaxed">{hoveredNode.description}</p>}
          </>
        )}
      </div>
    </div>
  );
}
