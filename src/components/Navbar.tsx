"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/site";
import { SERVICES } from "@/data/content";

const linkBase =
  "block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 lg:px-5 lg:text-sm";

function ServicesDropdown({ pathname }: { pathname: string }) {
  const isActive = pathname === "/services";
  return (
    <li className="group relative">
      <Link
        href="/services"
        aria-haspopup="true"
        aria-current={isActive ? "page" : undefined}
        className={`${linkBase} flex items-center gap-1.5 ${
          isActive
            ? "bg-brand-400 bg-gradient-to-r from-brand-400 to-steel-500 text-white shadow-[0_6px_20px_-6px_rgba(69,179,212,0.7)]"
            : "text-slate-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        Services
        <ChevronDown className="size-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      {/* Dropdown panel */}
      <div className="invisible absolute left-0 top-full z-50 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-[560px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-1">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20 transition-colors duration-200 group-hover/item:bg-brand-500/20 group-hover/item:text-brand-200">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {service.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-400">
                      {service.short}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-2 border-t border-white/10 pt-2">
            <Link
              href="/services"
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-300 transition-colors duration-200 hover:bg-brand-500/10 hover:text-brand-200"
            >
              View all {SERVICES.length} services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center" aria-label={`${SITE.name} home`}>
          <Image
            src="/logo.png"
            alt={`${SITE.name} logo`}
            width={168}
            height={44}
            className="h-8 w-auto transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_16px_rgba(69,179,212,0.55)] lg:h-9"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md md:flex">
          <ServicesDropdown pathname={pathname} />
          {NAV_LINKS.filter((link) => link.href !== "/services").map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${linkBase} ${
                    isActive
                      ? "bg-brand-400 bg-gradient-to-r from-brand-400 to-steel-500 text-white shadow-[0_6px_20px_-6px_rgba(69,179,212,0.7)]"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-400 bg-gradient-to-r from-brand-400 to-steel-500 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(69,179,212,0.5)] transition-all duration-300 hover:shadow-[0_10px_36px_-6px_rgba(69,179,212,0.85)] hover:brightness-110 lg:px-5 lg:py-2.5 lg:text-sm"
          >
            Start a project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          className="grid size-10 place-items-center rounded-lg text-slate-300 hover:bg-white/5 md:hidden"
          onClick={() => {
            setOpen((v) => !v);
            setServicesOpen(false);
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              <li>
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-all duration-300 active:scale-[0.98] ${
                    pathname === "/services"
                      ? "bg-brand-500/10 text-white ring-1 ring-brand-400/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`size-5 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block rounded-lg px-6 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/services"
                          className="block rounded-lg px-6 py-2.5 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-500/10 hover:text-brand-200"
                        >
                          View all {SERVICES.length} services
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              {NAV_LINKS.filter((link) => link.href !== "/services").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-3 py-3 text-base font-medium transition-all duration-300 active:scale-[0.98] ${
                      pathname === link.href
                        ? "bg-brand-500/10 text-white ring-1 ring-brand-400/30"
                        : "text-slate-300 hover:bg-white/5 hover:pl-5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-brand-400 bg-gradient-to-r from-brand-400 to-steel-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(69,179,212,0.5)] transition-all duration-300 hover:brightness-110"
                >
                  Start a project <ArrowUpRight className="size-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
