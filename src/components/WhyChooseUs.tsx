import { motion } from "framer-motion";
import { Shield, Users, Clock, Compass, HeartHandshake, Car } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Professional Local Guides",
    description:
      "Our guides are professionally trained with deep knowledge of Ethiopia's history, culture, and hidden gems. A great guide makes a great trip.",
  },
  {
    icon: Compass,
    title: "Fully Customizable Tours",
    description:
      "Every itinerary is built around your interests, pace, and budget. We don't sell packages — we craft experiences.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Whether solo or with family, your safety is our priority. Our local guides, drivers, and leaders ensure a smooth and secure journey.",
  },
  {
    icon: Clock,
    title: "24/7 Client Support",
    description:
      "From your first inquiry to your flight home, our team is available around the clock. We see every traveler as a lifelong friend.",
  },
  {
    icon: Car,
    title: "Premium Transportation",
    description:
      "Travel in comfort with well-maintained 4WDs, minibuses, and coaster buses — carefully selected for every terrain and destination.",
  },
  {
    icon: HeartHandshake,
    title: "Responsible Tourism",
    description:
      "We're committed to sustainable travel that benefits local communities, preserves cultural heritage, and protects Ethiopia's natural wonders.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">
            Why Travel With Us
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Your Trusted <span className="text-gradient-gold italic">Ethiopian</span> Partner
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">
            We are a fully licensed travel agency based in Addis Ababa with unrivalled knowledge and experience.
            We guarantee reasonable prices and lifelong memories from a team that truly cares.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card hover-lift group rounded-2xl p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
