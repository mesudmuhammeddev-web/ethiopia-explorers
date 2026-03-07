import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Destinations from "@/components/Destinations";
import TourSearch from "@/components/TourSearch";
import FeaturedExperiences from "@/components/FeaturedExperiences";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Destinations />
      <TourSearch />
      <FeaturedExperiences />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
