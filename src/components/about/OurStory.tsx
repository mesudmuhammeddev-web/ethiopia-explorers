import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Story</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Built in Ethiopia. Designed for Real Travel.
          </h2>
          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>Ethiopia Travel Explorer started with a simple idea: most travelers were seeing Ethiopia — but not experiencing it properly.</p>
            <p>We built this company to change that.</p>
            <p>From the rock-hewn churches of Lalibela to the surreal landscapes of the Danakil Depression, we design journeys that connect travelers to real Ethiopia — not surface-level tourism.</p>
            <p>Today, we work with certified local guides, experienced drivers, and cultural experts across the country.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80"
              alt="Lalibela rock-hewn churches in Ethiopia"
              className="h-[480px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-primary px-6 py-4 text-white shadow-xl md:block">
            <p className="font-display text-3xl font-bold">10+ Years</p>
            <p className="text-sm opacity-90">Operating in Ethiopia</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
