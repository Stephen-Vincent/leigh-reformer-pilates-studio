import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61566506185243";
const INSTAGRAM_URL = "https://www.instagram.com/leighreformerpilatesstudio/";

const photoshootModules = import.meta.glob<{ default: string }>(
  "@/assets/photoshoot/**/*.jpg",
  { eager: true }
);

const allImages = Object.entries(photoshootModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const filename = path.split("/").pop() ?? "";
    const alt = filename
      .replace(/\.jpg$/i, "")
      .replace(/-\d{2}$/, "")
      .replace(/-/g, " ")
      .trim();
    return { src: mod.default, alt };
  });

// Desktop/tablet: 8 images — Mobile: first 3
const DESKTOP_COUNT = 8;
const MOBILE_COUNT = 3;
const previewImages = allImages.slice(0, DESKTOP_COUNT);

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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="snap-start py-16 sm:py-20 lg:py-24">
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
              Gallery
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Inside the studio
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Take a look at our studio, equipment and classes in action.
            </p>
          </motion.div>

          {/* Image grid — 3 on mobile, 8 on sm+ (2 rows of 4) */}
          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {previewImages.map((img, index) => (
              <motion.div
                key={img.src}
                variants={imgFade}
                className={`overflow-hidden rounded-2xl ${
                  index >= MOBILE_COUNT ? "hidden sm:block" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              asChild
              className="w-64 cursor-pointer rounded-full bg-primary px-8 py-5 btn-scale-hover"
            >
              <a href="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-64 cursor-pointer rounded-full border-2 px-8 py-5 btn-scale-hover"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <InstagramIcon className="mr-2 h-4 w-4" />
                Follow on Instagram
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-64 cursor-pointer rounded-full border-2 px-8 py-5 btn-scale-hover"
            >
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                <FacebookIcon className="mr-2 h-4 w-4" />
                Follow on Facebook
              </a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
