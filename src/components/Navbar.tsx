"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/site";
import { SERVICES } from "@/data/content";
import ContactButton from "@/components/contact/ContactButton";

const linkBase =
  "block whitespace-nowrap px-4 py-2 text-[13px] font-bold uppercase tracking-[0.14em]";

function ServicesDropdown({ pathname }: { pathname: string }) {
  const isActive = pathname === "/services";
  return (
    <li className="group relative">
      <Link
        href="/services"
        aria-haspopup="true"
        aria-current={isActive ? "page" : undefined}
        className={`${linkBase} flex items-center gap-1.5 ${
          isActive ? "bg-cobalt text-white" : "text-zinc-400 hover:bg-white hover:text-black"
        }`}
      >
        Services
        <ChevronDown className="size-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      {/* Dropdown panel — solid block, no glass, no shadow */}
      <div className="invisible absolute left-0 top-full z-50 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-[560px] max-w-[calc(100vw-2.5rem)] border border-white/15 bg-ink-800 p-3">
          <div className="grid grid-cols-2 gap-1">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group/item flex items-start gap-3 px-3 py-2.5 hover:bg-cobalt"
                >
                  <span className="grid size-9 shrink-0 place-items-center bg-white/10 text-white">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {service.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-400 group-hover/item:text-zinc-200">
                      {service.short}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-2 border-t border-white/15 pt-2">
            <Link
              href="/services"
              className="flex items-center justify-between px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
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
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label={`${SITE.name} home`}>
          <Image
            src="/logo.png"
            alt={`${SITE.name} logo`}
            width={168}
            height={44}
            className="h-8 w-auto lg:h-9"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <ServicesDropdown pathname={pathname} />
          {NAV_LINKS.filter((link) => link.href !== "/services").map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${linkBase} ${
                    isActive ? "bg-cobalt text-white" : "text-zinc-400 hover:bg-white hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <ContactButton className="inline-flex items-center gap-1.5 whitespace-nowrap bg-cobalt px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white hover:bg-cream hover:text-black">
            Start a project
            <ArrowUpRight className="size-4" />
          </ContactButton>
        </div>

        <button
          className="grid size-10 place-items-center text-zinc-200 hover:bg-white hover:text-black md:hidden"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/15 bg-black md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              <li>
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className={`flex w-full items-center justify-between px-3 py-3 text-base font-bold uppercase tracking-wider ${
                    pathname === "/services" ? "bg-cobalt text-white" : "text-zinc-200 hover:bg-white hover:text-black"
                  }`}
                >
                  Services
                  <ChevronDown className={`size-5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
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
                            className="block px-6 py-2.5 text-sm text-zinc-400 hover:bg-white hover:text-black"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/services"
                          className="block px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
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
                    className={`block px-3 py-3 text-base font-bold uppercase tracking-wider ${
                      pathname === link.href ? "bg-cobalt text-white" : "text-zinc-200 hover:bg-white hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <ContactButton
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap bg-cobalt px-5 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-cream hover:text-black"
                >
                  Start a project <ArrowUpRight className="size-4" />
                </ContactButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
