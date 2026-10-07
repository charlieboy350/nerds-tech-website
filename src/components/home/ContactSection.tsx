"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { SERVICES, PRICING } from "@/data/content";
import { SITE } from "@/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-volt-500/70 focus:ring-2 focus:ring-volt-500/20";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Demo only: simulate a submit. Wire this to your API / form service.
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <section className="relative py-20 sm:py-28" aria-label="Contact">
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-500/10 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect the dots."
          sub="Tell us what you're building — we'll tell you how fast we can ship it. Replies within 24 hours, usually much faster."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info panel */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-8">
              <h3 className="font-display text-xl font-semibold text-white">Get in touch directly</h3>
              <p className="mt-2 text-sm text-slate-400">
                Prefer email or a quick call? We’re easy to reach — and a human always answers.
              </p>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-volt-500/15 text-volt-300 ring-1 ring-volt-500/30">
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Email</span>
                    <a href={`mailto:${SITE.email}`} className="mt-1 block font-medium text-white hover:text-volt-300">{SITE.email}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-volt-500/15 text-volt-300 ring-1 ring-volt-500/30">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Phone</span>
                    <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block font-medium text-white hover:text-volt-300">{SITE.phone}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-volt-500/15 text-volt-300 ring-1 ring-volt-500/30">
                    <MapPin className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Location</span>
                    <span className="mt-1 block font-medium text-white">{SITE.address}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-mint-400/20 bg-mint-400/5 p-5">
                  <p className="text-sm font-semibold text-mint-300">Average reply time: under 24 hours</p>
                  <p className="mt-1 text-xs text-slate-400">No spam, no pushy sales calls. Just a clear plan and a fixed quote.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-sm">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-mint-400/15 text-mint-300 ring-1 ring-mint-400/40"
                  >
                    <CheckCircle2 className="size-10" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">Message received!</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">
                    Thanks for reaching out — we’ll get back to you within 24 hours with next steps.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-medium text-volt-300 hover:text-volt-400"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">Name *</label>
                    <input id="name" name="name" required placeholder="Jane Cooper" className={inputCls} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email *</label>
                    <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputCls} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-300">Service</label>
                    <select id="service" name="service" className={inputCls} defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-300">Budget</label>
                    <select id="budget" name="budget" className={inputCls} defaultValue="">
                      <option value="" disabled>Select a range</option>
                      <option>Under $2k</option>
                      <option>$2k – $5k</option>
                      <option>$5k – $10k</option>
                      <option>$10k+</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">Project details *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="What are you building? What does success look like?" className={`${inputCls} resize-none`} />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-volt-500 to-mint-400 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-volt-500/25 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 sm:w-auto"
                    >
                      {sending ? "Sending…" : "Send message"}
                      <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <p className="mt-3 text-xs text-slate-500">
                      By submitting, you agree to be contacted about your inquiry. We never share your details.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
