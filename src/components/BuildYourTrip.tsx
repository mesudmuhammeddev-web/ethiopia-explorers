import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, DollarSign, CalendarDays, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const destinations = [
  "Addis Ababa", "Bahir Dar", "Gondar", "Lalibela", "Axum",
  "Harar", "Hawassa", "Jimma", "Dire Dawa", "Mekelle",
  "Arba Minch", "Jinka", "Turmi", "Semera", "Bale",
  "Simien Mountains", "Danakil Depression", "Lake Tana",
  "Omo Valley", "Wonchi", "Langano", "Sof Omar",
];

const travelTypes = [
  { label: "Adventure", icon: "🏔️" },
  { label: "Family", icon: "👨‍👩‍👧‍👦" },
  { label: "Luxury", icon: "✨" },
  { label: "Honeymoon", icon: "💑" },
];

const budgetRanges = [
  "$500 – $1,000",
  "$1,000 – $2,000",
  "$2,000+",
];

const steps = [
  { title: "Destination", icon: MapPin },
  { title: "Travel Type", icon: Compass },
  { title: "Budget", icon: DollarSign },
  { title: "Travel Date", icon: CalendarDays },
];

const BuildYourTrip = () => {
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
    const message = `Hi! I'd like to plan a trip 🧭\n\n📍 Destination: ${destination}\n🏷️ Travel Type: ${travelType}\n💰 Budget: ${budget}\n📅 Date: ${dateStr}\n\nPlease help me build my trip plan!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/251998900160?text=${encoded}`, "_blank");
  };

  return (
    <section id="build-trip" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Plan in 30 seconds</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2" style={{ fontFamily: "var(--font-display)" }}>
            🧭 Build Your Trip
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Tell us what you want — we'll craft the perfect Ethiopian adventure for you.
          </p>
        </motion.div>

        {/* Progress Steps */}
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

        {/* Step Content */}
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
              {/* Step 1: Destination */}
              {step === 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">📍 Select Destination</h3>
                  <p className="text-muted-foreground text-sm mb-5">Where in Ethiopia do you want to explore?</p>
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

              {/* Step 2: Travel Type */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">🏷️ Select Travel Type</h3>
                  <p className="text-muted-foreground text-sm mb-5">What kind of experience are you looking for?</p>
                  <div className="grid grid-cols-2 gap-4">
                    {travelTypes.map((t) => (
                      <button
                        key={t.label}
                        onClick={() => setTravelType(t.label)}
                        className={cn(
                          "p-6 rounded-xl text-center transition-all border",
                          travelType === t.label
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                            : "bg-secondary/50 border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-3xl block mb-2">{t.icon}</span>
                        <span className="text-foreground font-semibold">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">💰 Select Budget</h3>
                  <p className="text-muted-foreground text-sm mb-5">What's your budget range per person?</p>
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

              {/* Step 4: Date */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">📅 Select Travel Date</h3>
                  <p className="text-muted-foreground text-sm mb-5">When do you want to travel?</p>
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
                      Selected: {format(date, "PPP")}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleGetTripPlan}
                disabled={!canProceed()}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white px-6"
              >
                <Send className="w-4 h-4" /> Get My Trip Plan
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildYourTrip;
