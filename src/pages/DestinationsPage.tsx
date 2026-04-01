import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const Destinations = lazy(() => import("@/components/Destinations"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ethiopia Destinations — 45+ Travel Destinations | Ethiopia Travel Explorer"
        description="Explore 45+ stunning Ethiopian destinations across 10 regions. From the Simien Mountains to the Danakil Depression. Plan your dream trip today."
        canonicalPath="/destinations"
      />
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<SectionFallback />}>
          <Destinations />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default DestinationsPage;
