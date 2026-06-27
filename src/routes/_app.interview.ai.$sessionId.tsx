import { createFileRoute, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { interviewRoles } from "@/lib/mock-data";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Bot, CircleStop, Square } from "lucide-react";

type InterviewSearch = { role: string };

export const Route = createFileRoute("/_app/interview/ai/$sessionId")({
  validateSearch: (s: Record<string, unknown>): InterviewSearch => ({
    role: typeof s.role === "string" ? s.role : "frontend",
  }),
  head: () => ({ meta: [{ title: "AI interview — PlacePro LMS" }] }),
  component: AiInterview,
});

function AiInterview() {
  const { sessionId } = useParams({ from: "/_app/interview/ai/$sessionId" });
  const { role } = useSearch({ from: "/_app/interview/ai/$sessionId" });
  const navigate = useNavigate();
  const roleInfo = interviewRoles.find((r) => r.id === role) ?? interviewRoles[0];

  const [input, setInput] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const systemPrompt = `You are a senior interviewer for a ${roleInfo.title} role. Conduct a focused, encouraging 5-question interview. Ask ONE question at a time, wait for the candidate to reply, then ask a short follow-up or move to the next question. After the 5th question, say "Thanks — that wraps up our interview." Keep replies under 80 words.`;

  const initial: UIMessage[] = useMemo(
    () => [
      {
        id: "intro",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: `Hi! I'm your AI interviewer for the **${roleInfo.title}** role. Whenever you're ready, tell me a bit about your background — then we'll start with question one.`,
          },
        ],
      },
    ],
    [roleInfo.title],
  );

  const { messages, sendMessage, status, stop } = useChat({
    id: sessionId,
    messages: initial,
    transport,
    onError: (e) => console.error("[interview]", e),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text }, { body: { system: systemPrompt } });
  };

  const finish = () => {
    const transcript = messages
      .map((m) => {
        const text = m.parts
          .map((p) => (p.type === "text" ? p.text : ""))
          .join(" ")
          .trim();
        return {
          role: m.role === "user" ? "candidate" : "interviewer",
          text,
        };
      })
      .filter((m) => m.text);
    sessionStorage.setItem(
      `interview-${sessionId}`,
      JSON.stringify({ role: roleInfo.title, transcript }),
    );
    navigate({ to: "/interview/$sessionId/feedback", params: { sessionId } });
  };

  return (
    <>
      <TopBar title={`AI interview · ${roleInfo.title}`} />
      <div className="flex h-[calc(100vh-3.5rem)] flex-col">
        <div className="border-b border-border bg-card px-4 py-3 md:px-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{roleInfo.title}</p>
                <p className="text-xs text-muted-foreground">Mock interview · session {sessionId.slice(0, 6)}</p>
              </div>
            </div>
            <button
              onClick={finish}
              className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
            >
              <Square className="h-3 w-3" /> End & get feedback
            </button>
          </div>
        </div>

        <Conversation className="flex-1">
          <ConversationContent className="mx-auto w-full max-w-3xl">
            {messages.map((message) => {
              const text = message.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              return (
                <Message key={message.id} from={message.role}>
                  {message.role === "assistant" ? (
                    <MessageResponse>{text}</MessageResponse>
                  ) : (
                    <MessageContent>{text}</MessageContent>
                  )}
                </Message>
              );
            })}
            {status === "submitted" && (
              <div className="px-4 py-2">
                <Shimmer>Thinking…</Shimmer>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border bg-background px-4 py-3 md:px-6">
          <div className="mx-auto max-w-3xl">
            <PromptInput
              onSubmit={() => {
                onSubmit();
              }}
            >
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Type your answer…"
                autoFocus
              />
              <PromptInputFooter className="justify-end gap-2">
                {isLoading && (
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="inline-flex h-8 items-center gap-1 rounded-full border border-border px-3 text-xs text-muted-foreground hover:bg-muted"
                  >
                    <CircleStop className="h-3 w-3" /> Stop
                  </button>
                )}
                <PromptInputSubmit
                  status={status}
                  disabled={!input.trim() || isLoading}
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </div>
    </>
  );
}
