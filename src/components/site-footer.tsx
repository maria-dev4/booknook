import Link from "next/link";
import { navLinks } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  LogoMark,
  XIcon,
} from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";

const supportLinks = [
  { label: "Membership plans", href: "/#membership" },
  { label: "Renew & returns", href: "/how-it-works" },
  { label: "Pickup lockers", href: "/how-it-works" },
  { label: "Gift a book", href: "/new-arrivals" },
  { label: "Accessibility", href: "/reviews" },
];

const contact = ["hello@booknook.club", "+1 (555) 014-8823", "34 Willow Lane, Greenfield Heights"];

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-300 hover:border-gold-soft hover:text-gold-soft"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-ivory">
     
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-forest-soft/40 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div>

<Link href="/" className="flex items-center gap-3">
  <LogoMark
    className="h-20 w-auto object-contain transition-transform duration-300"
    onDark
  />
</Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              A community library reimagined — meticulously curated shelves, seamless borrowing,
              and a warm corner of the internet for people who still love paper.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href="https://www.instagram.com" label="BookNook on Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://x.com" label="BookNook on X">
                <XIcon />
              </SocialLink>
              <SocialLink href="https://www.facebook.com" label="BookNook on Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#membership"
                  className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                >
                  Membership
                </Link>
              </li>
            </ul>
          </nav>

          {/* Help */}
          <nav aria-label="Support">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Support
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter + contact */}
          <div id="newsletter" className="scroll-mt-24">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              The Nook Letter
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-ivory/60">
              One considered email each month — new arrivals, staff picks and reading nights.
            </p>
            <NewsletterForm />
            <ul className="mt-6 flex flex-col gap-2 text-sm text-ivory/50">
              <li>
                <a
                  href="mailto:hello@booknook.club"
                  className="transition-colors hover:text-ivory"
                >
                  {contact[0]}
                </a>
              </li>
              <li>
                <a href="tel:+15550148823" className="transition-colors hover:text-ivory">
                  {contact[1]}
                </a>
              </li>
              <li>{contact[2]}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 sm:flex-row">
          <p className="text-xs text-ivory/40">
            © 2026 BookNook Library Club. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ivory/40">
            <Link href="/privacy" className="transition-colors hover:text-ivory/70">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory/70">
              Terms
            </Link>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
              Crafted for readers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
