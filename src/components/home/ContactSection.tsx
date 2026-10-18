"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-label="Contact">
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel-500/10 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect the dots."
          sub="Tell us what you're building, we'll tell you how fast we can ship it. Replies within 24 hours, usually much faster."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info panel */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-8">
              <h3 className="font-display text-xl font-semibold text-white">Get in touch directly</h3>
              <p className="mt-2 text-sm text-slate-400">
                Prefer email or a quick call? We’re easy to reach, and a human always answers.
              </p>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-steel-500/15 text-steel-300 ring-1 ring-steel-500/30">
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Email</span>
                    <a href={`mailto:${SITE.email}`} className="mt-1 block font-medium text-white hover:text-steel-300">{SITE.email}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-steel-500/15 text-steel-300 ring-1 ring-steel-500/30">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Phone</span>
                    <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block font-medium text-white hover:text-steel-300">{SITE.phone}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-steel-500/15 text-steel-300 ring-1 ring-steel-500/30">
                    <MapPin className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">Location</span>
                    <span className="mt-1 block font-medium text-white">{SITE.address}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-5">
                  <p className="text-sm font-semibold text-brand-300">Average reply time: under 24 hours</p>
                  <p className="mt-1 text-xs text-slate-400">No spam, no pushy sales calls. Just a clear plan and a fixed quote.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-sm">
              <ContactForm idPrefix="section" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
