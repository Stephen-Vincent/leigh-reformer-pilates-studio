import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/shared/Container";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question:
      "What is the difference between mat Pilates and reformer Pilates?",
    answer:
      "Both focus on posture, control, alignment and strength, but the reformer adds springs, straps and pulleys to provide support and resistance. This allows for more variety, more progression, and often a greater range of motion than mat work alone.",
  },
  {
    question: "Is reformer Pilates suitable for beginners?",
    answer:
      "Yes. Reformer Pilates is a great place to start because the equipment can support your movement while helping you build confidence, body awareness and technique. If you are new, we recommend beginning with your induction or introductory session first.",
  },
  {
    question: "Is reformer Pilates low impact and joint friendly?",
    answer:
      "Yes. Reformer Pilates is low impact and can be very joint friendly when taught with good technique. The spring resistance allows exercises to be adapted to different bodies and fitness levels, making it a supportive option for many people.",
  },
  {
    question:
      "Can reformer Pilates help with strength, posture and flexibility?",
    answer:
      "Absolutely. Reformer Pilates is designed to improve posture, core strength, flexibility, balance and overall body control. Many people also find it helps with muscular endurance, coordination and general wellbeing.",
  },
  {
    question: "What should I wear and bring to class?",
    answer:
      "Wear comfortable clothing that allows you to move easily. Grip socks are recommended for safety and hygiene. You may also want to bring water, and if you are attending for the first time, arrive a few minutes early so you can settle in comfortably.",
  },
  {
    question: "Do I need to be fit or flexible before I start?",
    answer:
      "Not at all. You do not need any previous Pilates experience, and you do not need to be especially fit or flexible to begin. Classes are designed to help you build strength, mobility and confidence gradually over time.",
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

const accordionContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const rowFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={rowFade}
      className="rounded-[1.5rem] border border-border/80 bg-background/40 px-5 sm:px-6 backdrop-blur-[2px]"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <span className="font-heading text-lg leading-tight sm:text-xl lg:text-2xl">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-foreground/70 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] pb-5 sm:pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="min-h-screen snap-start py-16 pt-36 lg:pt-48 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Common questions, answered simply.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A few helpful answers for new and returning clients.
            </p>
          </motion.div>

          <motion.div
            variants={accordionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4"
          >
            {faqItems.map((item, index) => (
              <FaqRow
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
