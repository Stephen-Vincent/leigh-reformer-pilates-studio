import { motion, type Variants } from "framer-motion";
import { Ticket, ShoppingBag, Gift, ArrowRight, PoundSterling } from "lucide-react";
import Container from "@/components/shared/Container";
import socksImg from "@/assets/photoshoot/merchandise-pics/merchandise-grip-socks-footbar-01.jpg";
import tshirtImg from "@/assets/photoshoot/instructor-pics/instructor-portrait-brown-tshirt-01.jpg";
import vestImg from "@/assets/photoshoot/group-reformer/group-reformer-branded-top-class-01.jpg";
import sweatshirtImg from "@/assets/photoshoot/merchandise-pics/merchandise-sweatshirts-back-group-01.jpg";

const PASSES_URL = "https://bookwhen.com/leighreformerpilates/passes";
const MAT_PASSES_URL = "https://bookwhen.com/mat-pilates-leigh-reformer-pilates-studio/passes";
const BACK_CARE_PASSES_URL = "https://bookwhen.com/back-care/passes";
const VOUCHERS_URL = "https://bookwhen.com/leighreformerpilates/vouchers";
const INDUCTION_VOUCHER_URL = "https://bookwhen.com/induction-at-leigh-reformer-pilates-studio/vouchers";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

const cardContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

/* ── Data ─────────────────────────────────────────────────────── */

type ClassPrice = { name: string; price: string; comingSoon?: boolean };

const classPrices: ClassPrice[] = [
  { name: "Reformer Pilates", price: "£17" },
  { name: "Induction Session", price: "£20" },
  { name: "Mat Pilates", price: "£9" },
  { name: "Back Care", price: "£20" },
];

type PassItem = { name: string; price: string; note: string; highlight?: boolean };

const classPasses: PassItem[] = [
  { name: "Three Class Pass", price: "£48.00", note: "£16.00 per class" },
  { name: "Five Class Pass", price: "£72.50", note: "£14.50 per class", highlight: true },
  { name: "Ten Class Pass", price: "£120.00", note: "£12.00 per class" },
];

const matPilatesPasses: PassItem[] = [
  { name: "Three Class Pass", price: "£25.50", note: "£8.50 per class" },
  { name: "Six Class Pass", price: "£48.50", note: "£8.08 per class", highlight: true },
  { name: "Twelve Class Pass", price: "£86.50", note: "£7.21 per class" },
];

const backCarePasses: PassItem[] = [
  { name: "Three Class Pass", price: "£55.50", note: "£18.50 per class" },
  { name: "Five Class Pass", price: "£102.00", note: "£17.00 per class", highlight: true },
  { name: "Ten Class Pass", price: "£168.00", note: "£14.00 per class" },
];

type MerchItem = { name: string; price: string; image: string; imageAlt: string };

const merchandise: MerchItem[] = [
  {
    name: "High Performance Reformer Grip Socks",
    price: "£12.50",
    image: socksImg,
    imageAlt: "Leigh Reformer Pilates Studio branded grip socks",
  },
  {
    name: "T-Shirt",
    price: "£22.50",
    image: tshirtImg,
    imageAlt: "Leigh Reformer Pilates Studio branded t-shirt",
  },
  {
    name: "Vest",
    price: "£19.50",
    image: vestImg,
    imageAlt: "Leigh Reformer Pilates Studio branded vest",
  },
  {
    name: "Sweatshirt",
    price: "£37.50",
    image: sweatshirtImg,
    imageAlt: "Leigh Reformer Pilates Studio branded sweatshirt",
  },
];

/* ── Component ────────────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section id="pricing" className="snap-start py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl space-y-14">
          {/* Header */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Pricing
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Class passes, merchandise &amp; gift vouchers
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Save with multi-class passes, pick up branded studio gear, or
              treat someone to a gift voucher.
            </p>
          </motion.div>

          {/* ── Class Prices ──────────────────────────────── */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-foreground" />
              <h3 className="font-heading text-xl sm:text-2xl">Class Prices</h3>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {classPrices.map((cls, i) => (
                <div
                  key={cls.name}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < classPrices.length - 1 ? "border-b border-border" : ""
                  } ${cls.comingSoon ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      {cls.name}
                    </p>
                    {cls.comingSoon && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="font-heading text-lg font-bold sm:text-xl">
                    {cls.price}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Reformer Pilates Passes ───────────────────── */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-foreground" />
                <h3 className="font-heading text-xl sm:text-2xl">Reformer Pilates Passes</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">For reformer mixed abilities sessions</p>
            </div>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {classPasses.map((pass) => (
                <motion.div key={pass.name} variants={cardFade}>
                  <a
                    href={PASSES_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative block cursor-pointer rounded-2xl border p-6 text-center btn-scale-hover ${
                      pass.highlight
                        ? "border-foreground/20 bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-card shadow-sm hover:border-foreground/20"
                    }`}
                  >
                    {pass.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] uppercase tracking-widest text-accent-foreground">
                        Popular
                      </span>
                    )}
                    <p className={`text-sm font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {pass.name}
                    </p>
                    <p className="mt-3 font-heading text-3xl font-bold">{pass.price}</p>
                    <p className={`mt-2 text-xs ${pass.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {pass.note}
                    </p>
                    <p className={`mt-4 inline-flex items-center gap-1 text-xs font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      Buy now
                      <ArrowRight className="h-3 w-3" />
                    </p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Mat Pilates Passes ───────────────────────── */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-foreground" />
                <h3 className="font-heading text-xl sm:text-2xl">Mat Pilates Passes</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">For mat Pilates sessions</p>
            </div>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {matPilatesPasses.map((pass) => (
                <motion.div key={pass.name} variants={cardFade}>
                  <a
                    href={MAT_PASSES_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative block cursor-pointer rounded-2xl border p-6 text-center btn-scale-hover ${
                      pass.highlight
                        ? "border-foreground/20 bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-card shadow-sm hover:border-foreground/20"
                    }`}
                  >
                    {pass.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] uppercase tracking-widest text-accent-foreground">
                        Popular
                      </span>
                    )}
                    <p className={`text-sm font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {pass.name}
                    </p>
                    <p className="mt-3 font-heading text-3xl font-bold">{pass.price}</p>
                    <p className={`mt-2 text-xs ${pass.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {pass.note}
                    </p>
                    <p className={`mt-4 inline-flex items-center gap-1 text-xs font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      Buy now
                      <ArrowRight className="h-3 w-3" />
                    </p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Back Care Passes ─────────────────────────── */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-foreground" />
                <h3 className="font-heading text-xl sm:text-2xl">Back Care Passes</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">For back care sessions</p>
            </div>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {backCarePasses.map((pass) => (
                <motion.div key={pass.name} variants={cardFade}>
                  <a
                    href={BACK_CARE_PASSES_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative block cursor-pointer rounded-2xl border p-6 text-center btn-scale-hover ${
                      pass.highlight
                        ? "border-foreground/20 bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-card shadow-sm hover:border-foreground/20"
                    }`}
                  >
                    {pass.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] uppercase tracking-widest text-accent-foreground">
                        Popular
                      </span>
                    )}
                    <p className={`text-sm font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {pass.name}
                    </p>
                    <p className="mt-3 font-heading text-3xl font-bold">{pass.price}</p>
                    <p className={`mt-2 text-xs ${pass.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {pass.note}
                    </p>
                    <p className={`mt-4 inline-flex items-center gap-1 text-xs font-medium ${pass.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      Buy now
                      <ArrowRight className="h-3 w-3" />
                    </p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Merchandise ───────────────────────────────── */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              <h3 className="font-heading text-xl sm:text-2xl">Studio Merchandise</h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Available to purchase directly from our studio.
            </p>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {merchandise.map((item) => (
                <motion.div
                  key={item.name}
                  variants={cardFade}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="mt-2 font-heading text-xl font-bold">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Gift Vouchers ─────────────────────────────── */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Gift className="h-5 w-5 text-foreground" />
              <h3 className="font-heading text-xl sm:text-2xl">Gift Vouchers</h3>
            </div>

            <div className="space-y-3">
              <a
                href={VOUCHERS_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-foreground/20 btn-scale-hover"
              >
                <div>
                  <p className="font-heading text-base font-semibold sm:text-lg">
                    Buy a gift voucher
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The perfect gift for someone special. Valid for 12 months from purchase.
                  </p>
                </div>
                <ArrowRight className="ml-4 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
              </a>

              <a
                href={INDUCTION_VOUCHER_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-foreground/20 btn-scale-hover"
              >
                <div>
                  <p className="font-heading text-base font-semibold sm:text-lg">
                    Buy an induction gift voucher
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Gift an induction session — the perfect way to start someone's Pilates journey.
                  </p>
                </div>
                <ArrowRight className="ml-4 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
