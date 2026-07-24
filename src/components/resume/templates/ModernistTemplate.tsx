import { ResumeData } from "./MinimalistTemplate";

export function ModernistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 flex max-w-[800px] w-full min-h-[1056px] shadow-sm" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight break-words">{data.firstName}<br/>{data.lastName}</h1>
          <p className="text-sm font-semibold text-primary uppercase mt-2 tracking-wider">{data.title}</p>
        </div>
        
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact</h2>
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-gray-400">email</span> {data.email}</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-gray-400">phone</span> {data.phone}</span>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8 bg-white">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6">Experience</h2>
        <div className="space-y-8">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="relative pl-4 border-l-2 border-primary/20">
              <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1.5"></div>
              <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
              <p className="text-md font-medium text-gray-700 mb-1">{exp.employer}</p>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-3">{exp.startDate} - {exp.endDate}</span>
              <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
