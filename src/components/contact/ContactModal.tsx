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
            className="absolute inset-0 bg-black/85"
          />

          {/* Scroll container — clicks on the empty area close the modal */}
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden" onClick={closeContact}>
            <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative m-auto w-full max-w-xl max-w-[calc(100vw-2rem)] border-2 border-white/20 bg-ink-800"
              >
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">
                        Contact
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-cream">Start your <span className="text-brand-500">project</span></h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        Tell us what you&apos;re building. Replies within 24 hours,
                        usually much faster.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeContact}
                      aria-label="Close contact form"
                      className="border border-white/25 p-2 text-zinc-200 hover:bg-white hover:text-black"
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
