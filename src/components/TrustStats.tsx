import { motion } from "framer-motion";
import { ShieldCheck, Users, Star, MessageCircle } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Licensed Ethiopian Tour Operator" },
  { icon: Users, label: "500+ Verified Travelers" },
  { icon: Star, label: "4.9★ Average Rating" },
  { icon: MessageCircle, label: "24/7 WhatsApp Support" },
];

const TrustStats = () => {
  return (
    <section className="relative pt-20 sm:pt-24 pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm"
        >
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <p className="font-body text-xs sm:text-sm font-semibold leading-tight text-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;
