import { motion } from "framer-motion";
import lakeTana from "@/assets/lake-tana.jpg";
import heroFalls from "@/assets/hero-falls.jpg";
import gondar from "@/assets/gondar.jpg";
import lalibela from "@/assets/lalibela.jpg";
import simienMountains from "@/assets/simien-mountains.jpg";
import danakil from "@/assets/danakil.jpg";
import axum from "@/assets/axum.jpg";
import harar from "@/assets/harar.jpg";
import omoValley from "@/assets/omo-valley.jpg";
import baleMountains from "@/assets/bale-mountains.jpg";

const destinations = [
  { name: "Lake Tana", description: "Ethiopia's largest lake, home to ancient island monasteries", tours: 8, image: lakeTana },
  { name: "Blue Nile Falls", description: "The 'Smoke of Fire' — Africa's most stunning waterfall", tours: 5, image: heroFalls },
  { name: "Gondar", description: "The 'Camelot of Africa' with medieval royal castles", tours: 6, image: gondar },
  { name: "Lalibela", description: "UNESCO World Heritage rock-hewn churches carved from stone", tours: 7, image: lalibela },
  { name: "Simien Mountains", description: "Dramatic peaks, Gelada baboons & Africa's 4th highest summit", tours: 9, image: simienMountains },
  { name: "Danakil Depression", description: "Earth's hottest place with alien sulfur springs & lava lakes", tours: 4, image: danakil },
  { name: "Axum", description: "Ancient obelisks & the legendary home of the Ark of the Covenant", tours: 5, image: axum },
  { name: "Harar", description: "Africa's 4th holiest Islamic city with 82 mosques & hyena men", tours: 6, image: harar },
  { name: "Omo Valley", description: "Meet indigenous tribes with ancient traditions & body art", tours: 7, image: omoValley },
  { name: "Bale Mountains", description: "Home to the endangered Ethiopian wolf & afro-alpine wilderness", tours: 5, image: baleMountains },
];

const Destinations = () => {
  return (
    <section id="destinations" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">Where To Go</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Iconic <span className="text-gradient-gold italic">Destinations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">
            From ancient churches to alien landscapes — explore 10 unforgettable Ethiopian destinations
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group hover-lift cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                    {dest.tours} tours
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground">{dest.name}</h3>
                  <p className="mt-1 font-body text-xs text-muted-foreground line-clamp-2">{dest.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
