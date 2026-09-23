import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Check,
  ExternalLink,
  Phone,
  Mail,
  PoundSterling,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Container from "@/components/shared/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SoldOutSticker from "@/components/retreats/SoldOutSticker";
import ItineraryCarousel from "@/components/retreats/ItineraryCarousel";
import { retreats, type Retreat } from "@/config/retreats";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
};

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const imgFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: premiumEase } },
};

function RetreatSection({ retreat }: { retreat: Retreat }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = retreat.images;

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

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

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <article>
      {/* Hero image with sold out sticker */}
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl shadow-lg"
      >
        <img
          src={retreat.heroImage.src}
          alt={retreat.heroImage.alt}
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[21/9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {retreat.soldOut && <SoldOutSticker />}

        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {!retreat.soldOut && retreat.featured && (
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                Now booking
              </span>
            )}
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">{retreat.date}</p>
          </div>
          <h1 className="mt-3 font-heading text-2xl leading-tight sm:text-4xl lg:text-5xl">
            {retreat.title}
          </h1>
        </div>
      </motion.div>

      {/* Details */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {retreat.description.map((para, i) => (
            <p
              key={i}
              className={`${i === 0 ? "" : "mt-5"} text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8`}
            >
              {para}
            </p>
          ))}
        </motion.div>

        <motion.aside
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-fit rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8"
        >
          {retreat.soldOut ? (
            <span className="inline-block rounded-full bg-[#9b2335] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Sold Out
            </span>
          ) : retreat.fromPrice ? (
            <p className="font-heading text-3xl">
              From {retreat.fromPrice}
              <span className="ml-1.5 font-sans text-sm text-muted-foreground">per person</span>
            </p>
          ) : null}

          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{retreat.dateDetail ?? retreat.date}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {retreat.address ? (
                <address className="not-italic">
                  {retreat.address.map((line, i) => (
                    <span key={line} className={i === 0 ? "" : "block text-muted-foreground"}>
                      {line}
                    </span>
                  ))}
                </address>
              ) : (
                <span>
                  {retreat.venue}
                  <br />
                  <span className="text-muted-foreground">{retreat.location}</span>
                </span>
              )}
            </li>
          </ul>

          {!retreat.soldOut && retreat.contact && (
            <div className="mt-7 space-y-3">
              <a
                href={`tel:${retreat.contact.phone.replace(/\s/g, "")}`}
                className="btn-scale-hover flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                Call {retreat.contact.name} to book
              </a>
              <a
                href="/#contact"
                className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ring-1 ring-foreground/20 transition hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                Send an enquiry
              </a>
              <p className="text-center text-xs text-muted-foreground">{retreat.contact.phone}</p>
            </div>
          )}

          {retreat.highlights && retreat.highlights.length > 0 && (
            <>
              <div className="my-6 h-px bg-border" />
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Highlights</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {retreat.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {retreat.venueUrl && (
            <a
              href={retreat.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              Visit {retreat.venue}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.aside>
      </div>

      {/* What's included + prices */}
      {(retreat.included || retreat.prices) && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {retreat.included && (
            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl bg-accent p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/70">What’s included</p>
              <ul className="mt-5 space-y-3 text-sm sm:text-base">
                {retreat.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {retreat.prices && (
            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl bg-card p-6 ring-1 ring-border sm:p-8"
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                Prices
              </p>
              <div className="mt-5 divide-y divide-border">
                {retreat.prices.map((p) => (
                  <div key={p.label} className="flex items-baseline justify-between gap-4 py-4 first:pt-0">
                    <div>
                      <p className="font-medium">{p.label}</p>
                      {p.note && <p className="text-sm text-muted-foreground">{p.note}</p>}
                    </div>
                    <p className="font-heading text-2xl">{p.price}</p>
                  </div>
                ))}
              </div>
              {retreat.priceNotes && (
                <ul className="mt-4 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                  {retreat.priceNotes.map((n) => (
                    <li key={n} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Itinerary */}
      {retreat.itinerary && (
        <div className="mt-14">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Itinerary</p>
          <h3 className="mt-3 text-center font-heading text-2xl sm:text-3xl">Your retreat, day by day</h3>
          <ItineraryCarousel days={retreat.itinerary} />
        </div>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <>
          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {images.map((img, index) => (
              <motion.button
                key={img.src}
                variants={imgFade}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View photo: ${img.alt}`}
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
          {retreat.imageCredit && (
            <p className="mt-4 text-center text-xs text-muted-foreground">{retreat.imageCredit}</p>
          )}
        </>
      )}

      {!retreat.soldOut && retreat.contact && (
        <div className="mt-12 rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10">
          <h3 className="font-heading text-2xl sm:text-3xl">Ready to book your place?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/75 sm:text-base">
            To book or if you require further information, please contact {retreat.contact.name} on{" "}
            {retreat.contact.phone}.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${retreat.contact.phone.replace(/\s/g, "")}`}
              className="btn-scale-hover inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
            >
              <Phone className="h-4 w-4" />
              Call {retreat.contact.name}
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ring-1 ring-white/40 transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Send an enquiry
            </a>
          </div>
        </div>
      )}

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
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="absolute left-1/2 top-4 -translate-x-1/2 text-xs tabular-nums text-white/50">
              {selectedIndex + 1} / {images.length}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 cursor-pointer rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: premiumEase }}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-h-[85vh] max-w-[80vw] rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 cursor-pointer rounded-full bg-white/10 p-3 text-white/70 transition hover:bg-white/20 hover:text-white sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function RetreatDetailPage() {
  const { id } = useParams();
  const retreat = retreats.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!retreat) return <Navigate to="/retreats" replace />;

  return (
    <div className="bg-background text-foreground font-sans">
      <Header />

      <main className="pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Link
              to="/retreats"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All retreats
            </Link>

            <RetreatSection retreat={retreat} />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
