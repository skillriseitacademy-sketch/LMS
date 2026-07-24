import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/messages")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      userId: search.userId as string | undefined,
    };
  },
  component: MessagesPage,
});

type Conversation = {
  id: string;
  is_group: boolean;
  name: string | null;
  participants: { user_id: string; name: string; avatar_url: string | null }[];
  last_message: { body: string; created_at: string; sender_id: string } | null;
  unread_count: number;
};

type Message = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
  sender?: { name: string; avatar_url: string | null };
};

function MessagesPage() {
  const { session } = useAuth();
  const search = Route.useSearch();
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Conversations
  const fetchConversations = async () => {
    if (!session?.id) return;
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      const token = supabaseSession?.access_token;
      
      const res = await fetch("/api/chat/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
        
        // Handle auto-select or auto-create from query param
        if (search.userId) {
          const existingConv = data.find((c: Conversation) => 
            !c.is_group && c.participants.some(p => p.user_id === search.userId)
          );
          if (existingConv) {
            setActiveConvId(existingConv.id);
            // Remove userId from URL to avoid re-triggering
            router.navigate({ search: {} });
          } else {
            // Need to create new conversation
            const createRes = await fetch("/api/chat/conversations", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
              },
              body: JSON.stringify({ other_user_id: search.userId }),
            });
            if (createRes.ok) {
              const { conversationId } = await createRes.json();
              setActiveConvId(conversationId);
              router.navigate({ search: {} });
              fetchConversations(); // refresh list
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch conversations", err);
    } finally {
      setLoadingConvs(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [session]);

  // Fetch Messages for active conversation
  useEffect(() => {
    if (!activeConvId || !session?.id) return;

    let mounted = true;
    setLoadingMessages(true);

    const loadMessages = async () => {
      try {
        const { data: { session: supabaseSession } } = await supabase.auth.getSession();
        const token = supabaseSession?.access_token;
        const res = await fetch(`/api/chat/messages?conversation_id=${activeConvId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok && mounted) {
          const data = await res.json();
          setMessages(data.reverse()); // backend returns DESC, we want ASC for UI
          
          // Mark as read
          await fetch(`/api/chat/conversations/${activeConvId}/read`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
          });
          
          // Update unread count locally
          setConversations(prev => prev.map(c => 
            c.id === activeConvId ? { ...c, unread_count: 0 } : c
          ));
        }
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        if (mounted) setLoadingMessages(false);
      }
    };

    loadMessages();

    // Setup Realtime subscription for new messages
    const channel = supabase.channel(`chat:${activeConvId}`)
      .on("broadcast", { event: "new_message" }, (payload) => {
        if (mounted) {
          setMessages(prev => [...prev, payload.payload]);
          // Re-mark read
          supabase.auth.getSession().then(({ data: { session: s } }) => {
            fetch(`/api/chat/conversations/${activeConvId}/read`, {
              method: "PATCH",
              headers: { Authorization: `Bearer ${s?.access_token}` },
            });
          });
        }
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [activeConvId, session]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || !activeConvId || !session?.id) return;

    const messageText = newMessage.trim();
    setNewMessage(""); // optimistic clear
    setSending(true);

    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      const token = supabaseSession?.access_token;
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          conversation_id: activeConvId,
          body: messageText,
        }),
      });
      
      if (!res.ok) {
        toast.error("Failed to send message");
        setNewMessage(messageText); // restore
      } else {
        // Update local conversation list's last_message
        const newMsgData = await res.json();
        setConversations(prev => {
          const convs = prev.map(c => 
            c.id === activeConvId 
              ? { ...c, last_message: { body: messageText, created_at: new Date().toISOString(), sender_id: session.id } }
              : c
          );
          // Move to top
          const targetIndex = convs.findIndex(c => c.id === activeConvId);
          if (targetIndex > 0) {
            const target = convs.splice(targetIndex, 1)[0];
            convs.unshift(target);
          }
          return convs;
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setSending(false);
    }
  };

  const activeConv = conversations.find(c => c.id === activeConvId);
  const otherParticipant = activeConv?.participants.find(p => p.user_id !== session?.id);
  const convName = activeConv?.is_group 
    ? activeConv.name 
    : otherParticipant?.name || "Unknown User";
  const convAvatar = !activeConv?.is_group ? otherParticipant?.avatar_url : null;

  return (
    <>
      <TopBar breadcrumb={["App", "Messages"]} title="Messages" />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        
        {/* Sidebar - Conversation List */}
        <div className={`w-full md:w-80 border-r border-border bg-card flex flex-col ${activeConvId ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex-1 overflow-y-auto">
            {loadingConvs ? (
              <div className="flex justify-center p-8"><Loader2 className="animate-spin text-muted-foreground w-6 h-6" /></div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No messages yet. Find someone in the Feed to start a chat!
              </div>
            ) : (
              conversations.map(conv => {
                const other = conv.participants.find(p => p.user_id !== session?.id);
                const name = conv.is_group ? conv.name : (other?.name || "Unknown");
                const avatar = conv.is_group ? null : other?.avatar_url;
                
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full flex items-start gap-3 p-4 border-b border-border transition-colors hover:bg-muted/50 ${activeConvId === conv.id ? 'bg-brand/5 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent'}`}
                  >
                    <Avatar className="w-12 h-12 shrink-0 border border-border">
                      <AvatarImage src={avatar || undefined} />
                      <AvatarFallback className="bg-brand/10 text-brand font-bold text-sm">
                        {name?.substring(0,2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold text-sm truncate">{name}</h3>
                        {conv.last_message && (
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                            {new Date(conv.last_message.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${conv.unread_count > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                        {conv.last_message ? (
                          <>
                            {conv.last_message.sender_id === session?.id ? "You: " : ""}
                            {conv.last_message.body}
                          </>
                        ) : "No messages yet"}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <div className="w-2.5 h-2.5 rounded-full bg-brand shrink-0 mt-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col bg-card ${!activeConvId ? 'hidden md:flex' : 'flex'}`}>
          {!activeConvId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-muted/20">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">forum</span>
              <p className="text-lg font-medium text-foreground">Your Messages</p>
              <p className="text-sm mt-1 max-w-sm">Select a conversation from the sidebar or start a new one to connect with peers.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0">
                <button 
                  onClick={() => setActiveConvId(null)}
                  className="md:hidden p-2 -ml-2 rounded-full hover:bg-muted"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={convAvatar || undefined} />
                  <AvatarFallback className="bg-brand/10 text-brand font-bold text-sm">
                    {convName?.substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-sm text-foreground">{convName}</h2>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {loadingMessages ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand w-8 h-8" /></div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground p-8">
                    Send a message to start the conversation!
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isMine = msg.sender_id === session?.id;
                    const showAvatar = !isMine && (i === messages.length - 1 || messages[i+1]?.sender_id !== msg.sender_id);
                    
                    return (
                      <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} gap-2`}>
                        {!isMine && (
                          <div className="w-8 shrink-0 flex items-end">
                            {showAvatar && (
                              <Avatar className="w-8 h-8 border border-border">
                                <AvatarImage src={msg.sender?.avatar_url || undefined} />
                                <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                                  {msg.sender?.name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        )}
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-brand text-brand-foreground rounded-br-sm' : 'bg-card border border-border text-foreground rounded-bl-sm shadow-sm'}`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.body}</p>
                          <span className={`text-[9px] block mt-1 text-right ${isMine ? 'text-brand-foreground/70' : 'text-muted-foreground'}`}>
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-card border-t border-border shrink-0">
                <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full bg-muted border-0 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="w-12 h-12 rounded-full bg-brand text-brand-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
}
