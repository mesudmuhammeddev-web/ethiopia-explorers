import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, MessageCircle, Flame, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, getPriceForGroup, slugify } from "@/data/tours";
import { getBookingFormUrl } from "@/lib/bookingForm";

// Best sellers only — Lake Tana, Lalibela, Simien, Danakil, Omo Valley, Harar
const featuredIds = [1, 6, 7, 9, 14, 13];

const FeaturedExperiences = () => {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(2);
  const featured = featuredIds
    .map((id) => tours.find((t) => t.id === id)!)
    .filter(Boolean);

  return (
    <section id="experiences" className="relative py-20 sm:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="font-body text-xs sm:text-sm tracking-widest text-primary uppercase font-semibold">
              Best Sellers
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-foreground">
              Most Booked Experiences in Ethiopia
            </h2>
            <p className="mt-2 font-body text-sm sm:text-base text-muted-foreground">
              The 6 tours travelers love most — hand-picked and instantly bookable.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground hidden sm:inline">Group:</span>
            {[
              { n: 1, label: "Solo" },
              { n: 2, label: "2–3" },
              { n: 4, label: "4+" },
            ].map((opt) => (
              <button
                key={opt.n}
                onClick={() => setTravelers(opt.n)}
                className={`rounded-full border px-3.5 py-1.5 font-body text-xs font-semibold transition-all ${
                  travelers === opt.n
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tour, i) => {
            const price = getPriceForGroup(tour.pricing, travelers);
            const isHot = i < 2;
            const isPopular = i >= 2 && i < 4;
            const slug = slugify(tour.name);
            const reviewCount = 80 + (tour.id * 17) % 220;

            return (
              <motion.article
                key={tour.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/tour/${slug}`)}
                >
                  <img
                    src={tour.image}
                    alt={tour.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Top-left badge */}
                  {isHot && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[hsl(var(--accent))] px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-md">
                      <Flame className="h-3 w-3" /> Hot
                    </div>
                  )}
                  {isPopular && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                      <TrendingUp className="h-3 w-3" /> Popular
                    </div>
                  )}
                  {/* Duration chip */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur-sm px-2.5 py-1 font-body text-[11px] font-semibold text-foreground shadow-sm">
                    <Clock className="h-3 w-3 text-primary" />
                    {tour.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Location + category */}
                  <div className="flex items-center gap-1.5 font-body text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary/70" />
                    <span className="truncate">{tour.destination}</span>
                    <span>•</span>
                    <span className="text-primary font-semibold">{tour.category}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => navigate(`/tour/${slug}`)}
                    className="mt-2 font-display text-base font-bold text-foreground leading-snug line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  >
                    {tour.name}
                  </h3>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-body text-xs font-bold text-foreground">{tour.rating}</span>
                    <span className="font-body text-xs text-muted-foreground">
                      ({reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-4 flex items-end justify-between gap-2 border-t border-border/50 mt-4">
                    <div className="min-w-0">
                      <div className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                        From
                      </div>
                      <div className="font-display text-xl font-bold text-foreground leading-none">
                        ${price.toFixed(0)}
                      </div>
                      <div className="font-body text-[10px] text-muted-foreground mt-0.5">
                        per person
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`https://wa.me/251998900160?text=${encodeURIComponent(`Hi, I want to book ${tour.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Book via WhatsApp"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a
                        href={getBookingFormUrl({ tourName: tour.name, price, travelers })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="h-9 gap-1 rounded-lg bg-[hsl(var(--accent))] px-3 font-body text-xs font-bold text-accent-foreground hover:bg-[hsl(var(--accent))]/90"
                        >
                          Book
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/tours")}
            className="rounded-full border-primary/30 px-8 font-body text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Tours
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
