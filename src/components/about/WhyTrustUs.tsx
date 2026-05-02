import { motion } from "framer-motion";
import { MapPin, DollarSign, CheckCircle, Clock, Sparkles } from "lucide-react";

const items = [
  { icon: MapPin, title: "Local Expertise", desc: "Real Ethiopian team — not outsourced agencies." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "What you see is what you pay. No hidden fees." },
  { icon: CheckCircle, title: "Hand-Checked Tours", desc: "Every itinerary is personally tested by our team." },
  { icon: Clock, title: "Real-Time Support", desc: "WhatsApp response within 1 hour, 24/7." },
  { icon: Sparkles, title: "Flexible Custom Trips", desc: "Built around your dates, pace, and interests." },
];

const WhyTrustUs = () => {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Why Travelers Trust Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            A Different Level of Travel Company
          </h2>
          <p className="mt-4 font-body text-muted-foreground md:text-lg">
            Unlike generic booking platforms, we are based inside Ethiopia and operate every tour ourselves.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
