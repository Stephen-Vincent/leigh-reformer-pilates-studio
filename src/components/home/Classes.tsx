import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { bookingLinks } from "@/config/booking";
import ClassCard from "./ClassCard";
import type { ClassCardItem } from "./ClassCard";
import ReformerIntro from "@/assets/ReformerIntro.jpg";
import OpenReformer from "@/assets/OpenReformer.jpg";

const classTypes: ClassCardItem[] = [
  {
    title: "Induction & Intro to Reformer",
    description:
      "A 60 minute session where you will be shown how to safely use the reformer and accessories.",
    tag: "Beginner session",
    image: { src: ReformerIntro, alt: "Induction Reformer" },
    details:
      "This full-body introductory session helps you learn how to use the reformer safely and confidently. You will be guided through key exercises from the reformer repertoire, building a strong foundation before joining group classes.\n\nTimes:\n• Monday & Thursday – 8:00pm\n• Tuesday – 11:15am\n• Saturday – 1:15pm\n\nAll new clients must complete this session before attending mixed ability classes.",
  },
  {
    title: "Reformer Pilates Mixed Abilities",
    description:
      "A comprehensive 60 minute full-body workout suitable for all ages and fitness levels.",
    tag: "All levels",
    image: { src: OpenReformer, alt: "Mixed Ability Reformer" },
    details:
      "This class focuses on improving posture, flexibility, joint health and muscular strength. Exercises are adapted to suit all abilities, making it ideal whether you are progressing from your induction or already experienced.\n\nClass times:\n\n• Monday – 10:00 • 11:15 • 17:30 • 18:45\n• Tuesday – 10:00 • 17:30 • 18:45\n• Wednesday – 10:00 • 17:30 • 18:45\n• Thursday – 10:00 • 17:30 • 18:45\n• Friday – 10:00 • 11:15 • 17:30 • 18:45\n• Saturday – 09:30 • 10:45\n\nPrice: £12–£17",
  },
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const cardFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

export default function Classes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="classes"
      className="min-h-screen snap-start py-16 sm:py-20 lg:py-24 pt-36 lg:pt-48 md:pt-28 lg:pt-38"
    >
      <Container>
        <div className="space-y-10 lg:space-y-12">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-8 text-center lg:text-left"
          >
            <div className="lg:pr-12 lg:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Classes
              </p>

              <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Reformer Pilates classes for all levels
              </h2>

              <p className="mt-6  text-base leading-7 text-muted-foreground sm:text-lg">
                Reformer Pilates small group and one-to-one sessions to improve
                your posture, flexibility, and muscular strength, tone and
                definition. Suitable for all age groups, abilities, and fitness
                levels.
              </p>
            </div>
            <div className="shrink-0 ">
              <Button asChild className="bg-primary rounded-full px-8 py-5 btn-scale-hover">
                <a href={bookingLinks.primary} target="_blank" rel="noreferrer">
                  Book a Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid items-start gap-5 lg:grid-cols-2"
          >
            {classTypes.map((item, index) => (
              <motion.div key={item.title} variants={cardFade}>
                <ClassCard
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={(clickedIndex) =>
                    setOpenIndex(
                      openIndex === clickedIndex ? null : clickedIndex,
                    )
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
