import { useEffect, useState } from "react";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Container from "../shared/Container";
import { bookingLinks } from "../../config/booking";
import logoLight from "@/assets/LRPSLogoLight.png";
import logoDark from "@/assets/LRPSLogoDark.png";
import { Button } from "@/components/ui/button";

// Shared nav links (used in desktop + mobile)
const navLinks = [
  { label: "Classes", href: "#classes" },
  { label: "About", href: "#about" },
  { label: "Mission", href: "#mission" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector("#home");

    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Transparent while the hero is mostly visible, solid once it scrolls away.
        setIsScrolled(entry.intersectionRatio < 0.9);
      },
      {
        root: null,
        threshold: [0.9],
      },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  const navLinkClass = `text-md transition-colors duration-300 ${
    isScrolled
      ? "text-foreground/80 hover:text-foreground"
      : "text-white/85 hover:text-white"
  }`;

  const menuIconClass = `inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 lg:hidden cursor-pointer ${
    isScrolled ? "text-foreground" : "text-white"
  }`;

  const ctaClass = `hidden rounded-full px-5 py-5 sm:inline-flex btn-scale-hover ${
    isScrolled
      ? "bg-primary text-primary-foreground"
      : "bg-white/90 text-black"
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-md shadow-sm"
          : "bg-transparent backdrop-blur-0 shadow-none"
      }`}
    >
      <Container className="flex items-center py-4">
        {/* Invisible spacer on mobile to balance the hamburger so the logo centres */}
        <div className="w-11 shrink-0 lg:hidden" aria-hidden="true" />

        {/* Logo — centred on mobile, left-aligned on desktop */}
        <div className="flex flex-1 items-center justify-center lg:flex-initial lg:justify-start">
          <a
            href="#home"
            className="block shrink-0 font-heading"
          >
            <img
              src={isScrolled ? logoDark : logoLight}
              alt="Leigh Reformer Pilates Studio logo"
              className="h-24 w-auto sm:h-14"
            />
          </a>
        </div>

        {/* Desktop nav — takes remaining space and centres */}
        <nav className="hidden items-center justify-center gap-6 lg:flex lg:flex-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          {/* CTA */}
          <Button asChild className={ctaClass}>
            <a href={bookingLinks.primary} target="_blank" rel="noreferrer">
              Book a Class
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>

          {/* Mobile / tablet menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className={menuIconClass} aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] border-l border-border bg-accent px-6 pt-8"
            >
              <div className="flex h-full flex-col">
                {/* Top branding */}
                <div className="border-b border-primary/20 pb-6">
                  <img
                    src={logoDark}
                    alt="Leigh Reformer Pilates Studio logo"
                    className="h-12 w-auto mx-auto"
                  />
                  <p className="mt-2 text-center text-xs uppercase tracking-[0.3em]">
                    Leigh Reformer Pilates Studio
                  </p>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col py-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <a
                        href={link.href}
                        className="border-b border-primary/20 py-4 text-base text-foreground/80 transition hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                {/* Bottom actions */}
                <div className="mt-auto space-y-3 pb-6">
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-primary w-full rounded-full px-5 py-5 btn-scale-hover"
                    >
                      <a
                        href={bookingLinks.primary}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Book a Class
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
