import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, DollarSign, CalendarDays, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const destinations = [
  "Addis Ababa", "Bahir Dar", "Gondar", "Lalibela", "Axum",
  "Harar", "Hawassa", "Jimma", "Dire Dawa", "Mekelle",
  "Arba Minch", "Jinka", "Turmi", "Semera", "Bale",
  "Simien Mountains", "Danakil Depression", "Lake Tana",
  "Omo Valley", "Wonchi", "Langano", "Sof Omar",
];

const budgetRanges = [
  "$500 – $1,000",
  "$1,000 – $2,000",
  "$2,000+",
];

const steps = [
  { titleKey: "selectDestination", icon: MapPin },
  { titleKey: "selectTravelType", icon: Compass },
  { titleKey: "selectBudget", icon: DollarSign },
  { titleKey: "selectDate", icon: CalendarDays },
];

const travelTypeKeys = [
  { key: "adventure", icon: "🏔️" },
  { key: "family", icon: "👨‍👩‍👧‍👦" },
  { key: "luxury", icon: "✨" },
  { key: "honeymoon", icon: "💑" },
];

const BuildYourTrip = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState<Date>();

  const canProceed = () => {
    if (step === 0) return !!destination;
    if (step === 1) return !!travelType;
    if (step === 2) return !!budget;
    if (step === 3) return !!date;
    return false;
  };

  const handleGetTripPlan = () => {
    const dateStr = date ? format(date, "PPP") : "";
    const travelLabel = t(`buildTrip.${travelType}`);
    const message = `Hi! I'd like to plan a trip 🧭\n\n📍 Destination: ${destination}\n🏷️ Travel Type: ${travelLabel}\n💰 Budget: ${budget}\n📅 Date: ${dateStr}\n\nPlease help me build my trip plan!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/251998900160?text=${encoded}`, "_blank");
  };

  return (
    <section id="build-trip" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">{t("buildTrip.badge")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2" style={{ fontFamily: "var(--font-display)" }}>
            {t("buildTrip.title")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            {t("buildTrip.subtitle")}
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                  i === step
                    ? "bg-primary text-primary-foreground border-primary scale-110"
                    : i < step
                    ? "bg-primary/20 text-primary border-primary/40 cursor-pointer hover:bg-primary/30"
                    : "bg-muted text-muted-foreground border-border"
                )}
              >
                <s.icon className="w-4 h-4" />
              </button>
              {i < steps.length - 1 && (
                <div className={cn("w-8 md:w-12 h-0.5 rounded-full transition-colors", i < step ? "bg-primary/50" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="bg-card border border-border rounded-2xl p-6 md:p-10 min-h-[320px] flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {step === 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{t("buildTrip.selectDestination")}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{t("buildTrip.destinationDesc")}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {destinations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDestination(d)}
                        className={cn(
                          "px-3 py-2.5 rounded-xl text-sm font-medium transition-all border",
                          destination === d
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                            : "bg-secondary/50 text-foreground border-border hover:border-primary/50 hover:bg-secondary"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{t("buildTrip.selectTravelType")}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{t("buildTrip.travelTypeDesc")}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {travelTypeKeys.map((tt) => (
                      <button
                        key={tt.key}
                        onClick={() => setTravelType(tt.key)}
                        className={cn(
                          "p-6 rounded-xl text-center transition-all border",
                          travelType === tt.key
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-secondary/50 border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-3xl block mb-2">{tt.icon}</span>
                        <span className="text-foreground font-semibold">{t(`buildTrip.${tt.key}`)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{t("buildTrip.selectBudget")}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{t("buildTrip.budgetDesc")}</p>
                  <div className="grid gap-4">
                    {budgetRanges.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={cn(
                          "p-5 rounded-xl text-left transition-all border flex items-center gap-4",
                          budget === b
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-secondary/50 border-border hover:border-primary/50"
                        )}
                      >
                        <DollarSign className={cn("w-5 h-5", budget === b ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-foreground font-semibold text-lg">{b}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{t("buildTrip.selectDate")}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{t("buildTrip.dateDesc")}</p>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      className="rounded-xl border border-border bg-secondary/30 pointer-events-auto"
                    />
                  </div>
                  {date && (
                    <p className="text-center text-primary font-medium mt-3">
                      {t("buildTrip.selected")} {format(date, "PPP")}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> {t("buildTrip.back")}
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t("buildTrip.next")} <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleGetTripPlan}
                disabled={!canProceed()}
                className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6"
              >
                <Send className="w-4 h-4" /> {t("buildTrip.getMyTripPlan")}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildYourTrip;
