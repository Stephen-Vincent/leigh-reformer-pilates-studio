import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/shared/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i + 1) % galleryImages.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <div className="bg-background text-foreground font-sans">
      <Header />

      <main className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="mx-auto max-w-6xl">
            {/* Back link */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            {/* Header */}
            <motion.div
              variants={sectionFade}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Gallery
              </p>
              <h1 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Inside the studio
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A look at our studio, equipment and classes in action.
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {galleryImages.map((img, index) => (
                <motion.button
                  key={img.src}
                  variants={imgFade}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-pointer overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </motion.div>

            {galleryImages.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                Photos coming soon.
              </p>
            )}
          </div>
        </Container>
      </main>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <p className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white/50 tabular-nums">
              {selectedIndex + 1} / {galleryImages.length}
            </p>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 cursor-pointer rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: premiumEase }}
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="max-h-[85vh] max-w-[80vw] rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 cursor-pointer rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
