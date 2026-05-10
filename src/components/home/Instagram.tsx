import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import instaImg1 from "@/assets/photoshoot/instructor-pics/instructor-with-ball-reformer-01.jpg";
import instaImg2 from "@/assets/photoshoot/group-reformer/group-reformer-standing-warrior-01.jpg";
import instaImg3 from "@/assets/photoshoot/1-on-1-pics/one-on-one-instructor-client-straps-01.jpg";
import instaImg4 from "@/assets/photoshoot/merchandise-pics/merchandise-sweatshirts-back-group-01.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/leighreformerpilatesstudio";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const imgFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: premiumEase },
  },
};

/**
 * Preview images shown in the Instagram-style grid.
 * Replace these with actual Instagram post screenshots or photos
 * when the photographer images arrive.
 */
const previewImages = [
  { src: instaImg1, alt: "Instructor with pilates ball on reformer" },
  { src: instaImg2, alt: "Group reformer class standing warrior pose" },
  { src: instaImg3, alt: "One-to-one instructor session on reformer" },
  { src: instaImg4, alt: "Leigh Reformer Pilates Studio branded sweatshirts" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Instagram() {
  return (
    <section id="instagram" className="snap-start py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Follow Us
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              @leighreformerpilatesstudio
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Follow us on Instagram for class updates, behind the scenes and
              inspiration from our studio community.
            </p>
          </motion.div>

          {/* Image grid — links to Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-12 block"
          >
            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            >
              {previewImages.map((img) => (
                <motion.div
                  key={img.src}
                  variants={imgFade}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay with Instagram icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                    <InstagramIcon className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </a>

          {/* CTA */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button
              asChild
              className="cursor-pointer rounded-full bg-primary px-8 py-5 btn-scale-hover"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <InstagramIcon className="mr-2 h-4 w-4" />
                Follow us on Instagram
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
