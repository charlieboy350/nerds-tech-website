"use client";

import { useEffect, useState } from "react";

/** Renders the current year; computed after mount to satisfy prerender constraints. */
export default function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? "2026"}</>;
}
