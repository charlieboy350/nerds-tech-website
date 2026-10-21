"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/content";
import { trackEvent } from "@/components/GoogleAnalytics";
import FlatSelect from "./FlatSelect";

const inputClsDark =
  "w-full border-2 border-white/25 bg-black px-4 py-3.5 text-sm text-cream placeholder:text-zinc-500 outline-none focus:border-brand-400";
const inputClsLight =
  "w-full border-2 border-black/60 bg-cream px-4 py-3.5 text-sm text-black placeholder:text-zinc-500 outline-none focus:border-cobalt";

/**
 * Reusable contact form — used in the homepage ContactSection
 * and inside the global ContactModal.
 */
export default function ContactForm({
  onSent,
  idPrefix = "cf",
  tone = "dark",
}: { onSent?: () => void; idPrefix?: string; tone?: "dark" | "light" } = {}) {
  const inputCls = tone === "light" ? inputClsLight : inputClsDark;
  const labelCls = tone === "light" ? "mb-2 block text-sm font-bold text-black" : "mb-2 block text-sm font-bold text-cream";
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
          className="grid size-20 place-items-center bg-cobalt text-white"
        >
          <CheckCircle2 className="size-10" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-black uppercase text-current">Message received!</h3>
        <p className="mt-2 max-w-sm text-sm opacity-70">
          Thanks for reaching out, we’ll get back to you within 24 hours with next steps.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-bold uppercase tracking-wider underline underline-offset-4"
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
        <label htmlFor={`${idPrefix}-name`} className={labelCls}>Name *</label>
        <input id={`${idPrefix}-name`} name="name" required placeholder="Jane Cooper" autoComplete="off" className={inputCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-em`} className={labelCls}>Email *</label>
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
        <label htmlFor={`${idPrefix}-service`} className={labelCls}>Service</label>
        <FlatSelect
          id={`${idPrefix}-service`}
          name="service"
          tone={tone}
          placeholder="Select a service"
          options={[...SERVICES.map((s) => s.title), "Not sure yet"]}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-budget`} className={labelCls}>Budget</label>
        <FlatSelect
          id={`${idPrefix}-budget`}
          name="budget"
          tone={tone}
          placeholder="Select a range"
          options={["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+"]}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={labelCls}>Project details *</label>
        <textarea id={`${idPrefix}-message`} name="message" required rows={5} placeholder="What are you building? What does success look like?" autoComplete="off" className={`${inputCls} resize-none`} />
      </div>
      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 border-2 border-red-600 bg-red-600/10 px-4 py-3 text-sm font-semibold text-red-500">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className={`inline-flex whitespace-nowrap w-full items-center justify-center gap-2 px-8 py-4 text-base font-bold uppercase tracking-wider disabled:opacity-60 sm:w-auto ${tone === "light" ? "bg-black text-cream hover:bg-cobalt hover:text-white" : "bg-cobalt text-white hover:bg-cream hover:text-black"}`}
        >
          {sending ? "Sending…" : "Send message"}
          <Send className="size-4" />
        </button>
        <p className="mt-3 text-xs opacity-60">
          By submitting, you agree to be contacted about your inquiry. We never share your details.
        </p>
      </div>
    </form>
  );
}
