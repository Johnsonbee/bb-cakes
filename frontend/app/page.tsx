import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cravings from "@/components/Cravings";
import FreshFromOven from "@/components/FreshFromOven";
import AboutUs from "@/components/AboutUs";
import Academy from "@/components/Academy";
import Celebration from "@/components/Celebration";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <Hero />
      <Cravings />
      <FreshFromOven />
      <AboutUs />
      <Academy />
      <Celebration />
      <Testimonials />
      <Footer />
      <FloatingWhatsApp />
    </SmoothScrollProvider>
  );
}
