'use client';

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';

// ---- Reuse the same TagHeading / Reveal / WindowChrome pattern from your homepage ----
// If you already export these from a shared file (e.g. components/ui.tsx), delete these
// three and import them instead, to avoid duplicate code.

function TagHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-sm tracking-wide text-amber-600 dark:text-amber-400">
        {`<${tag}>`}
      </p>
      <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-1">
        {title}
      </h3>
      <p className="font-mono text-sm tracking-wide text-amber-600 dark:text-amber-400 mt-1">
        {`</${tag}>`}
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function WindowChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      {label && (
        <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
          {label}
        </span>
      )}
    </div>
  );
}



type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  // 🔑 Replace these three with your own EmailJS values (see setup steps below the file)
  const SERVICE_ID = "service_gdtfo0f";
  const TEMPLATE_ID = "template_mazs86p";
  const PUBLIC_KEY = "aw8pNeD0tV_3miNzy";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-20" id="contact">
      <Reveal>
        <TagHeading tag="Contact" title="Let's build something" />
        <p className="text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300 max-w-2xl">
          Have a project in mind, or just want to say hi? Fill out the form
          below and I&apos;ll get back to you as soon as possible.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-14 grid md:grid-cols-5 gap-8">
          {/* Left: quick contact info card, terminal style */}
          <div className="md:col-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm h-fit">
            <WindowChrome label="contact.json" />
            <div className="p-6 font-mono text-sm text-slate-700 dark:text-slate-300 space-y-4">
              <div className="flex items-center gap-3">
                <HiOutlineMail className="text-amber-500 text-lg shrink-0" />
                <a
                  href="mailto:sabahatyaseen15@gmail.com"
                  className="hover:text-amber-500 transition-colors break-all"
                >
                  sabahatyaseen15@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <AiFillGithub className="text-amber-500 text-lg shrink-0" />
                <a
                  href="https://github.com/sabahatyaseen15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  github.com/sabahatyaseen15
                </a>
              </div>
              <div className="flex items-center gap-3">
                <AiFillLinkedin className="text-amber-500 text-lg shrink-0" />
                <a
                  href="https://www.linkedin.com/in/sabahat-yaseen-4a4193235/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  linkedin.com/in/sabahat-yaseen
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                {'// usually replies within 24 hours'}
              </p>
            </div>
          </div>

          {/* Right: the actual form */}
          <div className="md:col-span-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <WindowChrome label="message.tsx" />
            <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="from_name"
                  className="block font-mono text-xs text-amber-600 dark:text-amber-400 mb-1.5"
                >
                  name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="reply_to"
                  className="block font-mono text-xs text-amber-600 dark:text-amber-400 mb-1.5"
                >
                  email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs text-amber-600 dark:text-amber-400 mb-1.5"
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group/cta flex items-center gap-2 rounded-md bg-amber-600 hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-mono px-5 py-3 shadow-lg shadow-amber-600/25 hover:shadow-amber-500/30 transition-all"
              >
                {status === "sending" ? "sending..." : "send message"}
                {status !== "sending" && (
                  <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                )}
              </button>

              {status === "success" && (
                <p className="font-mono text-sm text-emerald-500">
                  ✓ message sent — thanks! I&apos;ll reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="font-mono text-sm text-rose-500">
                  ✕ something went wrong — please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}