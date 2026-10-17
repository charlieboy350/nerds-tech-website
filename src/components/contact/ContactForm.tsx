"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/content";
import { trackEvent } from "@/components/GoogleAnalytics";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-steel-500/70 focus:ring-2 focus:ring-steel-500/20";

/**
 * Reusable contact form — used in the homepage ContactSection
 * and inside the global ContactModal.
 */
export default function ContactForm({ onSent, idPrefix = "cf" }: { onSent?: () => void; idPrefix?: string } = {}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "Something went wrong. Please try again.");
      }
      setSent(true);
      // Marketing: feed Google Ads / GA4 a conversion so ad spend optimizes
      // toward real inquiries. No-op until the GA tag is configured.
      trackEvent("generate_lead", { method: "contact_form" });
      onSent?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[320px] flex-col items-center justify-center text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="grid size-20 place-items-center rounded-full bg-brand-400/15 text-brand-300 ring-1 ring-brand-400/40"
        >
          <CheckCircle2 className="size-10" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">Message received!</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-400">
          Thanks for reaching out, we’ll get back to you within 24 hours with next steps.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-steel-300 hover:text-steel-400"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot — invisible to humans, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />
      <div>
        <label htmlFor={`${idPrefix}-name`} className="mb-2 block text-sm font-medium text-slate-300">Name *</label>
        <input id={`${idPrefix}-name`} name="name" required placeholder="Jane Cooper" autoComplete="off" className={inputCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-em`} className="mb-2 block text-sm font-medium text-slate-300">Email *</label>
        <input
          id={`${idPrefix}-em`}
          name="em"
          type="text"
          inputMode="email"
          required
          placeholder="jane@company.com"
          autoComplete="new-password"
          data-lpignore="true"
          readOnly
          onFocus={(e) => {
            e.currentTarget.readOnly = false;
          }}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-service`} className="mb-2 block text-sm font-medium text-slate-300">Service</label>
        <select id={`${idPrefix}-service`} name="service" autoComplete="off" className={inputCls} defaultValue="">
          <option value="" disabled>Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-budget`} className="mb-2 block text-sm font-medium text-slate-300">Budget</label>
        <select id={`${idPrefix}-budget`} name="budget" autoComplete="off" className={inputCls} defaultValue="">
          <option value="" disabled>Select a range</option>
          <option>Under $2k</option>
          <option>$2k – $5k</option>
          <option>$5k – $10k</option>
          <option>$10k+</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className="mb-2 block text-sm font-medium text-slate-300">Project details *</label>
        <textarea id={`${idPrefix}-message`} name="message" required rows={5} placeholder="What are you building? What does success look like?" autoComplete="off" className={`${inputCls} resize-none`} />
      </div>
      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex whitespace-nowrap w-full items-center justify-center gap-2 rounded-full bg-steel-500 btn-gradient px-8 py-4 text-base font-semibold text-white shadow-xl shadow-steel-500/25 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 sm:w-auto"
        >
          {sending ? "Sending…" : "Send message"}
          <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="mt-3 text-xs text-slate-500">
          By submitting, you agree to be contacted about your inquiry. We never share your details.
        </p>
      </div>
    </form>
  );
}
