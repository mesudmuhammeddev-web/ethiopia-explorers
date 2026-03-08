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
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 -right-20 h-80 w-80 rounded-full bg-accent blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6">
        {/* Main About Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl group">
              <motion.img
                src={monastery}
                alt="Ancient Ethiopian monastery on Lake Tana"
                className="h-full w-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-6 md:right-[-2rem]"
            >
              <motion.div
                className="font-display text-3xl font-bold text-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                3000+
              </motion.div>
              <div className="font-body text-xs tracking-wider text-muted-foreground uppercase">{t("about.yearsHistory")}</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block font-body text-sm tracking-widest text-primary uppercase"
            >
              {t("about.badge")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl"
            >
              {t("about.title")} <span className="text-gradient-gold italic">{t("about.titleHighlight")}</span> {t("about.titleEnd")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-body text-muted-foreground leading-relaxed"
            >
              {t("about.description")}
            </motion.p>

            <div className="mt-10 space-y-8">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 80 }}
                  whileHover={{ x: 8, transition: { type: "spring", stiffness: 300 } }}
                  className="flex gap-4 group cursor-default"
                >
                  <motion.div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg"
                    style={{ boxShadow: "none" }}
                    whileHover={{ boxShadow: "0 8px 25px -4px hsl(var(--primary) / 0.4)" }}
                  >
                    <fact.icon className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{fact.title}</h3>
                    <p className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">{fact.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Counters / Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: Users, target: 500, suffix: "+", label: t("about.counterTravelers") },
            { icon: MapPin, target: 50, suffix: "+", label: t("about.counterTours") },
            { icon: Award, target: 8, suffix: "", label: t("about.counterAwards") },
            { icon: Globe, target: 15, suffix: "+", label: t("about.counterDestinations") },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="glass-card rounded-2xl p-8 text-center group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative z-10">
                <motion.div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <item.icon className="h-6 w-6" />
                </motion.div>
                <AnimatedCounter target={item.target} suffix={item.suffix} />
                <div className="mt-2 font-body text-sm text-muted-foreground">{item.label}</div>
              </div>
              {/* Decorative bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Agency Timeline */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -mx-6 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
            <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-accent/5 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <span className="font-body text-sm tracking-widest text-primary uppercase">{t("about.timelineBadge")}</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{t("about.timelineTitle")}</h2>
            </div>
            <div className="relative mx-auto max-w-4xl">
              {/* Animated timeline spine */}
              <div className="absolute left-4 top-0 bottom-0 md:left-1/2 md:-translate-x-px w-0.5 overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary/0 via-primary to-primary/0"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                {/* Traveling light pulse */}
                <motion.div
                  className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-primary/80 to-transparent"
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
              </div>

              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 80, damping: 16 }}
                  className={`relative mb-16 flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}
                >
                  {/* Desktop card */}
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <motion.div
                      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
                      className="group glass-card inline-block overflow-hidden rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500"
                    >
                      {/* Hover glow */}
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                      <div className="relative">
                        <div className="aspect-[16/10] w-64 overflow-hidden">
                          <img src={m.image} alt={m.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                          {/* Image overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-4">
                          <span className="font-display text-xl font-bold text-primary">{m.year}</span>
                          <p className="mt-1 font-body text-sm text-foreground">{m.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node with animated rings */}
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      {/* Pulsing outer ring */}
                      <motion.div
                        className="absolute -inset-3 rounded-full border border-primary/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <motion.div
                        className="absolute -inset-1.5 rounded-full border border-primary/20"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 + 0.3 }}
                      />
                      <div className="h-5 w-5 rounded-full bg-primary shadow-lg" style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }} />
                    </motion.div>
                  </div>

                  {/* Horizontal connector line (desktop) */}
                  <motion.div
                    className={`hidden md:block absolute top-1/2 h-px ${i % 2 === 0 ? "right-1/2 mr-3 left-[calc(50%-120px)]" : "left-1/2 ml-3 right-[calc(50%-120px)]"}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                    style={{ 
                      transformOrigin: i % 2 === 0 ? "right" : "left",
                      background: "linear-gradient(90deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.05))" 
                    }}
                  />

                  {/* Mobile card */}
                  <div className="flex-1 md:hidden">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card overflow-hidden rounded-2xl border border-border/50"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={m.image} alt={m.title} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <span className="font-display text-lg font-bold text-primary">{m.year}</span>
                        <p className="mt-1 font-body text-sm text-foreground">{m.title}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}

              {/* End node */}
              <motion.div
                className="absolute bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 -translate-y-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <div className="h-3 w-3 rounded-full bg-accent" style={{ boxShadow: "0 0 15px hsl(var(--accent) / 0.5)" }} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -mx-6 -my-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-card/80 to-secondary/50" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-[80px]" />
            </div>
            {/* Animated grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
              <defs>
                <pattern id="team-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="hsl(var(--primary))" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#team-grid)" />
            </svg>
          </div>

          <div className="relative z-10 py-12">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-sm tracking-widest text-primary uppercase"
              >
                {t("about.teamBadge")}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
              >
                {t("about.teamTitle")} <span className="text-gradient-gold italic">{t("about.teamHighlight")}</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-muted-foreground text-sm max-w-md mx-auto"
              >
                The passionate people behind every unforgettable Ethiopian journey
              </motion.p>
            </div>

            {/* Team grid with connecting lines */}
            <div className="relative max-w-5xl mx-auto">
              {/* SVG connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-grad-v" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Horizontal connecting line */}
                <motion.line
                  x1="10%" y1="40%" x2="90%" y2="40%"
                  stroke="url(#line-grad)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Animated pulse dots along the line */}
                {[0, 1, 2, 3].map((idx) => (
                  <motion.circle
                    key={idx}
                    r="2.5"
                    fill="hsl(var(--primary))"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.8, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: idx * 0.4, repeat: Infinity, repeatDelay: 1 }}
                    cx={`${20 + idx * 20}%`}
                    cy="40%"
                  />
                ))}
              </svg>

              <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: "spring", stiffness: 100, damping: 15 }}
                    whileHover={{ y: -12, transition: { type: "spring", stiffness: 300 } }}
                    className="group relative"
                  >
                    {/* Glow effect behind card */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

                    <div className="relative glass-card rounded-2xl p-6 text-center border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                      {/* Avatar with animated ring */}
                      <div className="relative mx-auto mb-4 sm:mb-5 h-20 w-20 sm:h-28 sm:w-28">
                        {/* Spinning ring */}
                        <motion.div
                          className="absolute -inset-1 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent, hsl(var(--accent)), transparent)",
                            opacity: 0.3,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 rounded-full bg-card" />
                        <div className="absolute inset-1 overflow-hidden rounded-full ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-500">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        {/* Status dot */}
                        <motion.div
                          className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-card"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                      <p className="mt-1 font-body text-xs text-muted-foreground">{t(member.role)}</p>

                      {/* Decorative bottom line */}
                      <motion.div
                        className="mt-4 mx-auto h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutEthiopia;
