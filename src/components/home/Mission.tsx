import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { bookingLinks } from "@/config/booking";

export default function Mission() {
  return (
    <section
      id="mission"
      className="min-h-screen snap-start flex items-center bg-primary text-primary-foreground py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/80">
            Our Mission
          </p>

          {/* Main statement */}
          <h2 className="mt-6 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Helping you move better, feel stronger, and build lasting wellbeing
            through Reformer Pilates.
          </h2>

          {/* Supporting line (optional refinement) */}
          <p className="mt-6 text-base leading-7 text-primary-foreground/85 sm:text-lg">
            We create a welcoming, supportive environment where every session is
            designed to improve strength, mobility and confidence — at your own
            pace.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Button asChild className="rounded-full px-8 py-5 btn-scale-hover">
              <a href={bookingLinks.primary} target="_blank" rel="noreferrer">
                Book a Class
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
