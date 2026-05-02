import { motion } from "framer-motion";
import { Heart, Shield, Users, Award } from "lucide-react";

const values = [
  { icon: Heart, title: "Authenticity", desc: "We don't stage experiences. We connect you to real culture, real people, real Ethiopia." },
  { icon: Shield, title: "Safety", desc: "Every route, driver, and guide is carefully selected and monitored." },
  { icon: Users, title: "Respect for Culture", desc: "We work directly with local communities and ensure responsible tourism." },
  { icon: Award, title: "Excellence", desc: "We continuously improve every tour based on traveler feedback." },
];

const OurValues = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Values</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">What We Stand For</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#0d4a8f] p-6 text-white shadow-lg"
            >
              <v.icon className="h-10 w-10 opacity-90" />
              <h3 className="mt-4 font-display text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
