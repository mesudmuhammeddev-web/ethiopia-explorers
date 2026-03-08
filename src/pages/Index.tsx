import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";

// Lazy load below-fold sections for faster initial paint
const AboutEthiopia = lazy(() => import("@/components/AboutEthiopia"));
const Destinations = lazy(() => import("@/components/Destinations"));
const Gallery = lazy(() => import("@/components/Gallery"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const TourSearch = lazy(() => import("@/components/TourSearch"));
const BuildYourTrip = lazy(() => import("@/components/BuildYourTrip"));
const FeaturedExperiences = lazy(() => import("@/components/FeaturedExperiences"));
const TourComparison = lazy(() => import("@/components/TourComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutEthiopia />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Destinations />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TourSearch />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BuildYourTrip />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturedExperiences />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TourComparison />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
};

export default Index;
