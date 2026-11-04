"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CloseIcon, MenuIcon } from "@/components/icons";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
const user = session?.user ?? null;
const handleLogout = async () => {
  await authClient.signOut();
  window.location.href = "/";
};
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /*
   * Profile image fallback: the saved Photo URL may be missing, unreachable
   * or a non-image link (e.g. an imgbb share page, which returns HTML).
   * Failure is tracked per URL, so a new image URL is re-tried automatically
   * after re-login or profile changes — no effect needed.
   */
  const [avatarFailedFor, setAvatarFailedFor] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const imageUrl = user?.image;
  const avatarFailed = imageUrl != null && avatarFailedFor === imageUrl;
  const closeAll = () => {
    setOpen(false);
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 shadow-soft backdrop-blur-md"
          : "border-b border-forest/10 bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={closeAll}>
          <Image
            src="/logo.png"
            alt="BookNook - Modern Library"
            width={280}
            height={260}
            priority
            className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
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
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open user menu"
                className="h-11 w-11 overflow-hidden rounded-full border-2 border-gold"
              >
                <img
                  key={imageUrl || "fallback"}
                  src={imageUrl && !avatarFailed ? imageUrl : "/avatar.svg"}
                  onError={() => setAvatarFailedFor(imageUrl ?? null)}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-forest/10 bg-ivory p-2 shadow-lift">
                  <p className="px-3 py-2 font-display text-base text-forest">{user.name}</p>
                  <Link
                    href="/profile"
                    onClick={closeAll}
                    className="block rounded-xl px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-forest/5 hover:text-forest"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
  onClick={handleLogout}
                    className="mt-1 w-full rounded-xl bg-forest px-3 py-2 text-sm font-semibold text-ivory transition-colors hover:bg-forest-deep"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center rounded-full border border-forest/20 px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
              >
                Register
              </Link>
            </>
          )}
        </div>

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

      <div
        className={`overflow-hidden border-forest/10 bg-ivory/95 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          open ? "max-h-[calc(100dvh-6rem)] border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="border-b border-forest/10 py-3.5 font-display text-lg text-forest transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={closeAll}
                className="border-b border-forest/10 py-3.5 font-display text-lg text-forest transition-colors hover:text-gold"
              >
                My Profile
              </Link>
              <button
                type="button"
  onClick={handleLogout}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="mt-5 flex gap-3">
              <Link
                href="/login"
                onClick={closeAll}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={closeAll}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}