import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, getPriceForGroup } from "@/data/tours";

const featuredIds = [1, 2, 3, 4, 7, 9, 13, 14];

const FeaturedExperiences = () => {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(2);
  const featured = featuredIds.map((id) => tours.find((t) => t.id === id)!).filter(Boolean);

  return (
    <section id="experiences" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">Curated For You</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Featured <span className="text-gradient-gold italic">Experiences</span>
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-xs text-muted-foreground">Group size:</span>
            {[1, 2, 4].map((n) => (
              <button
                key={n}
                onClick={() => setTravelers(n)}
                className={`rounded-lg px-2.5 py-1 font-body text-xs font-medium transition-all ${
                  travelers === n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {n === 1 ? "Solo" : n === 2 ? "2–3" : "4+"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((tour, i) => {
            const price = getPriceForGroup(tour.pricing, travelers);
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group hover-lift relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {tour.duration}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground">{tour.name}</h3>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="font-display text-xl font-bold text-primary">${price.toFixed(2)}</span>
                      <p className="font-body text-[10px] text-muted-foreground">
                        {travelers >= 4 ? "group rate / pp" : travelers >= 2 ? "per person" : "solo rate"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="gap-1 bg-primary text-primary-foreground hover:bg-gold-dark"
                    >
                      Book
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
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
