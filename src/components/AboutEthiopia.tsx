import { motion, useInView } from "framer-motion";
import { Globe, Calendar, Mountain, Award, Users, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import monastery from "@/assets/monastery.jpg";
import milestone2018 from "@/assets/milestone-2018.jpg";
import milestone2019 from "@/assets/milestone-2019.jpg";
import milestone2021 from "@/assets/milestone-2021.jpg";
import milestone2023 from "@/assets/milestone-2023.jpg";
import milestone2025 from "@/assets/milestone-2025.jpg";
import teamAbebe from "@/assets/team-abebe.jpg";
import teamSara from "@/assets/team-sara.jpg";
import teamDaniel from "@/assets/team-daniel.jpg";
import teamMeron from "@/assets/team-meron.jpg";
import teamYonas from "@/assets/team-yonas.jpg";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <div ref={ref} className="font-display text-4xl font-bold text-primary md:text-5xl">{count.toLocaleString()}{suffix}</div>;
};

const teamMembers = [
  { name: "Abebe Kebede", role: "about.teamFounder", image: teamAbebe },
  { name: "Sara Mulugeta", role: "about.teamOperations", image: teamSara },
  { name: "Daniel Hailu", role: "about.teamGuide", image: teamDaniel },
  { name: "Meron Tadesse", role: "about.teamMarketing", image: teamMeron },
  { name: "Yonas Girma", role: "about.teamLogistics", image: teamYonas },
];

const AboutEthiopia = () => {
  const { t } = useTranslation();

  const facts = [
    { icon: Globe, title: t("about.cradleTitle"), text: t("about.cradleText") },
    { icon: Calendar, title: t("about.calendarTitle"), text: t("about.calendarText") },
    { icon: Mountain, title: t("about.diversityTitle"), text: t("about.diversityText") },
  ];

  const milestones = [
    { year: "2018", title: t("about.milestone1"), image: milestone2018 },
    { year: "2019", title: t("about.milestone2"), image: milestone2019 },
    { year: "2021", title: t("about.milestone3"), image: milestone2021 },
    { year: "2023", title: t("about.milestone4"), image: milestone2023 },
    { year: "2025", title: t("about.milestone5"), image: milestone2025 },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Main About Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <img src={monastery} alt="Ancient Ethiopian monastery on Lake Tana" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-6 md:right-[-2rem]">
              <div className="font-display text-3xl font-bold text-primary">3000+</div>
              <div className="font-body text-xs tracking-wider text-muted-foreground uppercase">{t("about.yearsHistory")}</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="font-body text-sm tracking-widest text-primary uppercase">{t("about.badge")}</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
              {t("about.title")} <span className="text-gradient-gold italic">{t("about.titleHighlight")}</span> {t("about.titleEnd")}
            </h2>
            <p className="mt-4 font-body text-muted-foreground leading-relaxed">{t("about.description")}</p>

            <div className="mt-10 space-y-8">
              {facts.map((fact, i) => (
                <motion.div key={fact.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <fact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{fact.title}</h3>
                    <p className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">{fact.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Counters / Achievements */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, target: 500, suffix: "+", label: t("about.counterTravelers") },
            { icon: MapPin, target: 50, suffix: "+", label: t("about.counterTours") },
            { icon: Award, target: 8, suffix: "", label: t("about.counterAwards") },
            { icon: Globe, target: 15, suffix: "+", label: t("about.counterDestinations") },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <AnimatedCounter target={item.target} suffix={item.suffix} />
              <div className="mt-2 font-body text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agency Timeline */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24">
          <div className="text-center mb-12">
            <span className="font-body text-sm tracking-widest text-primary uppercase">{t("about.timelineBadge")}</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{t("about.timelineTitle")}</h2>
          </div>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative mb-12 flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}
              >
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="glass-card inline-block overflow-hidden rounded-2xl">
                    <div className="aspect-[16/10] w-64 overflow-hidden">
                      <img src={m.image} alt={m.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="font-display text-xl font-bold text-primary">{m.year}</span>
                      <p className="mt-1 font-body text-sm text-foreground">{m.title}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-lg" style={{ boxShadow: "var(--shadow-gold)" }} />
                <div className="flex-1 md:hidden">
                  <div className="glass-card overflow-hidden rounded-2xl">
                    <div className="aspect-video w-full overflow-hidden">
                      <img src={m.image} alt={m.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="font-display text-lg font-bold text-primary">{m.year}</span>
                      <p className="mt-1 font-body text-sm text-foreground">{m.title}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24">
          <div className="text-center mb-12">
            <span className="font-body text-sm tracking-widest text-primary uppercase">{t("about.teamBadge")}</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              {t("about.teamTitle")} <span className="text-gradient-gold italic">{t("about.teamHighlight")}</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card hover-lift group rounded-2xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {member.avatar}
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground">{t(member.role)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutEthiopia;
