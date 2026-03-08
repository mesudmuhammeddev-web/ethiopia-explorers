import { motion } from "framer-motion";
import { Shield, Users, Clock, Compass, HeartHandshake, Car, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const reasons = [
    { icon: Users, title: t("whyUs.guidesTitle"), description: t("whyUs.guidesText"), color: "42 85% 58%" },
    { icon: Compass, title: t("whyUs.customTitle"), description: t("whyUs.customText"), color: "18 75% 55%" },
    { icon: Shield, title: t("whyUs.safetyTitle"), description: t("whyUs.safetyText"), color: "160 70% 45%" },
    { icon: Clock, title: t("whyUs.supportTitle"), description: t("whyUs.supportText"), color: "210 75% 55%" },
    { icon: Car, title: t("whyUs.transportTitle"), description: t("whyUs.transportText"), color: "280 60% 55%" },
    { icon: HeartHandshake, title: t("whyUs.responsibleTitle"), description: t("whyUs.responsibleText"), color: "340 65% 55%" },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-secondary/30" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full opacity-[0.03]"
        style={{ border: "2px dashed hsl(var(--primary))" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -left-[10%] h-[400px] w-[400px] rounded-full opacity-[0.03]"
        style={{ border: "2px dashed hsl(var(--primary))" }}
      />

      <div className="container relative mx-auto px-6">
        {/* Header with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("whyUs.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("whyUs.title")}{" "}
            <motion.span
              className="text-gradient-gold italic inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {t("whyUs.titleHighlight")}
            </motion.span>{" "}
            {t("whyUs.titleEnd")}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground"
          >
            {t("whyUs.description")}
          </motion.p>
        </motion.div>

        {/* Cards grid with staggered reveal */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-2xl"
              style={{ perspective: "1000px" }}
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, hsl(${reason.color} / 0.15), transparent 70%)`,
                }}
              />

              {/* Card content */}
              <div className="glass-card relative rounded-2xl p-8 h-full border border-transparent transition-all duration-500 group-hover:border-primary/20">
                {/* Animated icon */}
                <motion.div
                  animate={hoveredIndex === i ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg"
                    style={{ boxShadow: hoveredIndex === i ? `0 8px 25px -4px hsl(${reason.color} / 0.4)` : "none" }}
                  >
                    <reason.icon className="h-6 w-6" />
                  </div>
                  {/* Pulse ring on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={hoveredIndex === i ? {
                      scale: [1, 1.6],
                      opacity: [0.4, 0],
                    } : { scale: 1, opacity: 0 }}
                    transition={{ duration: 1, repeat: hoveredIndex === i ? Infinity : 0 }}
                    style={{ border: `2px solid hsl(${reason.color})` }}
                  />
                </motion.div>

                {/* Title with underline animation */}
                <h3 className="mt-5 font-display text-lg font-bold text-foreground relative inline-block">
                  {reason.title}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: hoveredIndex === i ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                  {reason.description}
                </p>

                {/* Bottom decorative line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, hsl(${reason.color}), transparent)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: hoveredIndex === i ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {["Licensed Agency", "100% Customizable", "4.9★ Rating", "24/7 Support"].map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2 font-body text-xs font-medium text-primary"
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
