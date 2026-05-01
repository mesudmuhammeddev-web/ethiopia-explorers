import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

const TrustStats = lazy(() => import("@/components/TrustStats"));
const Categories = lazy(() => import("@/components/Categories"));
const FeaturedExperiences = lazy(() => import("@/components/FeaturedExperiences"));
const Destinations = lazy(() => import("@/components/Destinations"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
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
      <SEOHead
        title="Ethiopia Travel Explorer — Book Tours, Trekking & Cultural Adventures"
        description="Book unforgettable Ethiopia tours: Lalibela, Simien Mountains, Danakil, Omo Valley & more. 50+ guided experiences, 4.9★ rated. WhatsApp booking in minutes."
        canonicalPath="/"
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}><TrustStats /></Suspense>
      <Suspense fallback={<SectionFallback />}><FeaturedExperiences /></Suspense>
      <Suspense fallback={<SectionFallback />}><Categories /></Suspense>
      <Suspense fallback={<SectionFallback />}><Destinations /></Suspense>
      <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
      <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
      <Suspense fallback={<SectionFallback />}><ContactSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </div>
  );
};

export default Index;
