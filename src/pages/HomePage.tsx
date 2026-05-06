import About from "@/components/home/About";
import Classes from "@/components/home/Classes";
import Contact from "@/components/home/Contact";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Gallery from "@/components/home/Gallery";
import Mission from "@/components/home/Mission";
import Pricing from "@/components/home/Pricing";
import Reviews from "@/components/home/Reviews";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />

      <main className="scroll-smooth">
        <Hero />
        <Classes />
        <Pricing />
        <About />
        <Mission />
        <Reviews />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
