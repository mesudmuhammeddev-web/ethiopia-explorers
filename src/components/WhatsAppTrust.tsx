import { motion } from "framer-motion";
import { MessageCircle, Clock, UserCheck, BadgePercent } from "lucide-react";

const points = [
  { icon: Clock, label: "Instant replies — usually under 1 hour" },
  { icon: UserCheck, label: "Talk directly to a real local expert" },
  { icon: BadgePercent, label: "No booking fees — transparent pricing" },
];

const WhatsAppTrust = () => {
  return (
    <section className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-md"
        >
          <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
            <div className="flex justify-center md:justify-start">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#25D366] text-white shadow-lg">
                <MessageCircle className="h-10 w-10" strokeWidth={2.2} />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Plan Your Trip <span className="text-primary italic">on WhatsApp</span>
              </h2>
              <p className="mt-3 font-body text-sm sm:text-base text-muted-foreground">
                The fastest, most personal way to plan your Ethiopia trip. No forms, no waiting,
                no pressure — just a real conversation with a local expert.
              </p>

              <ul className="mt-5 space-y-2.5">
                {points.map((p) => (
                  <li key={p.label} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <p.icon className="h-4 w-4" />
                    </div>
                    <span className="font-body text-sm sm:text-base text-foreground">{p.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/251998900160?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-accent-foreground shadow-md hover:bg-accent/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppTrust;
