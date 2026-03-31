import { useState } from "react";
import Container from "../shared/Container";
import { bookingLinks } from "../../config/booking";

// Central list of navigation links so desktop and mobile menus stay in sync.
const navLinks = [
  { label: "Classes", href: "#classes" },
  { label: "About", href: "#about" },
  { label: "Mission", href: "#mission" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  // Controls whether the mobile/tablet menu is open.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the menu after a user taps any link.
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    // Sticky header stays visible while scrolling.
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#ece7df]/90 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand / logo area */}
          <a href="#top" className="block shrink-0" onClick={handleCloseMenu}>
            <p className="font-serif text-xl tracking-wide text-[#1f1d1a] sm:text-2xl">
              Studio Name
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/55 sm:text-[11px]">
              Reformer Pilates
            </p>
          </a>

          {/* Desktop navigation shows from large screens upwards. */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#1f1d1a] transition hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Primary CTA stays visible from small tablet size upwards. */}
            <a
              href={bookingLinks.primary}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#1f1d1a] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:inline-flex"
            >
              Book now
            </a>

            {/* Hamburger menu button is used on tablet and mobile. */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#1f1d1a] transition hover:bg-white lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M4 12h16" />
                  <path d="M4 6h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / tablet dropdown panel. Hidden on desktop. */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="mt-4 rounded-3xl border border-black/10 bg-[#f7f3ee] p-6 shadow-sm lg:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleCloseMenu}
                  className="border-b border-black/10 py-4 text-base text-[#1f1d1a] transition hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <a
                href={bookingLinks.primary}
                target="_blank"
                rel="noreferrer"
                onClick={handleCloseMenu}
                className="flex w-full items-center justify-center rounded-full bg-[#1f1d1a] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Book now
              </a>

              <a
                href={bookingLinks.timetable}
                target="_blank"
                rel="noreferrer"
                onClick={handleCloseMenu}
                className="flex w-full items-center justify-center rounded-full border border-[#1f1d1a] px-5 py-3 text-sm font-medium text-[#1f1d1a] transition hover:bg-black/5"
              >
                View timetable
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
