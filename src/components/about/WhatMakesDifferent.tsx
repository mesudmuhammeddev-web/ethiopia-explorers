import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "We design every itinerary in-house",
  "We operate every tour ourselves",
  "We guide you with certified local experts",
  "We support you 24/7 during your travel",
];

const WhatMakesDifferent = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">What Makes Us Different</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Not a Marketplace — A Travel Operator
          </h2>
          <p className="mt-4 font-body text-muted-foreground md:text-lg">
            We don't just list tours. We build, run, and stand behind every single one.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-body text-sm text-foreground">{p}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 font-body text-sm text-muted-foreground md:text-base">
            This means better quality control, safer trips, and more consistent experiences for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
