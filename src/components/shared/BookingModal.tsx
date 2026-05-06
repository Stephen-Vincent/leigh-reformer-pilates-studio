import { useState, createContext, useContext, useCallback } from "react";
import { Dialog } from "radix-ui";
import { ArrowRight, ArrowLeft, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingLinks, classOptions } from "@/config/booking";
import logoDark from "@/assets/LRPSLogoDark.png";

/* ── Context so any button can open the modal ────────────────── */

type BookingModalContextValue = { open: () => void };
const BookingModalContext = createContext<BookingModalContextValue>({
  open: () => {},
});
export const useBookingModal = () => useContext(BookingModalContext);

/* ── Steps ────────────────────────────────────────────────────── */

type Step = "choose-class" | "induction-check" | "induction";

/* ── Provider + Modal ─────────────────────────────────────────── */

export function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("choose-class");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const open = useCallback(() => {
    setStep("choose-class");
    setSelectedClass(null);
    setIsOpen(true);
  }, []);

  function handleClassSelect(index: number) {
    const cls = classOptions[index];
    setSelectedClass(cls.label);

    if (cls.requiresInduction) {
      // Reformer — need to ask if they've done an induction
      setStep("induction-check");
    } else {
      // Mat / other — go straight to booking
      window.open(cls.href, "_blank", "noreferrer");
      setIsOpen(false);
    }
  }

  function handleInductionAnswer(hasDoneInduction: boolean) {
    if (hasDoneInduction) {
      window.open(bookingLinks.mixedAbilities, "_blank", "noreferrer");
      setIsOpen(false);
    } else {
      setStep("induction");
    }
  }

  return (
    <BookingModalContext.Provider value={{ open }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-xl sm:p-8">
            {/* Close button */}
            <Dialog.Close asChild>
              <button className="absolute right-4 top-4 cursor-pointer text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            {/* Branding */}
            <div className="mb-6 flex flex-col items-center border-b border-border pb-5">
              <img
                src={logoDark}
                alt="Leigh Reformer Pilates Studio logo"
                className="h-12 w-auto"
              />
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Leigh Reformer Pilates Studio
              </p>
            </div>

            {/* ── Step 1: Choose a class ─────────────────── */}
            {step === "choose-class" && (
              <div>
                <Dialog.Title className="font-heading text-2xl">
                  Book a Class
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                  What type of class are you looking to book?
                </Dialog.Description>

                <div className="mt-6 space-y-3">
                  {classOptions.map((cls, i) => (
                    <button
                      key={cls.label}
                      disabled={cls.comingSoon}
                      onClick={() => handleClassSelect(i)}
                      className="group flex w-full cursor-pointer items-start gap-4 rounded-xl border border-border p-4 text-left transition hover:border-foreground/30 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border disabled:hover:bg-transparent"
                    >
                      <div className="flex-1">
                        <p className="font-heading text-base font-semibold">
                          {cls.label}
                          {cls.comingSoon && (
                            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Coming soon
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {cls.description}
                        </p>
                      </div>
                      {!cls.comingSoon && (
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                      )}
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-center text-xs text-muted-foreground">
                  Looking for a one-to-one session?{" "}
                  <a
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Get in touch
                  </a>
                </p>
              </div>
            )}

            {/* ── Step 2: Induction check (reformer only) ── */}
            {step === "induction-check" && (
              <div>
                <button
                  onClick={() => setStep("choose-class")}
                  className="mb-4 inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <Dialog.Title className="font-heading text-2xl">
                  {selectedClass}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                  Have you completed an induction class at Leigh Reformer
                  Pilates Studio before?
                </Dialog.Description>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleInductionAnswer(true)}
                    className="cursor-pointer rounded-full border-2 border-primary bg-primary px-6 py-5 text-primary-foreground btn-scale-hover"
                  >
                    Yes, I have
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    onClick={() => handleInductionAnswer(false)}
                    variant="outline"
                    className="cursor-pointer rounded-full border-2 px-6 py-5 btn-scale-hover"
                  >
                    No, I'm new
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 3: Induction required ─────────────── */}
            {step === "induction" && (
              <div>
                <button
                  onClick={() => setStep("induction-check")}
                  className="mb-4 inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <Dialog.Title className="font-heading text-2xl">
                  Induction Required
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  All new clients must complete an induction session before
                  joining reformer group classes. This 60-minute session will
                  teach you how to use the reformer safely and confidently.
                </Dialog.Description>

                <p className="mt-4 text-sm text-muted-foreground">
                  Sessions run once weekly - 8pm Monday's, 8pm Thursday's
                  or 12pm Saturday's.
                </p>

                <div className="mt-6">
                  <Button
                    asChild
                    className="w-full cursor-pointer rounded-full bg-primary px-6 py-5 text-primary-foreground btn-scale-hover"
                  >
                    <a
                      href={bookingLinks.induction}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Book an Induction
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Already completed your induction?{" "}
                  <button
                    onClick={() => handleInductionAnswer(true)}
                    className="cursor-pointer underline underline-offset-2 hover:text-foreground"
                  >
                    Book a mixed abilities class
                  </button>
                </p>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </BookingModalContext.Provider>
  );
}
