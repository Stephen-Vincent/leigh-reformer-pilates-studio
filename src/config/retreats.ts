/**
 * Retreats — add a new retreat by appending an object to `retreats`.
 * Set `soldOut: true` to show the "Sold Out" sticker across the retreat.
 * Set `featured: true` on one retreat to show the pop-up on the home page.
 */

import heroBeach from "@/assets/retreats/big-house-by-the-sea/hero-beach-bay-mountains.jpg";
import studioInterior from "@/assets/retreats/big-house-by-the-sea/studio-interior-sea-view.jpg";
import hotTub from "@/assets/retreats/big-house-by-the-sea/hot-tub.jpg";
import ecoSauna from "@/assets/retreats/big-house-by-the-sea/eco-sauna.jpg";
import beachView from "@/assets/retreats/big-house-by-the-sea/beach-view.jpg";
import cinemaRoom from "@/assets/retreats/big-house-by-the-sea/cinema-room.jpg";
import sunroomLounge from "@/assets/retreats/big-house-by-the-sea/sunroom-lounge.jpg";
import houseExterior from "@/assets/retreats/big-house-by-the-sea/house-exterior.jpg";
import terraceSunset from "@/assets/retreats/big-house-by-the-sea/terrace-sunset-sea-view.jpg";
import yewHero from "@/assets/retreats/yewfield/hero-house-in-grounds.jpg";
import yewFells from "@/assets/retreats/yewfield/house-below-the-fells.jpg";
import yewTarnHows from "@/assets/retreats/yewfield/tarn-hows.jpg";
import yewGardens from "@/assets/retreats/yewfield/house-and-gardens.jpg";
import yewBedroom from "@/assets/retreats/yewfield/bedroom.jpg";
import yewConservatory from "@/assets/retreats/yewfield/conservatory-dining.jpg";
import yewLounge from "@/assets/retreats/yewfield/lounge.jpg";
import yewOrchard from "@/assets/retreats/yewfield/orchard.jpg";
import yewMeadow from "@/assets/retreats/yewfield/wildflower-meadow.jpg";

export type RetreatImage = { src: string; alt: string };

export type RetreatPrice = { label: string; price: string; note?: string };

export type ItineraryItem = { time: string; title?: string; text: string };

export type ItineraryDay = { day: string; items: ItineraryItem[] };

export type Retreat = {
  id: string;
  title: string;
  /** Short date, e.g. "October 2026" */
  date: string;
  /** Full date line, e.g. "Sunday 25th April 2027 · 3 nights" */
  dateDetail?: string;
  venue: string;
  location: string;
  address?: string[];
  venueUrl?: string;
  soldOut?: boolean;
  /** Show the home page pop-up for this retreat (only one should be true) */
  featured?: boolean;
  /** One or two sentences used in the home page pop-up */
  teaser?: string;
  fromPrice?: string;
  heroImage: RetreatImage;
  description: string[];
  highlights?: string[];
  prices?: RetreatPrice[];
  priceNotes?: string[];
  included?: string[];
  itinerary?: ItineraryDay[];
  contact?: { name: string; phone: string };
  images: RetreatImage[];
  imageCredit?: string;
};

export const retreats: Retreat[] = [
  {
    id: "spring-2027",
    title: "Reformer Pilates Retreat",
    date: "Spring 2027",
    dateDetail: "Sunday 25th April 2027 · 3 nights",
    venue: "Yewfield Vegetarian Guesthouse",
    location: "Hawkshead Hill, Ambleside, Lake District",
    address: ["Yewfield Vegetarian Guesthouse", "Hawkshead Hill", "Ambleside", "Cumbria", "LA22 0PR"],
    venueUrl: "https://www.yewfield.co.uk/",
    featured: true,
    teaser:
      "Three nights of reformer and mat Pilates, guided breath work and scenic walks in the heart of the Lake District, with delicious vegetarian meals included.",
    fromPrice: "£665",
    heroImage: {
      src: yewHero,
      alt: "Yewfield guesthouse set within green gardens and woodland",
    },
    description: [
      "Situated in the heart of the Lake District just a 15-minute drive from Ambleside you will find Yewfield Vegetarian Guesthouse. Set within 80 acres of private grounds, with beautiful gardens and stunning views across the National Park, here is truly a magical place where you can completely relax. With vegetarian and vegan foods being the staple of each meal, Yewfield’s chefs will often use fresh seasonal vegetables picked from its own gardens to serve you delicious energising meals. Room accommodation at Yewfield is appointed to a very high standard, all with en-suite, TV, and tea and coffee making facilities.",
      "Each day you will get to practice reformer and mat Pilates, be led by an experienced instructor, and all whilst using high performance studio equipment. The views from the Pilates studio really are magnificent! You will get to tune into the principles of Joseph Pilates and the original repertoires as well as explore more contemporary approaches. Whether you are advanced or a complete beginner you will be encouraged to build the foundations for a stronger, more flexible body, and connect daily to your deep core stabilising muscles.",
      "In between sessions you can take a map (packed lunch provided) and enjoy one of the stunning scenic walks directly from the doorstep to Hawkshead, Black Crag, or Tarn Hows. In the afternoon nourish your body with the vital flow of breath and clear your mind by joining the guided breath work and meditation sessions. This is your time to heal from within.",
      "This retreat really is the perfect place for you to unwind, decompress, and harness the many benefits that reformer and Pilates practice has to offer!",
    ],
    prices: [
      { label: "Standard twin", price: "£665", note: "per person, two persons sharing" },
      { label: "Standard single", price: "£800", note: "per person" },
    ],
    priceNotes: [
      "Subject to availability",
      "Supplement of £25 per room per night for superior rooms",
      "£150 non-refundable deposit when booking",
      "Remainder balance due 28th February 2027",
    ],
    included: [
      "3x mat Pilates sessions",
      "3x reformer Pilates sessions",
      "Guided breath work and meditation",
      "Breakfast, lunch and evening meal",
      "Hiking in a stunning location",
      "Cakes and hot beverages on arrival",
      "Teas and coffees throughout each day",
      "Complimentary Leigh Reformer Pilates Studio logo blanket",
      "Complimentary Leigh Reformer Pilates Studio logo high performance grippy reformer socks",
    ],
    itinerary: [
      {
        day: "Day 1",
        items: [
          { time: "3pm", text: "Check in, then cakes, teas, and coffees served" },
          { time: "3.15pm", title: "Introduction to the reformer", text: "Session for beginners. Learn how to use the reformer safely." },
          { time: "4–7pm", title: "Reformer: a taste of classical", text: "Small group 50-minute sessions (maximum 5 persons). Experience some of the original reformer exercises as intended by Joseph Pilates, set the foundations, and experience a full-body workout." },
          { time: "7.30pm", text: "Two course evening dinner service" },
        ],
      },
      {
        day: "Day 2",
        items: [
          { time: "8.30am", title: "Mat Pilates classical", text: "Group (maximum 15 persons). Tune in to the original principles of Joseph Pilates (control, flow, precision, concentration, breath, and centering) and practice some of the classical mat repertoire." },
          { time: "9.45am", text: "Hot and cold buffet breakfast" },
          { time: "11am", title: "Scenic walks", text: "Take a map and enjoy one of the scenic walks directly from the door to Hawkshead, Black Crag, or Tarn Hows (packed lunch provided) or relax/read a book in Yewfield’s beautiful grounds." },
          { time: "2pm", title: "Guided breath work and meditation", text: "Nourish your body with the vital flow of breath and clear your mind. This is your time to heal from within." },
          { time: "3.45–6.45pm", title: "Reformer with Cardio-Tramp Rebounder", text: "Small group 50-minute sessions (maximum 5 persons). A fun, dynamic, functional, low impact workout which blends Pilates with cardio intensity and muscular endurance." },
          { time: "7.30pm", text: "Two course evening dinner service" },
        ],
      },
      {
        day: "Day 3",
        items: [
          { time: "8.30am", title: "Mat Pilates with small equipment", text: "Group (maximum 15 persons). Connect to your deep core stabilisers, challenge balance, and enhance postural awareness." },
          { time: "9.45am", text: "Hot and cold buffet breakfast" },
          { time: "11am", title: "Scenic walks", text: "Take a map and enjoy one of the scenic walks directly from the door to Hawkshead, Black Crag, or Tarn Hows (packed lunch provided) or relax/read a book in Yewfield’s beautiful grounds." },
          { time: "2pm", title: "Guided breath work and meditation", text: "Nourish your body with the vital flow of breath and clear your mind. This is your time to heal from within." },
          { time: "3.45–6.45pm", title: "Reformer: stretch and flow", text: "Small group 50-minute sessions (maximum 5 persons). Flowing slow paced movements designed to improve flexibility and reset the body." },
          { time: "7.30pm", text: "Two course evening dinner service" },
        ],
      },
      {
        day: "Day 4",
        items: [
          { time: "8.30am", title: "Yogalates on the mat", text: "Group (maximum 15 persons). A fusion of yoga and Pilates which combines vinyasa flow, Pilates core work, and a guided relaxation." },
          { time: "9.45am", text: "Hot and cold buffet breakfast" },
          { time: "11am", title: "Checkout", text: "Time to say your goodbyes to new and old acquaintances and leave feeling stronger, deeply rested, rejuvenated, and recharged!" },
        ],
      },
    ],
    contact: { name: "Kim", phone: "07846102759" },
    images: [
      { src: yewFells, alt: "Yewfield nestled beneath the Lakeland fells" },
      { src: yewTarnHows, alt: "Tarn Hows, a scenic walk from the door" },
      { src: yewGardens, alt: "Yewfield house and flower gardens" },
      { src: yewConservatory, alt: "Bright conservatory dining room" },
      { src: yewBedroom, alt: "En-suite guest bedroom with garden views" },
      { src: yewLounge, alt: "Guest lounge with open fire" },
      { src: yewOrchard, alt: "Orchard in Yewfield’s private grounds" },
      { src: yewMeadow, alt: "Wildflower meadow in the grounds" },
    ],
    imageCredit: "Photos courtesy of Yewfield",
  },
  {
    id: "october-2026",
    title: "Reformer and Pilates Retreat",
    date: "October 2026",
    venue: "Big House by the Sea",
    location: "Llwyngwril, West Coast of Wales",
    venueUrl: "https://www.bighousebythesea.com/",
    soldOut: true,
    heroImage: {
      src: heroBeach,
      alt: "Sandy beach looking across the bay to the Welsh mountains",
    },
    description: [
      "Set in a truly remarkable destination, ‘Big House by the Sea’ offers breathtaking views over the sea and majestic mountains. Located in the coastal village of Llwyngwril on the west coast of Wales, our October retreat will provide you with a well-deserved rest and relaxation time.",
      "Each day you will get to practice reformer and mat Pilates, be led by an experienced instructor, and all whilst using high performance studio equipment. You will tune into the principles of Joseph Pilates and the original repertoires as well as explore more contemporary approaches. Whether you are advanced or a complete beginner you will be encouraged to build the foundations for a stronger, more flexible body, and connect daily to your deep core stabilising muscles.",
      "With something for everyone, in between sessions you can either soak in the hot tub, take in the stunning views of the bay, unwind in the eco sauna, take a hike to the beach, chill in the cinema room, or clear your mind by joining the guided breath work and meditation sessions. This is the perfect place for you to unwind, decompress, and harness the many benefits that reformer and Pilates practice has to offer you.",
    ],
    highlights: [
      "Daily reformer and mat Pilates",
      "Experienced instructor",
      "High performance studio equipment",
      "Suitable for beginners to advanced",
      "Hot tub and eco sauna",
      "Guided breath work and meditation",
      "Cinema room",
      "Beach hikes and sea views",
    ],
    images: [
      { src: studioInterior, alt: "Light-filled studio with floor-to-ceiling windows" },
      { src: houseExterior, alt: "Big House by the Sea exterior" },
      { src: hotTub, alt: "Wood-fired hot tub" },
      { src: terraceSunset, alt: "Terrace at sunset overlooking the sea" },
      { src: ecoSauna, alt: "Eco sauna in the grounds" },
      { src: beachView, alt: "Beach and bay views near Llwyngwril" },
      { src: sunroomLounge, alt: "Bright sunroom lounge" },
      { src: cinemaRoom, alt: "Cinema room" },
    ],
    imageCredit: "Photos courtesy of Big House by the Sea",
  },
];
