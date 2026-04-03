import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";
import HelpPopup from "./components/HelpPopup";

const TourDetail = lazy(() => import("./pages/TourDetail"));
const ToursPage = lazy(() => import("./pages/ToursPage"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={
            <Suspense fallback={<PageFallback />}><ToursPage /></Suspense>
          } />
          <Route path="/destinations" element={
            <Suspense fallback={<PageFallback />}><DestinationsPage /></Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageFallback />}><AboutPage /></Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<PageFallback />}><ContactPage /></Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<PageFallback />}><BlogPage /></Suspense>
          } />
          <Route path="/blog/:slug" element={
            <Suspense fallback={<PageFallback />}><BlogPost /></Suspense>
          } />
          <Route path="/tour/:slug" element={
            <Suspense fallback={<PageFallback />}><TourDetail /></Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageFallback />}><NotFound /></Suspense>
          } />
        </Routes>
        <WhatsAppButton />
        <HelpPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
