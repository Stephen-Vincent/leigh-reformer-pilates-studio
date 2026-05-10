import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { galleryImages } from "@/config/gallery";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const imgFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export default function GalleryPreview() {
  /* Show the first 6 images as a preview */
  const previewImages = galleryImages.slice(0, 6);

  if (previewImages.length === 0) return null;

  return (
    <section id="gallery" className="snap-start py-16 sm:py-20 lg:py-24">
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
              Gallery
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Inside the studio
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Take a look at our studio, equipment and classes in action.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
          >
            {previewImages.map((img) => (
              <motion.div
                key={img.src}
                variants={imgFade}
                className="overflow-hidden rounded-2xl"
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

          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Button
              asChild
              className="cursor-pointer rounded-full bg-primary px-8 py-5 btn-scale-hover"
            >
              <Link to="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
