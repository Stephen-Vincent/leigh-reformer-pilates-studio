import Container from "@/components/shared/Container";
import logoDark from "@/assets/LRPSLogoDark.png";

const navLinks = [
  { label: "Classes", href: "#classes" },
  { label: "About", href: "#about" },
  { label: "Mission", href: "#mission" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          {/* Left - Brand */}
          <div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <img
                src={logoDark}
                alt="Leigh Reformer Pilates Studio logo"
                className="mx-auto h-10 w-auto lg:mx-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em]">
                  Leigh Reformer Pilates Studio
                </p>
                <p className="text-center md:text-left text-[9px] text-muted-foreground">
                  Move better. Feel stronger. Build confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Center - Nav */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right - Contact */}
          <div className="text-sm text-muted-foreground">
            <p>07846102759</p>
            <p className="mt-1">stephenthomasvincent17@gmail.com</p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Leigh Reformer Pilates Studio. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
