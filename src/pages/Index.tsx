import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

const TrustStats = lazy(() => import("@/components/TrustStats"));
const FeaturedExperiences = lazy(() => import("@/components/FeaturedExperiences"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Destinations = lazy(() => import("@/components/Destinations"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
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
        title="Ethiopia Travel Explorer — Licensed Local Tours, Trekking & Cultural Adventures"
        description="Safe, private & fully licensed Ethiopia tours: Lalibela, Simien, Danakil, Omo Valley, Harar. 4.9★ rated by 500+ travelers. Plan your trip on WhatsApp."
        canonicalPath="/"
      />
      <Navbar />
      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Social proof strip */}
      <Suspense fallback={<SectionFallback />}><TrustStats /></Suspense>
      {/* 3. Featured tours — 6 best sellers only */}
      <Suspense fallback={<SectionFallback />}><FeaturedExperiences /></Suspense>
      {/* 4. Why travel with us */}
      <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
      {/* 5. Destinations */}
      <Suspense fallback={<SectionFallback />}><Destinations /></Suspense>
      {/* 6. How it works */}
      <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
      {/* 7. Testimonials */}
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      {/* 8 + 9. Final CTA (with trust block) */}
      <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </div>
  );
};

export default Index;
