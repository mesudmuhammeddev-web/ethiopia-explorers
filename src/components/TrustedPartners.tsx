import { motion } from "framer-motion";
import { Building2, Users, Car, Mountain, Coffee, Landmark } from "lucide-react";

const partners = [
  { icon: Building2, name: "Heritage Hotels", note: "Lalibela • Gondar • Axum" },
  { icon: Mountain, name: "Simien Park Lodges", note: "High-altitude eco lodges" },
  { icon: Car, name: "Certified Transport", note: "4x4 fleet & licensed drivers" },
  { icon: Users, name: "Local Guide Network", note: "Government-certified guides" },
  { icon: Coffee, name: "Coffee Cooperatives", note: "Sidamo • Yirgacheffe • Harar" },
  { icon: Landmark, name: "Community Tourism", note: "Omo & Harar cultural groups" },
];

const TrustedPartners = () => {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-body text-xs tracking-widest text-primary uppercase font-semibold">
            Our Network
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground">
            Trusted Local Partners <span className="text-primary italic">Across Ethiopia</span>
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            We collaborate with trusted hotels, certified guides, and local communities across Ethiopia
            to deliver safe and authentic experiences.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-foreground">{p.name}</p>
                <p className="font-body text-xs text-muted-foreground truncate">{p.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
