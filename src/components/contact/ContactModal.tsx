"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";
import { useContactModal } from "./ContactModalContext";

/**
 * Global contact modal — opened from any ContactButton across the site.
 * Structure (plain divs own all positioning; motion only animates opacity /
 * transform of the backdrop and card so layout can never be affected by
 * animation state):
 *   fixed inset-0 wrapper
 *   ├─ backdrop (absolute inset-0, fades)
 *   └─ scroll container (absolute inset-0 overflow-y-auto)
 *       └─ flex min-h-full → card uses m-auto so it stays centered when
 *          short and scrolls naturally from the top when tall.
 */
export default function ContactModal() {
  const { isOpen, closeContact } = useContactModal();

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeContact]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeContact}
            aria-hidden="true"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Scroll container — clicks on the empty area close the modal */}
          <div className="absolute inset-0 overflow-y-auto" onClick={closeContact}>
            <div className="flex min-h-full w-full p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative m-auto w-full max-w-xl rounded-3xl border border-brand-400/25 bg-ink-800 shadow-[0_0_90px_-18px_rgba(73,198,231,0.45)]"
              >
                {/* Glow accents */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 -right-16 h-56 w-72 rounded-full bg-aurora-400/15 blur-3xl"
                />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300">
                        Contact
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-bold text-white">
                        Start your{" "}
                        <span className="text-gradient">project</span>
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Tell us what you&apos;re building. Replies within 24 hours,
                        usually much faster.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeContact}
                      aria-label="Close contact form"
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-brand-400/40 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <ContactForm idPrefix="modal" onSent={closeContact} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
