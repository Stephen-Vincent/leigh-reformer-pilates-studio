import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { ItineraryDay } from "@/config/retreats";

const AUTOPLAY_MS = 7000;

type Props = { days: ItineraryDay[] };

/** Auto-advancing, one-day-at-a-time itinerary carousel. Pauses on hover, focus or touch. */
export default function ItineraryCarousel({ days }: Props) {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = days.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Only run the timer while the carousel is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const playing = !userPaused && !reducedMotion;

  useEffect(() => {
    if (!playing || hoverPaused || !inView || count < 2) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, hoverPaused, inView, count, next]);

  const running = playing && !hoverPaused && inView;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Retreat itinerary"
      className="mx-auto mt-8 max-w-3xl"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHoverPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      {/* Day tabs */}
      <div className="flex items-center justify-center gap-2" role="tablist">
        {days.map((d, i) => (
          <button
            key={d.day}
            role="tab"
            aria-selected={i === index}
            onClick={() => go(i)}
            className={`relative cursor-pointer overflow-hidden rounded-full px-4 py-2 text-sm transition ${
              i === index ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70 ring-1 ring-border hover:text-foreground"
            }`}
          >
            {d.day}
            {i === index && running && (
              <span
                key={`${index}-progress`}
                className="absolute bottom-0 left-0 h-[2px] bg-white/70"
                style={{ animation: `itinerary-progress ${AUTOPLAY_MS}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slides — stacked in one grid cell. From sm up the height stays at the tallest day;
          on phones inactive slides are taken out of flow so the card fits the current day. */}
      <div
        className="relative mt-5 grid"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          setHoverPaused(true);
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          if (start === null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
      >
        {days.map((d, i) => (
          <div
            key={d.day}
            role="group"
            aria-roledescription="slide"
            aria-label={`${d.day} of ${count}`}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 rounded-3xl bg-card p-6 ring-1 ring-border transition-all duration-500 ease-out sm:p-8 ${
              i === index ? "translate-x-0 opacity-100" : `pointer-events-none opacity-0 max-sm:absolute max-sm:inset-x-0 max-sm:top-0 ${i < index ? "-translate-x-6" : "translate-x-6"}`
            }`}
          >
            <p className="font-heading text-xl">{d.day}</p>
            <ol className="mt-5 space-y-4">
              {d.items.map((item, j) => (
                <li key={j} className="grid grid-cols-[88px_1fr] gap-3 text-sm sm:grid-cols-[110px_1fr] sm:text-base">
                  <span className="pt-px font-medium tabular-nums">{item.time}</span>
                  <span>
                    {item.title && <span className="block font-medium">{item.title}</span>}
                    <span className={item.title ? "text-muted-foreground" : ""}>{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous day"
          className="cursor-pointer rounded-full bg-card p-2.5 ring-1 ring-border transition hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {!reducedMotion && (
          <button
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play itinerary slideshow" : "Pause itinerary slideshow"}
            className="cursor-pointer rounded-full bg-card p-2.5 ring-1 ring-border transition hover:bg-accent"
          >
            {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
        <button
          onClick={next}
          aria-label="Next day"
          className="cursor-pointer rounded-full bg-card p-2.5 ring-1 ring-border transition hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
