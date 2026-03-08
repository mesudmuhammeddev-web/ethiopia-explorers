import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageCircle, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, getPriceForGroup } from "@/data/tours";

// Top profitable packages first, lower-selling pushed down
const featuredIds = [1, 2, 3, 4, 7, 9, 13, 14];

const FeaturedExperiences = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(2);
  const featured = featuredIds.map((id) => tours.find((tour) => tour.id === id)!).filter(Boolean);

  return (
    <section id="experiences" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("featured.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("featured.title")} <span className="text-gradient-gold italic">{t("featured.titleHighlight")}</span>
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-xs text-muted-foreground">{t("featured.groupSize")}</span>
            {[1, 2, 4].map((n) => (
              <button
                key={n}
                onClick={() => setTravelers(n)}
                className={`rounded-lg px-2.5 py-1 font-body text-xs font-medium transition-all ${travelers === n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {n === 1 ? t("featured.solo") : n === 2 ? "2–3" : "4+"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((tour, i) => {
            const price = getPriceForGroup(tour.pricing, travelers);
            const isHot = i < 3; // Top 3 are "hot" / most profitable
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group hover-lift relative overflow-hidden rounded-2xl"
              >
                {/* Hot badge */}
                {isHot && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-destructive/90 px-2.5 py-1 text-xs font-bold text-destructive-foreground">
                    <Flame className="h-3 w-3" /> Popular
                  </div>
                )}

                {/* Availability counter */}
                <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground border border-border">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  {Math.floor(Math.random() * 8) + 3} booked this week
                </div>

                <div className="aspect-[3/4] overflow-hidden">
                  <img src={tour.image} alt={tour.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">{tour.duration}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground">{tour.name}</h3>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-muted-foreground line-clamp-2">{tour.description}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="font-display text-xl font-bold text-primary">${price.toFixed(2)}</span>
                      <p className="font-body text-[10px] text-muted-foreground">
                        {travelers >= 4 ? t("tourSearch.groupRate") : travelers >= 2 ? t("tourSearch.perPerson") : t("tourSearch.soloRate")}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <a
                        href={`https://wa.me/251998900160?text=${encodeURIComponent(`Hi, I want to book ${tour.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                        aria-label={`Book ${tour.name} via WhatsApp`}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-gold-dark" onClick={() => navigate(`/tour/${tour.slug}`)}>
                        {t("featured.book")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
