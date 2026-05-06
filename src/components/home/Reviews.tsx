import { useEffect, useRef, useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/shared/Container";

type Review = {
  name: string;
  text: string;
  rating: number;
};

/**
 * Real Google reviews.
 * To add or update reviews, simply edit this array.
 */
const reviews: Review[] = [
  {
    name: "Elizabeth Kenny",
    text: "This is such a great way to build strength, flexibility and improve balance whilst being in a small group. Kim is an excellent instructor who guides, motivates and corrects you so you get the most out of each session. Her classes are different each week, they have a great flow and work your whole body. We also have a laugh too so you always leave the class feeling great.",
    rating: 5,
  },
  {
    name: "Catherine Wright",
    text: "I started at Leigh Reformer Pilates Studio when I was four months postpartum and I honestly couldn't recommend it enough. From the very first session I felt welcomed, supported and completely at ease. Kim is incredibly knowledgeable and attentive. The studio itself is inviting, calm, clean and beautifully set up. Each session leaves me feeling stronger, more aligned and energised.",
    rating: 5,
  },
  {
    name: "Lisa Lawton",
    text: "Kim is so knowledgeable about the exercises and the body and the range of exercises she has us doing on the reformer blows my mind! She explains everything, sets your posture and form correctly and she has a beautiful studio. Every week is different and I love these classes.",
    rating: 5,
  },
  {
    name: "Jade",
    text: "I started at Leigh Reformer Pilates Studio as a total beginner to reformer Pilates. Kim has made me feel so welcome and confident and she's a brilliant instructor. I'm so glad I discovered this studio and I would recommend it to anyone wanting to try something new, meet new people and have a fantastic full body workout.",
    rating: 5,
  },
  {
    name: "Kathryn Vincent",
    text: "I really enjoy these classes. Kim is very knowledgeable and prepares each session to ensure each of the muscle groups are targeted both effectively and of course safely. Very relaxed and all age groups.",
    rating: 5,
  },
  {
    name: "Laura",
    text: "Been going to classes since August and love it. The classes are always fun and challenging. Kim is a great instructor and with the small class sizes you get hands on support to make sure you are doing everything correctly.",
    rating: 5,
  },
  {
    name: "Sarah Jackson",
    text: "I always leave classes feeling great! Kim creates such a supportive environment and makes every session enjoyable. Highly recommend this lovely safe studio.",
    rating: 5,
  },
  {
    name: "Orchid59",
    text: "Brilliant form of exercise, Kim is an excellent instructor and will adapt any of the exercises to suit individual abilities. My joint issue has improved immensely since doing this form of exercise, highly recommended.",
    rating: 5,
  },
  {
    name: "Marsa Zarei",
    text: "I highly recommend this studio, Kim is a brilliant instructor.",
    rating: 5,
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Leigh+Reformer+Pilates+Studio/@53.4955704,-2.5129753,17z/data=!4m8!3m7!1s0x487b074a3f9bffd9:0x3c7680aa3f6e9e80!8m2!3d53.4955672!4d-2.5104004!9m1!1b1!16s%2Fg%2F11wj7_vy8g";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: premiumEase },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Auto-advance interval (ms) ────────────────────────────── */
const AUTO_PLAY_MS = 5000;

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, AUTO_PLAY_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  function go(direction: "prev" | "next") {
    setCurrent((prev) =>
      direction === "next"
        ? (prev + 1) % reviews.length
        : (prev - 1 + reviews.length) % reviews.length,
    );
    resetTimer();
  }

  function goTo(index: number) {
    setCurrent(index);
    resetTimer();
  }

  const review = reviews[current];

  return (
    <section id="reviews" className="snap-start py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Reviews
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              What our clients say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              See what our members have to say about their experience at the
              studio.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-12"
          >
            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card px-8 py-10 shadow-sm sm:px-12 sm:py-12">
              <div className="mx-auto max-w-2xl text-center">
                <div className="flex justify-center">
                  <StarRating rating={review.rating} />
                </div>

                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                  className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  &ldquo;{review.text}&rdquo;
                </motion.p>

                <motion.p
                  key={`name-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="mt-6 font-heading text-sm font-semibold text-foreground sm:text-base"
                >
                  {review.name}
                </motion.p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => go("prev")}
              aria-label="Previous review"
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-border bg-background p-2 shadow-sm transition hover:bg-secondary sm:-translate-x-3/4"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <button
              onClick={() => go("next")}
              aria-label="Next review"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-border bg-background p-2 shadow-sm transition hover:bg-secondary sm:translate-x-3/4"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </motion.div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-foreground"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          {/* Google link */}
          <div className="mt-6 text-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 transition hover:text-foreground"
            >
              See all reviews on Google
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
