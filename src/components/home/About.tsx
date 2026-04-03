import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import aboutBg from "@/assets/AboutBackground.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen snap-start overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={aboutBg}
          alt="About Leigh Reformer Pilates Studio"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Accent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/100 to-accent/50 lg:bg-gradient-to-r lg:from-accent/100 lg:to-accent/50" />

      <Container className="relative z-10 flex min-h-screen items-center py-16 lg:py-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl text-center text-primary lg:text-left p-6 sm:p-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            About Us
          </p>

          <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
            A welcoming space to move, strengthen and feel your best.
          </h2>

          <p className="mt-6 text-base leading-7 text-primary/85 sm:text-lg">
            At Leigh Reformer Pilates Studio, we believe movement should feel
            accessible, empowering and enjoyable. Our studio has been created as
            a calm, supportive environment where people of all ages and
            abilities can build strength, improve mobility and move with
            confidence.
          </p>

          <p className="mt-4 text-base leading-7 text-primary/85 sm:text-lg">
            Whether you're completely new to reformer Pilates or returning to
            movement, our experienced instructors guide you through each session
            with care, attention and clear instruction. Every class is designed
            to help you feel stronger, more balanced and more connected to your
            body.
          </p>

          <p className="mt-4 text-base leading-7 text-primary/85 sm:text-lg">
            We are proud to offer a friendly, inclusive studio where everyone
            feels comfortable and supported — no matter where you are starting
            from.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
