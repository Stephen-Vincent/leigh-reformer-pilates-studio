import { motion, type Variants } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { bookingLinks } from "@/config/booking";
import heroBackground from "@/assets/HeroBackground.jpg";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.75,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: premiumEase,
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: premiumEase,
      delay: 2,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen snap-start overflow-hidden pt-8"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Leigh Reformer Pilates Studio background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Accent colour overlay */}
      <div className="absolute inset-0 bg-accent/50" />

      {/* Soft dark gradient to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      <Container className="relative z-10 flex min-h-screen items-center py-16 lg:py-20">
        <div className="flex max-w-3xl flex-col justify-center text-center lg:text-left">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 2 }}
            className="text-xs uppercase tracking-[0.3em] text-white/85"
          >
            Leigh Reformer Pilates Studio
          </motion.p>

          {/* Heading */}
          <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-7xl ">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={lineVariants} className="block">
                Move better.
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Feel stronger.
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Build confidence.
              </motion.span>
            </motion.div>
          </h1>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto lg:mx-0"
          >
            {/* Supporting text */}
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              A welcoming, modern Pilates studio designed for all levels.
              Whether you&apos;re new or experienced, our expert-led classes
              help you move with confidence and strength.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Button
                asChild
                className="rounded-full border-2 border-accent/50 bg-accent/50 px-8 py-5 text-primary-foreground btn-scale-hover"
              >
                <a href={bookingLinks.primary} target="_blank" rel="noreferrer">
                  Book a Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/70 bg-white/10 px-6 py-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white btn-scale-hover"
              >
                <a href="#classes">
                  <Eye className="mr-2 h-4 w-4" />
                  See Classes
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
