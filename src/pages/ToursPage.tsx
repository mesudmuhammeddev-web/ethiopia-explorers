import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const TourSearch = lazy(() => import("@/components/TourSearch"));
const FeaturedExperiences = lazy(() => import("@/components/FeaturedExperiences"));
const TourComparison = lazy(() => import("@/components/TourComparison"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const ToursPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ethiopia Tours — 50+ Guided Tours & Adventures | Ethiopia Travel Explorer"
        description="Browse 50+ guided tours across Ethiopia. From Lalibela rock churches to Danakil Depression adventures. Dynamic group pricing, instant booking."
        canonicalPath="/tours"
      />
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<SectionFallback />}>
          <TourSearch />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedExperiences />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TourComparison />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default ToursPage;
