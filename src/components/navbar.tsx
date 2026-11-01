"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { CloseIcon, LogoMark, MenuIcon } from "@/components/icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 shadow-soft backdrop-blur-md"
          : "border-b border-forest/10 bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
          <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-forest">
              Book<span className="text-gold italic">Nook</span>
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-ink-muted">
              Modern Library
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink-muted transition-colors hover:text-forest"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#membership"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-forest"
          >
            Membership
          </Link>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
          >
            Borrow a Book
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest/5 lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-forest/10 bg-ivory/95 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          open ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-forest/10 py-3.5 font-display text-lg text-forest transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#membership"
            onClick={closeMenu}
            className="border-b border-forest/10 py-3.5 font-display text-lg text-forest transition-colors hover:text-gold"
          >
            Membership
          </Link>
          <Link
            href="/new-arrivals"
            onClick={closeMenu}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory"
          >
            Borrow a Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
