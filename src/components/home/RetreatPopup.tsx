import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "radix-ui";
import { ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { retreats } from "@/config/retreats";

const DELAY_MS = 4000;
const STORAGE_KEY = "lrps-retreat-popup-dismissed";

const featured = retreats.find((r) => r.featured && !r.soldOut);

function alreadyDismissed(id: string) {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === id;
  } catch {
    return false;
  }
}

function rememberDismissed(id: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable — popup may show again, which is fine */
  }
}

/** Home page pop-up promoting the featured retreat. Shows once per browser session. */
export default function RetreatPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!featured || alreadyDismissed(featured.id)) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!featured) return null;

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) rememberDismissed(featured.id);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-background shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="relative">
            <img
              src={featured.heroImage.src}
              alt={featured.heroImage.alt}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              New retreat
            </span>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="absolute right-4 top-4 cursor-pointer rounded-full bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
            <p className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.3em] text-white/90">
              {featured.date}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <Dialog.Title className="font-heading text-2xl leading-tight sm:text-3xl">
              {featured.title} in the Lake District
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              {featured.teaser}
            </Dialog.Description>

            <ul className="mt-5 space-y-2 text-sm">
              {featured.dateDetail && (
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  {featured.dateDetail}
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0" />
                {featured.venue}, Ambleside
              </li>
            </ul>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Dialog.Close asChild>
                <button className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  Maybe later
                </button>
              </Dialog.Close>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                {featured.fromPrice && (
                  <p className="text-sm text-muted-foreground">
                    From <span className="font-heading text-lg text-foreground">{featured.fromPrice}</span> pp
                  </p>
                )}
                <Link
                  to={`/retreats/${featured.id}`}
                  onClick={() => handleOpenChange(false)}
                  className="btn-scale-hover inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                >
                  Find out more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
