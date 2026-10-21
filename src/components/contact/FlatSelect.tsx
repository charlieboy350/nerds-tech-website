"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface FlatSelectProps {
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  tone?: "dark" | "light";
}

/**
 * Flat custom dropdown — replaces the native <select> so the open
 * list matches the solid design (native option lists render with
 * unstyleable OS chrome). Value rides in a hidden input so the
 * surrounding form's FormData works unchanged.
 */
export default function FlatSelect({ id, name, options, placeholder, tone = "dark" }: FlatSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const dark = tone === "dark";

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-3 border-2 px-4 py-3.5 text-left text-sm outline-none ${
          dark
            ? "border-white/25 bg-black text-cream focus:border-brand-400"
            : "border-black/60 bg-cream text-black focus:border-cobalt"
        }`}
      >
        <span className={value ? "" : "text-zinc-500"}>{value || placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className={`absolute inset-x-0 top-full z-30 mt-2 max-h-60 overflow-auto border-2 py-1 ${
            dark ? "border-white/25 bg-black" : "border-black/60 bg-cream"
          }`}
        >
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <li key={opt} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(opt);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm ${
                    selected
                      ? "bg-cobalt text-white"
                      : dark
                        ? "text-zinc-200 hover:bg-white hover:text-black"
                        : "text-zinc-800 hover:bg-black hover:text-cream"
                  }`}
                >
                  {opt}
                  {selected && <Check className="size-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
