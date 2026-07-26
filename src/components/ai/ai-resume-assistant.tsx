"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, ExternalLink, LoaderCircle, MessageSquareText, RotateCcw, Sparkles, Trash2, X } from "lucide-react";
import { aiApiUrl } from "@/config/profile";
import { trackEvent } from "@/lib/analytics";

type Source = { id: string; label: string; section: string; url: string | null };
type Message = { id: string; role: "user" | "assistant"; content: string; sources?: Source[]; failedQuestion?: string };
type ChatPayload = { answer: string; sources: Source[]; conversation_id: string };

const suggestions = [
  "What are Nagendra's strongest skills?",
  "Explain his LangGraph experience.",
  "Show his AWS experience.",
  "Tell me about his best GenAI project.",
  "What backend architecture experience does he have?",
  "Summarize Nagendra in 30 seconds.",
  "How would Nagendra design a production RAG system?",
  "How would he troubleshoot a slow FastAPI service?",
];

const welcome: Message = {
  id: "welcome",
  role: "assistant",
  content: "Ask about my resume, Python, FastAPI, GenAI, LangGraph, RAG, cloud experience, projects, role fit, or realistic engineering scenarios. Facts stay grounded in approved resume and portfolio sources; hypothetical recommendations are clearly labeled.",
};

export function AIResumeAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openChat = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("portfolio:open-ai-resume", openChat);
    return () => window.removeEventListener("portfolio:open-ai-resume", openChat);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("chat-open");
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.classList.remove("chat-open"); window.removeEventListener("keydown", onKeyDown); previousFocusRef.current?.focus(); };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    const normalized = question.trim();
    if (!normalized || loading || normalized.length > 800) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: normalized };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(`${aiApiUrl}/api/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: normalized, conversation_id: conversationId }) });
      const payload = (await response.json()) as ChatPayload & { detail?: string };
      if (!response.ok) throw new Error(payload.detail || "The assistant is temporarily unavailable.");
      setConversationId(payload.conversation_id);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: payload.answer, sources: payload.sources }]);
    } catch (error) {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: error instanceof Error ? error.message : "The assistant is temporarily unavailable.", failedQuestion: normalized }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(input); }
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }
  function clearChat() { setMessages([welcome]); setConversationId(undefined); setInput(""); }

  return (
    <>
      <button className="ai-fab" type="button" onClick={() => { previousFocusRef.current = document.activeElement as HTMLElement | null; setOpen(true); trackEvent("ask_ai_open", { source: "floating" }); }} aria-label="Open Ask My AI Resume" aria-haspopup="dialog"><MessageSquareText aria-hidden="true" /><span>Ask my AI resume</span></button>
      {open ? <div className="chat-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
        <section ref={panelRef} className="chat-panel" role="dialog" aria-modal="true" aria-labelledby="chat-title" aria-describedby="chat-grounding">
          <header className="chat-header"><div className="chat-title-icon"><Sparkles /></div><div><h2 id="chat-title">Ask My AI Resume</h2><p id="chat-grounding"><span /> Grounded in approved portfolio data</p></div><button type="button" onClick={clearChat} aria-label="Clear conversation" title="Clear conversation"><Trash2 /></button><button type="button" onClick={() => setOpen(false)} aria-label="Close AI resume assistant" title="Close assistant"><X /></button></header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => <article className={`chat-message ${message.role}`} key={message.id}>{message.role === "assistant" ? <div className="message-avatar"><Bot /></div> : null}<div className="message-bubble"><p>{message.content}</p>{message.sources?.length ? <div className="source-list" aria-label="Answer sources">{message.sources.map((source) => source.url ? <a key={source.id} href={source.url} onClick={() => setOpen(false)}>{source.label} · {source.section}<ExternalLink /></a> : <span key={source.id}>{source.label} · {source.section}</span>)}</div> : null}{message.failedQuestion ? <button className="retry-button" type="button" onClick={() => void ask(message.failedQuestion!)} disabled={loading}><RotateCcw /> Retry</button> : null}</div></article>)}
            {messages.length === 1 ? <div className="chat-suggestions"><p>Popular recruiter questions</p><div>{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void ask(suggestion)}>{suggestion}</button>)}</div></div> : null}
            {loading ? <div className="chat-message assistant"><div className="message-avatar"><Bot /></div><div className="message-bubble typing"><span /><span /><span /><em>Retrieving approved sources…</em></div></div> : null}
            <div ref={endRef} />
          </div>
          <form className="chat-composer" onSubmit={submit}><label className="sr-only" htmlFor="ai-question">Ask a question about Nagendra&apos;s experience</label><textarea ref={inputRef} id="ai-question" value={input} onChange={(event) => setInput(event.target.value.slice(0, 800))} onKeyDown={handleKeyDown} placeholder="Ask about Python, LangGraph, AWS, projects…" rows={2} disabled={loading} /><button type="submit" disabled={loading || !input.trim()} aria-label="Send question">{loading ? <LoaderCircle className="spinner" /> : <ArrowUp />}</button><small>{input.length}/800 · Enter to send</small></form>
          <footer className="chat-disclaimer">Answers are restricted to approved professional information. Verify details against the linked case studies.</footer>
        </section>
      </div> : null}
    </>
  );
}
