import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import WhyTrustUs from "@/components/about/WhyTrustUs";
import OurValues from "@/components/about/OurValues";
import MeetTheTeam from "@/components/about/MeetTheTeam";
import WhatMakesDifferent from "@/components/about/WhatMakesDifferent";
import LicensedSection from "@/components/about/LicensedSection";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";

const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us — Licensed Ethiopian Travel Agency | Ethiopia Travel Explorer"
        description="Fully licensed Ethiopian travel agency based in Addis Ababa. 500+ happy travelers, 50+ tours, certified local guides, 24/7 WhatsApp support. Meet the team behind your journey."
        canonicalPath="/about"
      />
      <Navbar />
      <main className="pt-20">
        <AboutHero />
        <OurStory />
        <WhyTrustUs />
        <OurValues />
        <MeetTheTeam />
        <WhatMakesDifferent />
        <LicensedSection />
        <AboutFinalCTA />
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AboutPage;
