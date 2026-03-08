import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Search, ChevronDown, MessageCircle } from "lucide-react";
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
  const [duration, setDuration] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = () => {
    const matched = tours.find((tour) => {
      const destMatch = !destination || tour.destination === destination;
      const catMatch = !category || tour.category === category;
      const durMatch =
        !duration ||
        (duration === "1-3" && parseInt(tour.duration) <= 3) ||
        (duration === "4-7" && parseInt(tour.duration) >= 4 && parseInt(tour.duration) <= 7) ||
        (duration === "8+" && parseInt(tour.duration) >= 8);
      return destMatch && catMatch && durMatch;
    });
    if (matched) {
      navigate(`/tour/${slugify(matched.name)}`);
    } else {
      document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPackages = () => {
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Sliding background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-background/50" />

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentSlide ? "w-8 bg-primary" : "w-3 bg-foreground/30"
            }`}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-body text-sm tracking-widest text-primary uppercase">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto max-w-4xl font-display text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
        >
          {t("hero.title1")}{" "}
          <span className="text-gradient-gold italic">{t("hero.title2")}</span> &{" "}
          <span className="text-gradient-gold italic">{t("hero.title3")}</span>
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground md:text-xl"
          >
            {t(slides[currentSlide].tagline)}
          </motion.p>
        </AnimatePresence>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            asChild
            className="gap-2 rounded-full bg-[hsl(var(--accent))] px-8 py-6 font-body text-base font-semibold text-accent-foreground shadow-lg transition-all hover:scale-105"
          >
            <a href="https://wa.me/251900000000?text=Hello!%20I'm%20interested%20in%20booking%20a%20tour." target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {t("hero.bookNow")}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToPackages}
            className="gap-2 rounded-full border-foreground/20 px-8 py-6 font-body text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:scale-105 hover:bg-foreground/10"
          >
            {t("hero.seePackages")}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Integrated Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-3">
            <div className="grid gap-2 sm:grid-cols-4">
              <div className="relative">
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">{t("hero.allDestinations")}</option>
                  {destinationList.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">{t("hero.allActivities")}</option>
                  {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">{t("hero.anyDuration")}</option>
                  <option value="1-3">{t("hero.days13")}</option>
                  <option value="4-7">{t("hero.days47")}</option>
                  <option value="8+">{t("hero.days8")}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <Button onClick={handleSearch} className="gap-2 rounded-xl bg-primary px-6 py-3.5 font-body text-sm font-semibold text-primary-foreground hover:bg-gold-dark">
                <Search className="h-4 w-4" />
                {t("hero.findTours")}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mx-auto mt-16 grid max-w-2xl grid-cols-4 gap-8">
          {[
            { value: "500+", label: t("hero.happyTravelers") },
            { value: "50+", label: t("hero.uniqueTours") },
            { value: "15+", label: t("hero.destinations") },
            { value: "4.9", label: t("hero.starRating") },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 font-body text-xs tracking-wider text-muted-foreground uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-foreground/30 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
