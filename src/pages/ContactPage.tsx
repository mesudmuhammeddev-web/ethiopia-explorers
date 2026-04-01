import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const ContactSection = lazy(() => import("@/components/ContactSection"));
const BuildYourTrip = lazy(() => import("@/components/BuildYourTrip"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Ethiopia Travel Explorer — Plan Your Ethiopia Trip"
        description="Get in touch with Ethiopia Travel Explorer. Send an inquiry, chat on WhatsApp, or build your custom trip. We respond within 24 hours."
        canonicalPath="/contact"
      />
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={<SectionFallback />}>
          <BuildYourTrip />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default ContactPage;
