import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutEthiopia from "@/components/AboutEthiopia";
import WhyChooseUs from "@/components/WhyChooseUs";
import Destinations from "@/components/Destinations";
import Gallery from "@/components/Gallery";
import TourSearch from "@/components/TourSearch";
import BuildYourTrip from "@/components/BuildYourTrip";
import FeaturedExperiences from "@/components/FeaturedExperiences";
import TourComparison from "@/components/TourComparison";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutEthiopia />
      <Destinations />
      <Gallery />
      <WhyChooseUs />
      <TourSearch />
      <BuildYourTrip />
      <FeaturedExperiences />
      <TourComparison />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
