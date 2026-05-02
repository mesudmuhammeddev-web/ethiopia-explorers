import { motion } from "framer-motion";

const team = [
  {
    name: "Mesud",
    role: "Founder & Travel Designer",
    bio: "Born in Ethiopia, passionate about showing travelers the real hidden beauty of my country.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Selamawit",
    role: "Operations Manager",
    bio: "Keeps every tour running smoothly — from logistics to last-minute requests.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Daniel",
    role: "Lead Tour Guide — Historic North",
    bio: "Certified guide with 12 years experience in Lalibela, Gondar, and Axum.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
  },
  {
    name: "Hanna",
    role: "Customer Support Lead",
    bio: "Your friendly first contact — answering on WhatsApp, day or night.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];

const MeetTheTeam = () => {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Meet Our Team</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Real People Behind Your Journey
          </h2>
          <p className="mt-4 font-body text-muted-foreground md:text-lg">
            A small, dedicated Ethiopian team designing and guiding every tour personally.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.image} alt={`${m.name}, ${m.role}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3>
                <p className="text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 font-body text-sm text-muted-foreground">"{m.bio}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
