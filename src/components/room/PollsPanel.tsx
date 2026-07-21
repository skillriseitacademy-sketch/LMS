import { useState } from "react";
import { Plus, Check, BarChart2 } from "lucide-react";
import { Poll } from "@/hooks/useWebRTC";
import { Button } from "@/components/ui/button";

interface PollsPanelProps {
  polls: Poll[];
  isHost: boolean;
  myPeerId: string;
  onCreatePoll: (question: string, options: string[]) => void;
  onVote: (pollId: string, optionId: string) => void;
}

export function PollsPanel({ polls, isHost, myPeerId, onCreatePoll, onVote }: PollsPanelProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);

  const handleCreate = () => {
    if (!newQuestion.trim() || newOptions.some(opt => !opt.trim())) return;
    onCreatePoll(newQuestion, newOptions);
    setIsCreating(false);
    setNewQuestion("");
    setNewOptions(["", ""]);
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1D24] overflow-y-auto p-4 space-y-6">
      {isCreating ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-white mb-2">Create a Poll</h3>
          <input
            type="text"
            placeholder="Ask a question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand/50"
          />
          <div className="space-y-2">
            {newOptions.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const opts = [...newOptions];
                  opts[i] = e.target.value;
                  setNewOptions(opts);
                }}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand/50"
              />
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNewOptions([...newOptions, ""])}
            className="text-brand hover:text-brand hover:bg-brand/10 w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Option
          </Button>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)} className="flex-1">Cancel</Button>
            <Button size="sm" onClick={handleCreate} disabled={!newQuestion.trim() || newOptions.some(opt => !opt.trim())} className="flex-1 bg-brand hover:bg-brand/90 text-brand-foreground">
              Launch Poll
            </Button>
          </div>
        </div>
      ) : (
        isHost && (
          <Button onClick={() => setIsCreating(true)} className="w-full bg-white/5 hover:bg-white/10 text-brand border border-brand/30">
            <Plus className="w-4 h-4 mr-2" /> Create New Poll
          </Button>
        )
      )}

      <div className="space-y-4">
        {polls.length === 0 && !isCreating ? (
          <div className="text-center text-white/40 text-sm py-8">
            <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
            No active polls
          </div>
        ) : (
          polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);
            const myVote = poll.options.find(opt => opt.votes.includes(myPeerId));

            return (
              <div key={poll.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h4 className="font-semibold text-white mb-4 leading-tight">{poll.question}</h4>
                <div className="space-y-2">
                  {poll.options.map((opt) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                    const isMyChoice = myVote?.id === opt.id;
                    
                    return (
                      <button
                        key={opt.id}
                        onClick={() => !myVote && onVote(poll.id, opt.id)}
                        disabled={!!myVote}
                        className={`w-full relative overflow-hidden rounded-xl border text-left p-3 transition-all ${
                          isMyChoice ? 'border-brand bg-brand/10' : 
                          myVote ? 'border-white/10 bg-black/20 opacity-70' : 
                          'border-white/10 bg-black/40 hover:border-white/30'
                        }`}
                      >
                        <div 
                          className="absolute inset-y-0 left-0 bg-brand/20 transition-all duration-500" 
                          style={{ width: `${myVote || isHost ? percentage : 0}%` }}
                        />
                        <div className="relative flex items-center justify-between z-10">
                          <span className={`text-sm font-medium ${isMyChoice ? 'text-brand' : 'text-white/90'}`}>
                            {opt.text}
                          </span>
                          <div className="flex items-center gap-2">
                            {(myVote || isHost) && <span className="text-xs text-white/50">{percentage}%</span>}
                            {isMyChoice && <Check className="w-4 h-4 text-brand" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-white/40 mt-3 text-right">
                  {totalVotes} vote{totalVotes !== 1 && 's'}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
