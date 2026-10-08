import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { XIcon, InstagramIcon, LinkedInIcon, DribbbleIcon } from "@/components/SocialIcons";
import CopyrightYear from "@/components/CopyrightYear";
import { NAV_LINKS, SITE } from "@/site";
import { SERVICES } from "@/data/content";

const SOCIAL_ICONS = [
  { label: "X (Twitter)", href: SITE.socials.x, Icon: XIcon },
  { label: "Instagram", href: SITE.socials.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedInIcon },
  { label: "Dribbble", href: SITE.socials.dribbble, Icon: DribbbleIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center" aria-label={`${SITE.name} home`}>
              <Image
                src="/logo.png"
                alt={`${SITE.name} logo`}
                width={200}
                height={52}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {SITE.description}
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_ICONS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-steel-500/60 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer pages">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Pages</h3>
            <ul className="mt-4 space-y-2.5">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-steel-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-steel-400" />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-steel-400" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© <CopyrightYear /> {SITE.name}. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
