'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsChatDotsFill, BsX, BsSendFill } from 'react-icons/bs';

type Msg = { role: "user" | "bot"; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Sabahat's assistant. Ask me about her skills, projects, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [errored, setErrored] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    const nextMessages: Msg[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setThinking(true);
    setErrored(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // send prior turns (minus the greeting) so the model has context
          history: nextMessages.slice(1, -1),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setErrored(true);
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Sorry, something went wrong. Please try again in a moment." },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 transition-all hover:scale-105"
      >
        {open ? <BsX className="text-2xl" /> : <BsChatDotsFill className="text-xl" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-[28rem]">
          {/* Window chrome header */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              assistant.ai
            </span>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-amber-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                {m.text}
              </div>
            ))}

            {thinking && (
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg px-3 py-2 text-sm w-fit font-mono">
                typing...
              </div>
            )}

            {errored && (
              <p className="font-mono text-xs text-rose-500">
                ⚠️ Trouble reaching the assistant. You can also{" "}
                <a href="#contact" onClick={() => setOpen(false)} className="underline">
                  use the contact form
                </a>.
              </p>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={thinking}
              placeholder="Ask something..."
              className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={thinking || !input.trim()}
              aria-label="Send"
              className="flex items-center justify-center h-9 w-9 rounded-md bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors shrink-0"
            >
              <BsSendFill className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}  