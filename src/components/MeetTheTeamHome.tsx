import { motion } from "framer-motion";

const team = [
  {
    name: "Mesud",
    role: "Founder & Lead Trip Planner",
    quote:
      "Born in Ethiopia, passionate about showing travelers the real, hidden beauty of my country.",
    photo: "https://i.pravatar.cc/200?img=58",
  },
  {
    name: "Dawit",
    role: "Senior Local Guide",
    quote: "10+ years guiding the Northern Circuit and Lalibela. History is my favorite story.",
    photo: "https://i.pravatar.cc/200?img=15",
  },
  {
    name: "Yonas",
    role: "Lead Driver — 4x4 Specialist",
    quote: "From Simien to Danakil — your safety on the road is my responsibility.",
    photo: "https://i.pravatar.cc/200?img=11",
  },
  {
    name: "Hanna",
    role: "Travel Support — WhatsApp Concierge",
    quote: "I'm the one replying when you message us. Day or night, I've got you covered.",
    photo: "https://i.pravatar.cc/200?img=44",
  },
];

const MeetTheTeamHome = () => {
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
            Real People, Real Local Experts
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-foreground">
            Meet Your <span className="text-primary italic">Local Team</span>
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            When you book with us, you're booking with these people — born and based in Ethiopia,
            handling every detail of your journey personally.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <img
                src={m.photo}
                alt={m.name}
                loading="lazy"
                className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-primary/15"
              />
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{m.name}</h3>
              <p className="mt-1 font-body text-xs text-primary font-medium">{m.role}</p>
              <p className="mt-3 font-body text-sm italic text-muted-foreground leading-relaxed">
                "{m.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamHome;
