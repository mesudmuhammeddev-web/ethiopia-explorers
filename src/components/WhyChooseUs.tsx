import { motion } from "framer-motion";
import { Shield, Users, Clock, Compass, HeartHandshake, Car } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    { icon: Users, title: t("whyUs.guidesTitle"), description: t("whyUs.guidesText") },
    { icon: Compass, title: t("whyUs.customTitle"), description: t("whyUs.customText") },
    { icon: Shield, title: t("whyUs.safetyTitle"), description: t("whyUs.safetyText") },
    { icon: Clock, title: t("whyUs.supportTitle"), description: t("whyUs.supportText") },
    { icon: Car, title: t("whyUs.transportTitle"), description: t("whyUs.transportText") },
    { icon: HeartHandshake, title: t("whyUs.responsibleTitle"), description: t("whyUs.responsibleText") },
  ];

  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("whyUs.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("whyUs.title")} <span className="text-gradient-gold italic">{t("whyUs.titleHighlight")}</span> {t("whyUs.titleEnd")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">{t("whyUs.description")}</p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card hover-lift group rounded-2xl p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{reason.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
