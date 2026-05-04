import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

const TrustStats = lazy(() => import("@/components/TrustStats"));
const MicroTrust = lazy(() => import("@/components/MicroTrust"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
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
        description="Safe, private & fully licensed Ethiopia travel experiences. 4.9★ rated by 500+ travelers. Plan your trip on WhatsApp."
        canonicalPath="/"
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}><TrustStats /></Suspense>
      <Suspense fallback={<SectionFallback />}><MicroTrust /></Suspense>
      <Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>
      <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
      <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
      <Suspense fallback={<SectionFallback />}><MeetTheTeamHome /></Suspense>
      <Suspense fallback={<SectionFallback />}><TrustedPartners /></Suspense>
      <Suspense fallback={<SectionFallback />}><LicenseProof /></Suspense>
      <Suspense fallback={<SectionFallback />}><WhatsAppTrust /></Suspense>
      <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </div>
  );
};

export default Index;
