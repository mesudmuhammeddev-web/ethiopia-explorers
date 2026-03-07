import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lakeTana from "@/assets/lake-tana.jpg";
import heroFalls from "@/assets/hero-falls.jpg";
import monastery from "@/assets/monastery.jpg";
import sunsetCruise from "@/assets/sunset-cruise.jpg";
import simienMountains from "@/assets/simien-mountains.jpg";
import danakil from "@/assets/danakil.jpg";
import harar from "@/assets/harar.jpg";
import omoValley from "@/assets/omo-valley.jpg";

const experiences = [
  {
    title: "Boat Trip on Lake Tana",
    description: "Cruise across Ethiopia's largest lake, visiting ancient island monasteries hidden among papyrus-lined shores.",
    price: "$42.50",
    priceNote: "per person",
    duration: "5 hours",
    image: lakeTana,
  },
  {
    title: "Blue Nile Falls Hiking",
    description: "Trek through lush landscapes to witness the thundering 'Smoke of Fire' — one of Africa's most spectacular waterfalls.",
    price: "$37.00",
    priceNote: "per person",
    duration: "4 hours",
    image: heroFalls,
  },
  {
    title: "Monastery Cultural Tour",
    description: "Step inside centuries-old monasteries adorned with vivid murals depicting Ethiopian Orthodox heritage.",
    price: "$48.75",
    priceNote: "per person",
    duration: "6 hours",
    image: monastery,
  },
  {
    title: "Sunset Lake Cruise",
    description: "Drift across golden waters as the sun sets behind the Ethiopian highlands — pure serenity.",
    price: "$29.99",
    priceNote: "per person",
    duration: "3 hours",
    image: sunsetCruise,
  },
  {
    title: "Simien Mountains Day Hike",
    description: "Hike dramatic cliff edges among Gelada baboons with panoramic views above the clouds.",
    price: "$75.00",
    priceNote: "per person",
    duration: "10 hours",
    image: simienMountains,
  },
  {
    title: "Danakil Depression Expedition",
    description: "Journey to Earth's hottest inhabited place — sulfur springs, salt flats & Erta Ale lava lake.",
    price: "$395.00",
    priceNote: "per person • 3 days",
    duration: "3 days",
    image: danakil,
  },
  {
    title: "Hyena Man Night Experience",
    description: "Watch Harar's legendary hyena men hand-feed wild hyenas at dusk — a jaw-dropping spectacle.",
    price: "$25.00",
    priceNote: "per person",
    duration: "2 hours",
    image: harar,
  },
  {
    title: "Omo Valley Tribal Encounter",
    description: "Meet indigenous tribes preserving ancient traditions, body art & ceremonial rituals.",
    price: "$320.00",
    priceNote: "per person • 3 days",
    duration: "3 days",
    image: omoValley,
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group hover-lift relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {exp.duration}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground">{exp.title}</h3>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {exp.description}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-primary">{exp.price}</span>
                    <p className="font-body text-[10px] text-muted-foreground">{exp.priceNote}</p>
                  </div>
                  <Button
                    size="sm"
                    className="gap-1 bg-primary text-primary-foreground hover:bg-gold-dark"
                  >
                    Book
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
