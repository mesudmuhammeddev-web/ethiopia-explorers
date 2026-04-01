import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const AboutEthiopia = lazy(() => import("@/components/AboutEthiopia"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
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
        title="About Ethiopia Travel Explorer — Your Trusted Ethiopia Tour Agency"
        description="Learn about Ethiopia Travel Explorer, our team, our story, and why 500+ travelers trust us. 50+ tours, 15+ destinations, 4.9★ rating."
        canonicalPath="/about"
      />
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<SectionFallback />}>
          <AboutEthiopia />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default AboutPage;
