"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";

interface ContactButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Drop-in replacement for <Link href="/contact"> — opens the
 * global contact modal instead of navigating to the contact page.
 */
export default function ContactButton({ children, className, onClick }: ContactButtonProps) {
  const { openContact } = useContactModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openContact();
      }}
    >
      {children}
    </button>
  );
}
