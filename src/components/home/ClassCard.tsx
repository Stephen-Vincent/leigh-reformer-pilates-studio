import { ChevronDown, ChevronUp } from "lucide-react";

export type ClassCardItem = {
  title: string;
  description: string;
  tag: string;
  image: {
    src: string;
    alt: string;
  };
  details: string;
};

export type ClassCardProps = {
  item: ClassCardItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

export default function ClassCard({
  item,
  index,
  isOpen,
  onToggle,
}: ClassCardProps) {
  return (
    <div className="overflow-hidden  border border-border bg-card shadow-xl">
      <div className="relative">
        <img
          src={item.image.src}
          alt={item.image.alt}
          className="h-72 w-full object-cover"
        />

        {/* Accent overlay */}
        <div className="pointer-events-none absolute inset-0 bg-accent/30" />
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          {item.tag}
        </p>

        <h3 className="mt-3 font-heading text-2xl leading-tight sm:text-3xl">
          {item.title}
        </h3>

        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          {item.description}
        </p>

        {isOpen && (
          <div className="mt-4 text-sm leading-7 text-muted-foreground space-y-2">
            {item.details.split("\n").map((line, i) => {
              const trimmed = line.trim();

              if (!trimmed) return null;

              // Render bullet-style lines
              if (trimmed.startsWith("•")) {
                return (
                  <div key={i} className="flex gap-2">
                    <span>•</span>
                    <span>{trimmed.replace("•", "").trim()}</span>
                  </div>
                );
              }

              // Render headings (like "Class times:")
              if (trimmed.endsWith(":")) {
                return (
                  <p key={i} className="mt-2 font-medium text-foreground">
                    {trimmed}
                  </p>
                );
              }

              // Default paragraph
              return <p key={i}>{trimmed}</p>;
            })}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => onToggle(index)}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground"
          >
            {isOpen ? (
              <>
                Hide
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Learn more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
