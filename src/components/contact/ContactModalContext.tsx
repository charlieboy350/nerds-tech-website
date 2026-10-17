"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface ContactModalState {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ContactModalContext = createContext<ContactModalState | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);
  return (
    <ContactModalContext.Provider value={{ isOpen, openContact, closeContact }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalState {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
