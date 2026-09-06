import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { useBookingModal } from "@/components/shared/BookingModal";
import ClassCard from "./ClassCard";
import type { ClassCardItem } from "./ClassCard";
import inductionImg from "@/assets/photoshoot/1-on-1-pics/one-on-one-instructor-client-bar-01.jpg";
import mixedImg from "@/assets/photoshoot/group-reformer/group-reformer-class-wide-03.jpg";
import matImg from "@/assets/photoshoot/mat-pilates-pics/mat-pilates-group-ball-exercise-01.jpg";
import backCareImg from "@/assets/photoshoot/back-care/back-care-instructor-spinal-adjustment-bw-01.jpg";

const classTypes: ClassCardItem[] = [
  {
    title: "Induction & Intro to Reformer",
    description:
      "A 60 minute session where you will be shown how to safely use the reformer and accessories.",
    tag: "Beginner session",
    image: { src: inductionImg, alt: "One-to-one induction session on the reformer" },
    details:
      "This full-body introductory session helps you learn how to use the reformer safely and confidently. You will be guided through key exercises from the reformer repertoire, building a strong foundation before joining group classes.\n\nSessions run once weekly, either 8pm Monday's, 8pm Thursday's or 12pm Saturday's.\n\nAll new clients must complete this session before attending mixed ability classes.\n\nFor one-to-one sessions, please get in touch via our contact form below.",
  },
  {
    title: "Reformer Pilates Mixed Abilities",
    description:
      "A comprehensive 60 minute full-body workout suitable for all ages and fitness levels.",
    tag: "All levels",
    image: { src: mixedImg, alt: "Mixed ability reformer pilates class in action" },
    details:
      "This class focuses on improving posture, flexibility, joint health and muscular strength. Exercises are adapted to suit all abilities, making it ideal whether you are progressing from your induction or already experienced.\n\nClass times:\n\n• Monday – 10:00 • 11:15 • 17:30 • 18:45\n• Tuesday – 10:00 • 17:30 • 18:45\n• Wednesday – 06:30 • 10:00 • 17:30 • 20:00\n• Thursday – 10:00 • 17:30 • 18:45\n• Friday – 06:30 • 08:45 • 10:00 • 11:15 • 17:30\n• Saturday – 08:15 • 09:30 • 10:45\n\nClass passes available:\n• Three Class Pass – £48.00\n• Five Class Pass – £72.50\n• Ten Class Pass – £120.00\n\nFor one-to-one sessions, please get in touch via our contact form below.",
  },
  {
    title: "Mat Pilates",
    description:
      "Floor-based Pilates focusing on core strength, flexibility and body control. No induction required.",
    tag: "All levels",
    image: { src: matImg, alt: "Mat pilates class at Leigh Reformer Pilates Studio" },
    details:
      "Suitable for all levels - no induction or previous experience needed.\n\nClass times:\n\n• Wednesday – 11:20\n• Friday – 18:45\n\nClass passes available:\n• Three Class Pass – £25.50\n• Six Class Pass – £48.50\n• Twelve Class Pass – £86.50",
  },
  {
    title: "Back to Basics",
    description:
      "Reformer and mat Pilates sessions for safe, pain-free movement with specialist instruction.",
    tag: "All levels",
    image: { src: backCareImg, alt: "Back to Basics pilates session with instructor" },
    details:
      "During a 'Back to Basics' session you will complete a series of reformer and mat Pilates based exercises which are easy to follow and which allow you to move safely on the reformer. With the support from a specialist instructor, you will be taught how to tune into your deep core stabilising muscles and re-educated in how to mobilise more efficiently and in a pain free way.\n\nSuitable for absolute beginners or for those with pre-existing back pain or joint issues, including osteoarthritis and osteoporosis. Designed to help you understand the principles of Pilates and learn how to perform reformer exercises correctly, by attending these sessions, you will also improve joint stability and balance, and achieve a stronger and healthier spine. Benefit from a higher awareness of correct posture and healthier movement patterns that assist in the management of lower back pain.\n\nSessions run for 60 minutes.\n\nClass times:\n\n• Wednesday – 18:45\n\nClass passes available:\n• Three Class Pass – £55.50\n• Six Class Pass – £102.00\n• Twelve Class Pass – £168.00",
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
  const { open: openBooking } = useBookingModal();
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
                your posture, flexibility and muscular strength, tone and
                definition. Suitable for all age groups, abilities and fitness
                levels.
              </p>
            </div>
            <div className="shrink-0 ">
              <Button className="bg-primary cursor-pointer rounded-full px-8 py-5 btn-scale-hover" onClick={openBooking}>
                Book a Class
                <ArrowRight className="ml-2 h-4 w-4" />
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
