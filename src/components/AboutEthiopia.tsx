import { motion } from "framer-motion";
import { Globe, Calendar, Mountain } from "lucide-react";
import monastery from "@/assets/monastery.jpg";

const facts = [
  {
    icon: Globe,
    title: "Cradle of Humanity",
    text: "Home to Lucy, the 3.2-million-year-old fossil, and the ancient Aksumite Empire that traded with Rome and India. Lalibela's 12th-century rock-hewn churches are still used for worship today.",
  },
  {
    icon: Calendar,
    title: "13 Months of Sunshine",
    text: "Ethiopia follows its own calendar — 13 months, roughly 7 years behind the Gregorian calendar. Time itself runs differently here: sunrise is 12 o'clock. A journey through a parallel rhythm of life.",
  },
  {
    icon: Mountain,
    title: "Breathtaking Diversity",
    text: "From the jagged peaks of the Simien Mountains to the alien landscapes of the Danakil Depression — one of Earth's hottest places — Ethiopia offers unmatched natural wonders for every explorer.",
  },
];

const AboutEthiopia = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={monastery}
                alt="Ancient Ethiopian monastery on Lake Tana"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-6 md:right-[-2rem]">
              <div className="font-display text-3xl font-bold text-primary">3000+</div>
              <div className="font-body text-xs tracking-wider text-muted-foreground uppercase">Years of History</div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-sm tracking-widest text-primary uppercase">
              About Ethiopia
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
              A Land Unlike <span className="text-gradient-gold italic">Anywhere</span> Else
            </h2>
            <p className="mt-4 font-body text-muted-foreground leading-relaxed">
              A country endowed with fabulous wildlife, epic natural beauty, mind-blowing outdoor
              experiences, and Africa's most fascinating history. Ethiopia remains truly original —
              a land whose beauty knows no bounds.
            </p>

            <div className="mt-10 space-y-8">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <fact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{fact.title}</h3>
                    <p className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">
                      {fact.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutEthiopia;
