import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tours, destinationList, categories, slugify } from "@/data/tours";
import heroImage from "@/assets/hero-falls.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const handleSearch = () => {
    // Find first matching tour and navigate, or scroll to tours section
    const matched = tours.find((t) => {
      const destMatch = !destination || t.destination === destination;
      const catMatch = !category || t.category === category;
      const durMatch =
        !duration ||
        (duration === "1-3" && parseInt(t.duration) <= 3) ||
        (duration === "4-7" && parseInt(t.duration) >= 4 && parseInt(t.duration) <= 7) ||
        (duration === "8+" && parseInt(t.duration) >= 8);
      return destMatch && catMatch && durMatch;
    });
    if (matched) {
      navigate(`/tour/${slugify(matched.name)}`);
    } else {
      document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-background/40" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-body text-sm tracking-widest text-primary uppercase">
              Ethiopia's Hidden Gems
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto max-w-4xl font-display text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Unforgettable Ethiopia{" "}
          <span className="text-gradient-gold italic">Tours</span> &{" "}
          <span className="text-gradient-gold italic">Adventures</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground md:text-xl"
        >
          Authentic, personalized tours across Ethiopia's rich history, culture,
          and landscapes — crafted by local experts
        </motion.p>

        {/* Integrated Search Form — inspired by Abyssinian Tour Operator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-3">
            <div className="grid gap-2 sm:grid-cols-4">
              {/* Destination */}
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Destinations</option>
                  {destinationList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Activities</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Duration */}
              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-secondary/60 px-4 py-3.5 pr-10 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Any Duration</option>
                  <option value="1-3">1–3 Days</option>
                  <option value="4-7">4–7 Days</option>
                  <option value="8+">8+ Days</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Search button */}
              <Button
                onClick={handleSearch}
                className="gap-2 rounded-xl bg-primary px-6 py-3.5 font-body text-sm font-semibold text-primary-foreground hover:bg-gold-dark"
              >
                <Search className="h-4 w-4" />
                Find Tours
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Happy Travelers" },
            { value: "50+", label: "Unique Tours" },
            { value: "15+", label: "Destinations" },
            { value: "4.9", label: "Star Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 font-body text-xs tracking-wider text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-foreground/30 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
