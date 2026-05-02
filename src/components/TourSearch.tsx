import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, DollarSign, Filter, Users, Calendar, ChevronDown, ChevronUp, Sparkles, Star, MessageCircle, ArrowRight, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, destinationList, categories, getPriceForGroup, getPricingLabel, type Tour } from "@/data/tours";
import { getBookingFormUrl } from "@/lib/bookingForm";

const TourSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState("All");
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [expandedTour, setExpandedTour] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = tours.filter((tour) => {
    if (selectedDest !== "All" && tour.destination !== selectedDest) return false;
    if (selectedCat !== "All" && tour.category !== selectedCat) return false;
    if (searchQuery && !tour.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleExpand = (id: number) => setExpandedTour(expandedTour === id ? null : id);

  return (
    <section id="tours" className="relative py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 -right-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block font-body text-sm tracking-widest text-primary uppercase"
          >
            {t("tourSearch.badge")}
          </motion.span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t("tourSearch.title")}{" "}
            <span className="text-gradient-gold italic">{t("tourSearch.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">
            {t("tourSearch.subtitle", { count: tours.length, destinations: destinationList.length - 1 })}
          </p>
        </motion.div>

        {/* Search & Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="glass-card rounded-2xl p-6 backdrop-blur-xl">
            {/* Search bar + travelers */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3 ring-1 ring-border/50 transition-all focus-within:ring-2 focus-within:ring-primary/50">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("tourSearch.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">{t("tourSearch.travelers")}</span>
                <div className="flex gap-1 rounded-xl bg-secondary/60 p-1 ring-1 ring-border/50">
                  {[1, 2, 3, 4, 6].map((n) => (
                    <motion.button
                      key={n}
                      onClick={() => setTravelers(n)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-lg px-3 py-1.5 font-body text-xs font-medium transition-all duration-200 ${
                        travelers === n
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination pills */}
            <div className="mt-5 flex flex-wrap items-start gap-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:overflow-visible">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <div className="flex flex-wrap gap-1.5">
                {destinationList.map((d) => (
                  <motion.button
                    key={d}
                    onClick={() => setSelectedDest(d)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all duration-200 ${
                      selectedDest === d
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category pills */}
            <div className="mt-3 flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <div className="flex gap-1.5">
                {categories.map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => setSelectedCat(c)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all duration-200 ${
                      selectedCat === c
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results bar */}
        <div className="mx-auto mt-6 max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.p
                key={filtered.length}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-body text-sm text-muted-foreground"
              >
                <span className="font-semibold text-foreground">{filtered.length}</span> {t("tourSearch.toursFound", { count: filtered.length }).replace(/^\d+\s*/, "")}
              </motion.p>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 ring-1 ring-primary/20">
                <DollarSign className="h-3.5 w-3.5 text-primary" />
                <span className="font-body text-xs font-medium text-primary">{getPricingLabel(travelers)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-4">
          {filtered.map((tour, i) => {
            const price = getPriceForGroup(tour.pricing, travelers);
            const nextAvailable = tour.availability.find((a) => a.spotsLeft > 0);
            const isExpanded = expandedTour === tour.id;
            const relatedTours = tour.relatedTourIds.map((rid) => tours.find((t2) => t2.id === rid)!).filter(Boolean);
            const isUrgent = nextAvailable && nextAvailable.spotsLeft <= 3;
            const isHot = tour.rating >= 4.9;

            return (
              <motion.div
                key={tour.id}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                layout
                className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Main row */}
                <div
                  className="flex cursor-pointer flex-col gap-4 p-4 sm:p-5"
                  onClick={() => toggleExpand(tour.id)}
                >
                  {/* Top: image + info */}
                  <div className="flex gap-4 items-start sm:items-center">
                    {/* Tour image thumbnail */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {isHot && (
                        <div className="absolute top-1 left-1 flex items-center gap-0.5 rounded-md bg-destructive/90 px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
                          <Flame className="h-2.5 w-2.5" /> HOT
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                        {tour.name}
                      </h3>
                      <div className="mt-1 sm:mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/70" />
                          {tour.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/70" />
                          {tour.duration}
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-primary/70" />
                          {tour.groupSize}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-primary">
                          {tour.category}
                        </span>
                      </div>
                    </div>

                    {/* Go to tour detail page */}
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tour/${tour.slug}`);
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      aria-label={`View ${tour.name} details`}
                      className="hidden sm:flex flex-shrink-0 items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Bottom: availability + price + actions (stacks on mobile) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/20 pt-3 sm:border-0 sm:pt-0 sm:ml-28">
                    {nextAvailable && (
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(nextAvailable.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                        <motion.p
                          className={`text-[10px] font-semibold ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}
                          animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          {isUrgent
                            ? `🔥 ${t("tourSearch.spotsLeft", { count: nextAvailable.spotsLeft })}`
                            : t("tourSearch.spots", { count: nextAvailable.spotsLeft })}
                        </motion.p>
                      </div>
                    )}

                    <div className="text-left sm:text-right">
                      <span className="font-display text-xl sm:text-2xl font-bold text-primary">${price.toFixed(2)}</span>
                      {travelers === 1 && (
                        <p className="text-[10px] text-muted-foreground">
                          <span className="line-through opacity-60">${tour.pricing.solo.toFixed(2)}</span>{" "}
                          <span className="text-primary font-medium">${tour.pricing.small.toFixed(2)}</span> {t("tourSearch.withMore")}
                        </p>
                      )}
                      {travelers >= 2 && travelers < 4 && (
                        <p className="text-[10px] text-muted-foreground">
                          ${tour.pricing.group.toFixed(2)}{t("tourSearch.ppWith4")}
                        </p>
                      )}
                      {travelers >= 4 && (
                        <p className="text-[10px] text-primary font-semibold flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" /> {t("tourSearch.bestGroupRate")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="font-body text-sm font-bold text-foreground">{tour.rating}</span>
                      </div>
                      <a
                        href={`https://wa.me/251998900160?text=${encodeURIComponent(`Hi, I want to book ${tour.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                        aria-label="Book via WhatsApp"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={getBookingFormUrl({ tourName: tour.name, price, travelers })}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-primary/20 text-xs sm:text-sm"
                        >
                          {t("tourSearch.bookNow")}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>

                    {/* Mobile chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="sm:hidden"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/30 px-5 pb-6 pt-5">
                        {/* Description */}
                        <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground">{tour.description}</p>

                        {/* Dynamic Pricing Tiers */}
                        <div className="mb-5">
                          <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-foreground">
                            <DollarSign className="h-4 w-4 text-primary" />
                            {t("tourSearch.dynamicPricing")}
                          </h4>
                          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                            {[
                              { label: t("tourSearch.person1"), price: tour.pricing.solo, active: travelers === 1 },
                              { label: t("tourSearch.people23"), price: tour.pricing.small, active: travelers >= 2 && travelers < 4 },
                              { label: t("tourSearch.people4"), price: tour.pricing.group, active: travelers >= 4 },
                            ].map((tier) => (
                              <motion.div
                                key={tier.label}
                                whileHover={{ scale: 1.05 }}
                                className={`rounded-xl px-3 py-2 sm:px-5 sm:py-3 text-center transition-all duration-300 ${
                                  tier.active
                                    ? "bg-primary/15 ring-2 ring-primary shadow-lg shadow-primary/10"
                                    : "bg-secondary/60 hover:bg-secondary"
                                }`}
                              >
                                <p className={`font-display text-base sm:text-xl font-bold ${tier.active ? "text-primary" : "text-foreground"}`}>
                                  ${tier.price.toFixed(2)}
                                </p>
                                <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{tier.label}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Availability Calendar */}
                        <div className="mb-5">
                          <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            {t("tourSearch.availability")}
                          </h4>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {tour.availability.map((slot) => {
                              const d = new Date(slot.date);
                              const isSoldOut = slot.spotsLeft === 0;
                              const isLow = slot.spotsLeft > 0 && slot.spotsLeft <= 3;
                              return (
                                <motion.div
                                  key={slot.date}
                                  whileHover={!isSoldOut ? { scale: 1.1, y: -2 } : {}}
                                  className={`flex min-w-[60px] flex-col items-center rounded-xl px-2.5 py-2.5 text-center transition-all cursor-pointer ${
                                    isSoldOut
                                      ? "bg-destructive/5 opacity-40"
                                      : isLow
                                        ? "bg-destructive/10 ring-1 ring-destructive/30 hover:shadow-md"
                                        : "bg-secondary/60 hover:bg-secondary hover:shadow-md"
                                  }`}
                                >
                                  <span className="font-body text-[10px] text-muted-foreground">
                                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                                  </span>
                                  <span className="font-display text-base font-bold text-foreground">{d.getDate()}</span>
                                  <span className={`text-[9px] font-semibold ${
                                    isSoldOut ? "text-destructive" : isLow ? "text-destructive" : "text-muted-foreground"
                                  }`}>
                                    {isSoldOut
                                      ? t("tourSearch.soldOut")
                                      : isLow
                                        ? t("tourSearch.spotsLeft", { count: slot.spotsLeft })
                                        : t("tourSearch.spots", { count: slot.spotsLeft })}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Related Tours */}
                        {relatedTours.length > 0 && (
                          <div>
                            <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-foreground">
                              <Sparkles className="h-4 w-4 text-primary" />
                              {t("tourSearch.alsoBooked")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {relatedTours.map((rt) => (
                                <motion.button
                                  key={rt.id}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => {
                                    setExpandedTour(rt.id);
                                    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-2.5 transition-all hover:bg-secondary hover:shadow-md ring-1 ring-border/30"
                                >
                                  <div className="text-left">
                                    <span className="font-display text-xs font-bold text-foreground">{rt.name}</span>
                                    <p className="text-[10px] text-muted-foreground">{rt.destination} • {rt.duration}</p>
                                  </div>
                                  <span className="font-display text-sm font-bold text-primary">
                                    ${getPriceForGroup(rt.pricing, travelers).toFixed(2)}
                                  </span>
                                </motion.button>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="font-display text-lg font-semibold text-foreground">No tours found</p>
              <p className="text-sm text-muted-foreground mt-1">{t("tourSearch.noTours")}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSelectedDest("All"); setSelectedCat("All"); setSearchQuery(""); }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourSearch;
