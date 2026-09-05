/* ── Booking links by class type ─────────────────────────────── */

export const bookingLinks = {
  /** First-timers: must complete induction before group classes */
  induction:
    "https://leighreformerpilates.bookwhen.com/schedules/9urwlvjz9rkh#",

  /** Returning clients: reformer mixed-abilities timetable */
  mixedAbilities:
    "https://leighreformerpilates.bookwhen.com/schedules/6w87mh10zh8c#",

  /** Mat Pilates */
  matPilates:
    "https://bookwhen.com/mat-pilates-leigh-reformer-pilates-studio#focus=ev-s71ws-20260304112000",

  /** Back Care */
  backCare: "https://bookwhen.com/back-care",

  /** Fallback / generic — points to induction for safety */
  primary: "https://leighreformerpilates.bookwhen.com/schedules/9urwlvjz9rkh#",
};

/* ── Class options shown to returning clients ────────────────── */

export type ClassOption = {
  label: string;
  description: string;
  href: string;
  comingSoon?: boolean;
  /** If true, new clients must complete an induction first */
  requiresInduction?: boolean;
};

/** Options shown when user picks what they want to book */
export const classOptions: ClassOption[] = [
  {
    label: "Reformer Pilates",
    description:
      "Full-body sessions for all levels. Improve posture, flexibility and strength.",
    href: bookingLinks.mixedAbilities,
    requiresInduction: true,
  },
  {
    label: "Mat Pilates",
    description:
      "Floor-based Pilates focusing on core strength and flexibility. No induction required.",
    href: bookingLinks.matPilates,
  },
  {
    label: "Back Care",
    description: "Targeted sessions to help relieve and prevent back pain.",
    href: bookingLinks.backCare,
  },
];
