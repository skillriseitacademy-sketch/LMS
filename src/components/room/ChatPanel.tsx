import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "@/hooks/useWebRTC";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  myPeerId: string;
}

export function ChatPanel({ messages, onSendMessage, myPeerId }: ChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1D24]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/40 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === myPeerId;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-medium text-white/70">{isMe ? 'You' : msg.senderName}</span>
                  <span className="text-[10px] text-white/40">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] ${isMe ? 'bg-brand text-brand-foreground rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 flex-shrink-0 bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors text-brand-foreground"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
