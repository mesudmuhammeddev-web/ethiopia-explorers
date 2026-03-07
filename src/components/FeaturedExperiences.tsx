import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lakeTana from "@/assets/lake-tana.jpg";
import heroFalls from "@/assets/hero-falls.jpg";
import monastery from "@/assets/monastery.jpg";
import sunsetCruise from "@/assets/sunset-cruise.jpg";

const experiences = [
  {
    title: "Boat Trip on Lake Tana",
    description: "Cruise across Ethiopia's largest lake, visiting ancient island monasteries hidden among papyrus-lined shores.",
    price: "$40",
    duration: "5 hours",
    image: lakeTana,
  },
  {
    title: "Blue Nile Falls Hiking",
    description: "Trek through lush landscapes to witness the thundering 'Smoke of Fire' — one of Africa's most spectacular waterfalls.",
    price: "$35",
    duration: "4 hours",
    image: heroFalls,
  },
  {
    title: "Monastery Cultural Tour",
    description: "Step inside centuries-old monasteries adorned with vivid murals depicting Ethiopian Orthodox heritage.",
    price: "$45",
    duration: "6 hours",
    image: monastery,
  },
  {
    title: "Sunset Lake Cruise",
    description: "Drift across golden waters as the sun sets behind the Ethiopian highlands — pure serenity.",
    price: "$30",
    duration: "3 hours",
    image: sunsetCruise,
  },
];

const FeaturedExperiences = () => {
  return (
    <section id="experiences" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">Curated For You</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Featured <span className="text-gradient-gold italic">Experiences</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group hover-lift relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                    {exp.duration}
                  </span>
                  <span className="font-display text-lg font-bold text-primary">{exp.price}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{exp.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <Button
                  size="sm"
                  className="mt-4 gap-2 bg-primary text-primary-foreground hover:bg-gold-dark"
                >
                  Book Experience
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
