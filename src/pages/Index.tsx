import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

const TrustStats = lazy(() => import("@/components/TrustStats"));
const MicroTrust = lazy(() => import("@/components/MicroTrust"));
const FeaturedExperiences = lazy(() => import("@/components/FeaturedExperiences"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Destinations = lazy(() => import("@/components/Destinations"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const TrustedPartners = lazy(() => import("@/components/TrustedPartners"));
const MeetTheTeamHome = lazy(() => import("@/components/MeetTheTeamHome"));
const LicenseProof = lazy(() => import("@/components/LicenseProof"));
const WhatsAppTrust = lazy(() => import("@/components/WhatsAppTrust"));
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
      {/* 2. Trust bar — instant credibility */}
      <Suspense fallback={<SectionFallback />}><TrustStats /></Suspense>
      {/* 3. Micro-trust strip */}
      <Suspense fallback={<SectionFallback />}><MicroTrust /></Suspense>
      {/* 4. Featured tours — 6 best sellers only */}
      <Suspense fallback={<SectionFallback />}><FeaturedExperiences /></Suspense>
      {/* 5. Why travel with us */}
      <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
      {/* 6. Destinations */}
      <Suspense fallback={<SectionFallback />}><Destinations /></Suspense>
      {/* 7. How it works */}
      <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
      {/* 8. Real testimonials with flags & avatars */}
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      {/* 9. Meet the local team */}
      <Suspense fallback={<SectionFallback />}><MeetTheTeamHome /></Suspense>
      {/* 10. Trusted partners */}
      <Suspense fallback={<SectionFallback />}><TrustedPartners /></Suspense>
      {/* 11. License & legal proof */}
      <Suspense fallback={<SectionFallback />}><LicenseProof /></Suspense>
      {/* 12. WhatsApp trust booster */}
      <Suspense fallback={<SectionFallback />}><WhatsAppTrust /></Suspense>
      {/* 13. Final CTA */}
      <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </div>
  );
};

export default Index;
