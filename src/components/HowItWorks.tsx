import { motion } from "framer-motion";
import { MapPin, Calendar, MessageCircle, Plane } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Choose Destination",
    text: "Browse 15+ Ethiopian destinations from Lalibela to the Omo Valley.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Pick Your Tour",
    text: "Select from 50+ guided tours tailored to your interests and pace.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Book via WhatsApp",
    text: "Chat with our local team — instant answers, custom quotes, no hassle.",
  },
  {
    icon: Plane,
    step: "04",
    title: "Travel with a Local",
    text: "Meet your expert guide on arrival and explore Ethiopia like a local.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20 sm:py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-body text-xs sm:text-sm tracking-widest text-primary uppercase font-semibold">
            How It Works
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-foreground">
            Booking your Ethiopia trip is simple
          </h2>
          <p className="mt-3 font-body text-muted-foreground">
            Four easy steps from inspiration to the trip of a lifetime.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border shadow-sm text-primary">
                <s.icon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--accent))] font-display text-[11px] font-bold text-accent-foreground shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
