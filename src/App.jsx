import { useSmoothScroll } from "./lib/useSmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import Work from "./components/sections/Work";
import Testimonials from "./components/sections/Testimonials";
import Process from "./components/sections/Process";
import Pricing from "./components/sections/Pricing";
import FAQ from "./components/sections/FAQ";
import FinalCTA from "./components/sections/FinalCTA";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Work />
        <Testimonials />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
