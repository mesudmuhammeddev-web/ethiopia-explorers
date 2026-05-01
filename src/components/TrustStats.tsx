import { motion } from "framer-motion";
import { Users, Map, Compass, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Travelers" },
  { icon: Compass, value: "50+", label: "Unique Tours" },
  { icon: Map, value: "15+", label: "Destinations" },
  { icon: Star, value: "4.9★", label: "Verified Rating" },
];

const TrustStats = () => {
  return (
    <section className="relative pt-24 sm:pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-2xl font-bold text-foreground leading-none">
                  {s.value}
                </div>
                <div className="mt-1 font-body text-xs text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;
