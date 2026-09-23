import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/shared/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SoldOutSticker from "@/components/retreats/SoldOutSticker";
import { retreats } from "@/config/retreats";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
};

const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function RetreatsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans">
      <Header />

      <main className="pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <motion.div variants={sectionFade} initial="hidden" animate="visible" className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Retreats</p>
              <h1 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Reformer &amp; Pilates Retreats
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Step away from everyday life and deepen your practice in beautiful surroundings.
              </p>
            </motion.div>

            <motion.ul
              variants={listContainer}
              initial="hidden"
              animate="visible"
              className="mt-14 grid gap-8 md:grid-cols-2"
            >
              {retreats.map((retreat) => (
                <motion.li key={retreat.id} variants={sectionFade}>
                  <Link
                    to={`/retreats/${retreat.id}`}
                    className="group block h-full overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={retreat.heroImage.src}
                        alt={retreat.heroImage.alt}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {retreat.soldOut && <SoldOutSticker compact />}
                      {!retreat.soldOut && retreat.featured && (
                        <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-sm">
                          Now booking
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col p-6 sm:p-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{retreat.date}</p>
                      <h2 className="mt-3 font-heading text-2xl leading-tight sm:text-3xl">{retreat.title}</h2>

                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2.5">
                          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                          {retreat.dateDetail ?? retreat.date}
                        </li>
                        <li className="flex items-start gap-2.5">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                          <span>
                            {retreat.venue}, {retreat.location}
                          </span>
                        </li>
                      </ul>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                        {retreat.soldOut ? (
                          <span className="rounded-full bg-[#9b2335] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            Sold Out
                          </span>
                        ) : retreat.fromPrice ? (
                          <p className="text-sm text-muted-foreground">
                            From <span className="font-heading text-xl text-foreground">{retreat.fromPrice}</span> pp
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                          View retreat
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
