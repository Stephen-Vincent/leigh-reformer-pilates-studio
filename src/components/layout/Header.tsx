import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Container from "../shared/Container";
import { useBookingModal } from "../shared/BookingModal";
import logoLight from "@/assets/LRPSlogoWhite.png";
import logoDark from "@/assets/LRPSlogo.png";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Classes", href: "/#classes", sectionId: "classes" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Reviews", href: "/#reviews", sectionId: "reviews" },
  { label: "Gallery", href: "/gallery", sectionId: null },
  { label: "FAQ", href: "/#faq", sectionId: "faq" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Header() {
  const { open: openBooking } = useBookingModal();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Hero intersection — controls transparent vs solid header
  useEffect(() => {
    const heroSection = document.querySelector("#home");

    if (!heroSection) {
      setIsScrolled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(entry.intersectionRatio < 0.9);
      },
      { root: null, threshold: [0.9] },
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Section tracking — which section is most visible in the viewport
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = navLinks
      .map((l) => l.sectionId)
      .filter(Boolean) as string[];

    const ratios: Record<string, number> = {};

    const observers = sectionIds.map((id) => {
      const el = document.querySelector(`#${id}`);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          const best = Object.entries(ratios).reduce<string>(
            (top, [key, val]) => (val > (ratios[top] ?? 0) ? key : top),
            sectionIds[0],
          );
          setActiveSection(ratios[best] > 0 ? best : "");
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  const isLinkActive = (link: (typeof navLinks)[0]) => {
    if (location.pathname === "/gallery" && link.href === "/gallery") return true;
    if (location.pathname === "/" && link.sectionId && link.sectionId === activeSection) return true;
    return false;
  };

  const navLinkClass = (link: (typeof navLinks)[0]) => {
    const active = isLinkActive(link);
    const base = "text-md transition-colors duration-300 relative pb-0.5";
    const colour = isScrolled
      ? "text-foreground/80 hover:text-foreground"
      : "text-white/85 hover:text-white";
    const underline = active
      ? `after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:rounded-full ${
          isScrolled ? "after:bg-foreground" : "after:bg-white"
        }`
      : "";
    return `${base} ${colour} ${underline}`;
  };

  const menuIconClass = `inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 lg:hidden cursor-pointer ${
    isScrolled ? "text-foreground" : "text-white"
  }`;

  const ctaClass = `hidden rounded-full px-5 py-5 lg:inline-flex btn-scale-hover ${
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
      <Container className="flex items-center py-3">
        {/* Invisible spacer on mobile to balance the hamburger so the logo centres */}
        <div className="w-11 shrink-0 lg:hidden" aria-hidden="true" />

        {/* Logo — centred on mobile/tablet, left-aligned on desktop */}
        <div className="flex flex-1 items-center justify-center lg:justify-start">
          <a href="/#home" className="block shrink-0 font-heading">
            <img
              src={isScrolled ? logoDark : logoLight}
              alt="Leigh Reformer Pilates Studio logo"
              className="h-10 w-auto sm:h-12"
            />
          </a>
        </div>

        {/* Desktop nav — truly centred between equal flex-1 columns */}
        <nav className="hidden items-center justify-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={navLinkClass(link)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 lg:flex-1">
          {/* CTA */}
          <Button className={`${ctaClass} cursor-pointer`} onClick={openBooking}>
            Book a Class
            <ArrowRight className="ml-2 h-4 w-4" />
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
                        className={`border-b border-primary/20 py-4 text-base transition hover:text-foreground ${
                          isLinkActive(link)
                            ? "font-medium text-foreground"
                            : "text-foreground/80"
                        }`}
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
                      className="bg-primary w-full cursor-pointer rounded-full px-5 py-5 btn-scale-hover"
                      onClick={openBooking}
                    >
                      Book a Class
                      <ArrowRight className="ml-2 h-4 w-4" />
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
