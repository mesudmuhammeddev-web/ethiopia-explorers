import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tours, destinationList, categories, slugify } from "@/data/tours";
import heroImage from "@/assets/hero-falls.jpg";
import lalibela from "@/assets/lalibela.jpg";
import simienMountains from "@/assets/simien-mountains.jpg";
import danakil from "@/assets/danakil.jpg";
import omoValley from "@/assets/omo-valley.jpg";

const slides = [
  { image: heroImage, tagline: "hero.slide1" },
  { image: lalibela, tagline: "hero.slide2" },
  { image: simienMountains, tagline: "hero.slide3" },
  { image: danakil, tagline: "hero.slide4" },
  { image: omoValley, tagline: "hero.slide5" },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = () => {
    const matched = tours.find((tour) => {
      const destMatch = !destination || tour.destination === destination;
      const catMatch = !category || tour.category === category;
      return destMatch && catMatch;
    });
    if (matched) navigate(`/tour/${slugify(matched.name)}`);
    else navigate("/tours");
  };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </AnimatePresence>
        {/* Soft gradient — keeps image visible, only darkens bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      </div>

      {/* Top content area */}
      <div className="container mx-auto px-6 pt-24 pb-40 sm:pt-32 sm:pb-48 lg:pt-40 lg:pb-56">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 backdrop-blur-md"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
            <span className="font-body text-[11px] font-medium tracking-wider text-white uppercase">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
          >
            Explore Ethiopia with <span className="italic">Local Experts</span> — Safe, Private & Fully Licensed Tours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-xl font-body text-base text-white/90 sm:text-lg"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
          >
            Authentic cultural journeys, adventure tours, and custom travel experiences across Ethiopia — guided by trusted local experts.
          </motion.p>

          {/* Trust bar — 4 checkmarks */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-body text-xs sm:text-sm font-medium text-white/95"
          >
            {[
              "Licensed Ethiopian Travel Agency",
              "500+ Verified Travelers",
              "4.9★ Average Rating",
              "24/7 WhatsApp Support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[10px] font-bold text-accent-foreground">✓</span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              asChild
              className="h-12 gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-body text-sm font-semibold text-accent-foreground shadow-xl transition-transform hover:scale-[1.02]"
            >
              <a
                href="https://wa.me/251998900160?text=Hi!%20I'd%20like%20to%20plan%20my%20Ethiopia%20trip."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Plan My Trip on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const el = document.getElementById("experiences");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else navigate("/tours");
              }}
              className="h-12 gap-2 rounded-full border-white/40 bg-white/10 px-7 font-body text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            >
              View Top Tours
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="mt-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-10 bg-white" : "w-5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating search card — overlaps bottom of hero, GetYourGuide-style */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="container mx-auto px-6 -mb-12 sm:-mb-14 relative z-20"
      >
        <div className="mx-auto max-w-5xl rounded-2xl bg-card border border-border shadow-2xl p-2 sm:p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.2fr_1.2fr_0.8fr_auto]">
            {/* Destination */}
            <div className="group relative rounded-xl px-4 py-3 hover:bg-secondary/60 transition-colors">
              <label className="block font-body text-[10px] font-bold tracking-wider text-primary uppercase">
                Destination
              </label>
              <div className="mt-1 flex items-center justify-between">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full appearance-none bg-transparent font-body text-sm font-medium text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="">Anywhere in Ethiopia</option>
                  {destinationList.filter((d) => d !== "All").map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Activity */}
            <div className="group relative rounded-xl px-4 py-3 hover:bg-secondary/60 transition-colors sm:border-l border-border">
              <label className="block font-body text-[10px] font-bold tracking-wider text-primary uppercase">
                Activity Type
              </label>
              <div className="mt-1 flex items-center justify-between">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent font-body text-sm font-medium text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="">All experiences</option>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Travelers */}
            <div className="group relative rounded-xl px-4 py-3 hover:bg-secondary/60 transition-colors sm:border-l border-border">
              <label className="block font-body text-[10px] font-bold tracking-wider text-primary uppercase">
                Travelers
              </label>
              <div className="mt-1 flex items-center justify-between">
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full appearance-none bg-transparent font-body text-sm font-medium text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="1">1 traveler</option>
                  <option value="2">2 travelers</option>
                  <option value="3">3 travelers</option>
                  <option value="4">4+ travelers</option>
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Search button */}
            <Button
              onClick={handleSearch}
              className="h-auto rounded-xl bg-[hsl(var(--accent))] px-6 py-4 font-body text-sm font-bold text-accent-foreground hover:bg-[hsl(var(--accent))]/90"
            >
              <Search className="h-4 w-4 mr-2" />
              Find Tours
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
