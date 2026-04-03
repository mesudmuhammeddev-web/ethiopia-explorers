import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, X, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, getPriceForGroup, type Tour } from "@/data/tours";

const TourComparison = () => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 5]);
  const [travelers, setTravelers] = useState(2);
  const [adding, setAdding] = useState(false);

  const selected = selectedIds.map((id) => tours.find((tour) => tour.id === id)!).filter(Boolean);
  const available = tours.filter((tour) => !selectedIds.includes(tour.id));

  const removeTour = (id: number) => setSelectedIds((prev) => prev.filter((x) => x !== id));
  const addTour = (id: number) => { setSelectedIds((prev) => [...prev, id]); setAdding(false); };

  return (
    <section id="compare" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("compare.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("compare.title")} <span className="text-gradient-gold italic">{t("compare.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">{t("compare.subtitle")}</p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-body text-xs sm:text-sm text-muted-foreground">{t("compare.travelers")}</span>
          {[1, 2, 3, 4, 6].map((n) => (
            <button key={n} onClick={() => setTravelers(n)} className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 font-body text-[10px] sm:text-xs font-medium transition-all ${travelers === n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {n} {n === 1 ? t("compare.person") : t("compare.people")}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mx-auto mt-8 max-w-5xl overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="glass-card rounded-2xl p-6">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-left font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("compare.feature")}</th>
                  {selected.map((tour) => (
                    <th key={tour.id} className="pb-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-display text-sm font-semibold text-foreground">{tour.name}</span>
                        <button onClick={() => removeTour(tour.id)} className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"><X className="h-3 w-3" /></button>
                      </div>
                    </th>
                  ))}
                  {selected.length < 5 && (
                    <th className="pb-4 text-center">
                      <button onClick={() => setAdding(!adding)} className="mx-auto flex items-center gap-1 rounded-lg border border-dashed border-border px-3 py-2 font-body text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <Plus className="h-3 w-3" /> {t("compare.add")}
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="font-body text-sm">
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.pricePerPerson")}</td>
                  {selected.map((tour) => (
                    <td key={tour.id} className="py-4 text-center">
                      <span className="font-display text-xl font-bold text-primary">${getPriceForGroup(tour.pricing, travelers).toFixed(2)}</span>
                      <p className="text-[10px] text-muted-foreground">{travelers >= 4 ? t("compare.groupRateLabel") : travelers >= 2 ? t("compare.smallGroupLabel") : t("compare.soloRateLabel")}</p>
                    </td>
                  ))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.duration")}</td>
                  {selected.map((tour) => (<td key={tour.id} className="py-4 text-center text-foreground">{tour.duration}</td>))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.rating")}</td>
                  {selected.map((tour) => (
                    <td key={tour.id} className="py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-primary"><Star className="h-3.5 w-3.5 fill-primary" /> {tour.rating}</span>
                    </td>
                  ))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.category")}</td>
                  {selected.map((tour) => (
                    <td key={tour.id} className="py-4 text-center"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{tour.category}</span></td>
                  ))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.groupSize")}</td>
                  {selected.map((tour) => (<td key={tour.id} className="py-4 text-center text-foreground">{tour.groupSize}</td>))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{t("compare.destination")}</td>
                  {selected.map((tour) => (<td key={tour.id} className="py-4 text-center text-foreground">{tour.destination}</td>))}
                  {selected.length < 5 && <td />}
                </tr>
                <tr>
                  <td className="py-4 text-muted-foreground">{t("compare.nextAvailable")}</td>
                  {selected.map((tour) => {
                    const next = tour.availability.find((a) => a.spotsLeft > 0);
                    return (
                      <td key={tour.id} className="py-4 text-center">
                        {next ? (
                          <div>
                            <span className="text-foreground">{new Date(next.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                            <p className={`text-[10px] ${next.spotsLeft <= 3 ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                              {next.spotsLeft <= 3 ? t("compare.onlySpotsLeft", { count: next.spotsLeft }) : t("compare.spotsAvailable", { count: next.spotsLeft })}
                            </p>
                          </div>
                        ) : (<span className="text-destructive text-xs">{t("compare.soldOut")}</span>)}
                      </td>
                    );
                  })}
                  {selected.length < 5 && <td />}
                </tr>
                <tr>
                  <td className="pt-4" />
                  {selected.map((tour) => (
                    <td key={tour.id} className="pt-4 text-center">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-accent/90">{t("compare.bookNow")}</Button>
                    </td>
                  ))}
                  {selected.length < 5 && <td />}
                </tr>
              </tbody>
            </table>
          </div>

          <AnimatePresence>
            {adding && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-card mt-3 max-h-64 overflow-y-auto rounded-xl p-4">
                <p className="mb-3 font-body text-xs text-muted-foreground">{t("compare.selectTour")}</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {available.map((tour) => (
                    <button key={tour.id} onClick={() => addTour(tour.id)} className="flex items-center justify-between rounded-lg bg-secondary p-3 text-left transition-colors hover:bg-secondary/80">
                      <div>
                        <span className="font-display text-sm font-semibold text-foreground">{tour.name}</span>
                        <p className="text-xs text-muted-foreground">{tour.destination}</p>
                      </div>
                      <span className="font-display text-sm font-bold text-primary">${getPriceForGroup(tour.pricing, travelers).toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TourComparison;
