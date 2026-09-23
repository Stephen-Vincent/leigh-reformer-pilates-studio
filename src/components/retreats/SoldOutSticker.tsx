type SoldOutStickerProps = {
  className?: string;
  /** Smaller banner for cards */
  compact?: boolean;
};

/** Diagonal "Sold Out" banner that sits across its (relative, overflow-hidden) parent. */
export default function SoldOutSticker({ className = "", compact = false }: SoldOutStickerProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex items-start justify-center overflow-hidden ${
        compact ? "pt-[22%]" : "pt-[12%] sm:pt-[9%]"
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className={`w-[160%] shrink-0 -rotate-[10deg] bg-[#9b2335]/90 text-center shadow-2xl ring-1 ring-white/30 backdrop-blur-sm ${
          compact ? "py-2.5" : "py-3 sm:py-4"
        }`}
      >
        <span
          className={`font-heading font-extrabold uppercase tracking-[0.35em] text-white ${
            compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl lg:text-5xl"
          }`}
        >
          Sold Out
        </span>
      </div>
    </div>
  );
}
