import { Analytics } from "@vercel/analytics/react";
import { BookingModalProvider } from "./components/shared/BookingModal";
import About from "./components/home/About";
import Classes from "./components/home/Classes";
import Contact from "./components/home/Contact";
import FAQ from "./components/home/FAQ";
import Hero from "./components/home/Hero";
import Mission from "./components/home/Mission";
import Pricing from "./components/home/Pricing";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <BookingModalProvider>
      <div className="bg-background text-foreground font-sans">
        <Header />

        <main className="scroll-smooth">
          <Hero />
          <Classes />
          <Pricing />
          <About />
          <Mission />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <Analytics />
      </div>
    </BookingModalProvider>
  );
}
