import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, DollarSign, Filter, Users, Calendar, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, destinationList, categories, getPriceForGroup, getPricingLabel, type Tour } from "@/data/tours";

const TourSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState("All");
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [expandedTour, setExpandedTour] = useState<number | null>(null);

  const filtered = tours.filter((tour) => {
    if (selectedDest !== "All" && tour.destination !== selectedDest) return false;
    if (selectedCat !== "All" && tour.category !== selectedCat) return false;
    if (searchQuery && !tour.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleExpand = (id: number) => setExpandedTour(expandedTour === id ? null : id);

  return (
    <section id="tours" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("tourSearch.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("tourSearch.title")} <span className="text-gradient-gold italic">{t("tourSearch.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">
            {t("tourSearch.subtitle", { count: tours.length, destinations: destinationList.length - 1 })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card mx-auto mt-12 max-w-5xl rounded-2xl p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder={t("tourSearch.searchPlaceholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-body text-xs text-muted-foreground">{t("tourSearch.travelers")}</span>
              {[1, 2, 3, 4, 6].map((n) => (
                <button key={n} onClick={() => setTravelers(n)} className={`rounded-lg px-2.5 py-1.5 font-body text-xs font-medium transition-all ${travelers === n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{n}</button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {destinationList.map((d) => (
              <button key={d} onClick={() => setSelectedDest(d)} className={`rounded-lg px-3 py-1.5 font-body text-xs font-medium transition-all ${selectedDest === d ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{d}</button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((c) => (
              <button key={c} onClick={() => setSelectedCat(c)} className={`rounded-full px-3 py-1 font-body text-xs transition-all ${selectedCat === c ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-4 max-w-5xl">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-body text-sm text-muted-foreground">{t("tourSearch.toursFound", { count: filtered.length })}</p>
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-medium text-primary">{getPricingLabel(travelers)}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl gap-3">
          {filtered.map((tour, i) => {
            const price = getPriceForGroup(tour.pricing, travelers);
            const nextAvailable = tour.availability.find((a) => a.spotsLeft > 0);
            const isExpanded = expandedTour === tour.id;
            const relatedTours = tour.relatedTourIds.map((rid) => tours.find((t2) => t2.id === rid)!).filter(Boolean);

            return (
              <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden rounded-xl">
                <div className="flex cursor-pointer flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center" onClick={() => toggleExpand(tour.id)}>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{tour.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tour.destination}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tour.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{tour.groupSize}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{tour.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {nextAvailable && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(nextAvailable.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                        <p className={`text-[10px] font-medium ${nextAvailable.spotsLeft <= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                          {nextAvailable.spotsLeft <= 3 ? t("tourSearch.spotsLeft", { count: nextAvailable.spotsLeft }) : t("tourSearch.spots", { count: nextAvailable.spotsLeft })}
                        </p>
                      </div>
                    )}
                    <div className="text-right">
                      <span className="font-display text-xl font-bold text-primary">${price.toFixed(2)}</span>
                      {travelers === 1 && (
                        <p className="text-[10px] text-muted-foreground">
                          <span className="line-through">${tour.pricing.solo.toFixed(2)}</span> ${tour.pricing.small.toFixed(2)} {t("tourSearch.withMore")}
                        </p>
                      )}
                      {travelers >= 2 && travelers < 4 && (
                        <p className="text-[10px] text-muted-foreground">${tour.pricing.group.toFixed(2)}{t("tourSearch.ppWith4")}</p>
                      )}
                      {travelers >= 4 && (
                        <p className="text-[10px] text-accent font-medium">{t("tourSearch.bestGroupRate")}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-body text-xs font-semibold text-primary">⭐ {tour.rating}</span>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-dark" onClick={(e) => { e.stopPropagation(); navigate(`/tour/${tour.slug}`); }}>
                        {t("tourSearch.bookNow")}
                      </Button>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="border-t border-border/50 px-5 pb-5 pt-4">
                        <p className="mb-3 font-body text-sm text-muted-foreground">{tour.description}</p>
                        <div className="mb-4">
                          <h4 className="mb-2 font-display text-sm font-semibold text-foreground">{t("tourSearch.dynamicPricing")}</h4>
                          <div className="flex flex-wrap gap-3">
                            <div className={`rounded-lg px-4 py-2 text-center ${travelers === 1 ? "bg-primary/20 ring-1 ring-primary" : "bg-secondary"}`}>
                              <p className="font-display text-lg font-bold text-primary">${tour.pricing.solo.toFixed(2)}</p>
                              <p className="text-[10px] text-muted-foreground">{t("tourSearch.person1")}</p>
                            </div>
                            <div className={`rounded-lg px-4 py-2 text-center ${travelers >= 2 && travelers < 4 ? "bg-primary/20 ring-1 ring-primary" : "bg-secondary"}`}>
                              <p className="font-display text-lg font-bold text-primary">${tour.pricing.small.toFixed(2)}</p>
                              <p className="text-[10px] text-muted-foreground">{t("tourSearch.people23")}</p>
                            </div>
                            <div className={`rounded-lg px-4 py-2 text-center ${travelers >= 4 ? "bg-primary/20 ring-1 ring-primary" : "bg-secondary"}`}>
                              <p className="font-display text-lg font-bold text-primary">${tour.pricing.group.toFixed(2)}</p>
                              <p className="text-[10px] text-muted-foreground">{t("tourSearch.people4")}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h4 className="mb-2 font-display text-sm font-semibold text-foreground">
                            <Calendar className="mr-1 inline h-4 w-4" /> {t("tourSearch.availability")}
                          </h4>
                          <div className="flex gap-1.5 overflow-x-auto pb-2">
                            {tour.availability.map((slot) => {
                              const d = new Date(slot.date);
                              const isSoldOut = slot.spotsLeft === 0;
                              const isLow = slot.spotsLeft > 0 && slot.spotsLeft <= 3;
                              return (
                                <div key={slot.date} className={`flex min-w-[56px] flex-col items-center rounded-lg px-2 py-2 text-center transition-colors ${isSoldOut ? "bg-destructive/10 opacity-50" : isLow ? "bg-accent/20 ring-1 ring-accent" : "bg-secondary hover:bg-secondary/80"}`}>
                                  <span className="font-body text-[10px] text-muted-foreground">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                                  <span className="font-display text-sm font-semibold text-foreground">{d.getDate()}</span>
                                  <span className={`text-[9px] font-medium ${isSoldOut ? "text-destructive" : isLow ? "text-accent" : "text-muted-foreground"}`}>
                                    {isSoldOut ? t("tourSearch.soldOut") : isLow ? t("tourSearch.spotsLeft", { count: slot.spotsLeft }) : t("tourSearch.spots", { count: slot.spotsLeft })}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {relatedTours.length > 0 && (
                          <div>
                            <h4 className="mb-2 flex items-center gap-1 font-display text-sm font-semibold text-foreground">
                              <Sparkles className="h-4 w-4 text-primary" /> {t("tourSearch.alsoBooked")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {relatedTours.map((rt) => (
                                <button key={rt.id} onClick={() => { setExpandedTour(rt.id); document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-2 transition-colors hover:bg-secondary/80">
                                  <div className="text-left">
                                    <span className="font-display text-xs font-semibold text-foreground">{rt.name}</span>
                                    <p className="text-[10px] text-muted-foreground">{rt.destination} • {rt.duration}</p>
                                  </div>
                                  <span className="font-display text-sm font-bold text-primary">${getPriceForGroup(rt.pricing, travelers).toFixed(2)}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">{t("tourSearch.noTours")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourSearch;
