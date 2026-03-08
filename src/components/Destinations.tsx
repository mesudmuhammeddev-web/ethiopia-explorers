import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import sofOmar from "@/assets/sof-omar.jpg";
import tiya from "@/assets/tiya.jpg";
import ertaAle from "@/assets/erta-ale.jpg";
import wonchi from "@/assets/wonchi.jpg";
import addisAbaba from "@/assets/addis-ababa.jpg";
import langano from "@/assets/langano.jpg";
import debreDamo from "@/assets/debre-damo.jpg";
import awash from "@/assets/awash.jpg";
import negashMosque from "@/assets/negash-mosque.jpg";
import anwarMosque from "@/assets/anwar-mosque.jpg";
import hararMosques from "@/assets/harar-mosques.jpg";
import sheikhHussein from "@/assets/sheikh-hussein.jpg";

const destinations = [
  { name: "Lake Tana", description: "Ethiopia's largest lake, home to ancient island monasteries", tours: 8, image: lakeTana, region: "Amhara", type: "Cultural", price: 120 },
  { name: "Blue Nile Falls", description: "The 'Smoke of Fire' — Africa's most stunning waterfall", tours: 5, image: heroFalls, region: "Amhara", type: "Nature", price: 85 },
  { name: "Gondar", description: "The 'Camelot of Africa' with medieval royal castles", tours: 6, image: gondar, region: "Amhara", type: "Historical", price: 95 },
  { name: "Lalibela", description: "UNESCO World Heritage rock-hewn churches carved from stone", tours: 7, image: lalibela, region: "Amhara", type: "Historical", price: 150 },
  { name: "Simien Mountains", description: "Dramatic peaks, Gelada baboons & Africa's 4th highest summit", tours: 9, image: simienMountains, region: "Amhara", type: "Adventure", price: 200 },
  { name: "Danakil Depression", description: "Earth's hottest place with alien sulfur springs & lava lakes", tours: 4, image: danakil, region: "Afar", type: "Adventure", price: 350 },
  { name: "Axum", description: "Ancient obelisks & the legendary home of the Ark of the Covenant", tours: 5, image: axum, region: "Tigray", type: "Historical", price: 110 },
  { name: "Harar", description: "Africa's 4th holiest Islamic city with 82 mosques & hyena men", tours: 6, image: harar, region: "Harari", type: "Cultural", price: 130 },
  { name: "Omo Valley", description: "Meet indigenous tribes with ancient traditions & body art", tours: 7, image: omoValley, region: "SNNPR", type: "Cultural", price: 280 },
  { name: "Bale Mountains", description: "Home to the endangered Ethiopian wolf & afro-alpine wilderness", tours: 5, image: baleMountains, region: "Oromia", type: "Nature", price: 175 },
  { name: "Erta Ale", description: "One of the world's few permanent lava lakes — a fiery spectacle at night", tours: 3, image: ertaAle, region: "Afar", type: "Adventure", price: 400 },
  { name: "Sof Omar Cave", description: "Africa's longest cave system with stunning limestone pillars & underground river", tours: 4, image: sofOmar, region: "Oromia", type: "Nature", price: 160 },
  { name: "Wonchi Crater Lake", description: "Turquoise volcanic lake with horseback trails & hot springs", tours: 5, image: wonchi, region: "Oromia", type: "Nature", price: 90 },
  { name: "Addis Ababa", description: "The capital city — National Museum, Mercato, Holy Trinity Cathedral & vibrant nightlife", tours: 10, image: addisAbaba, region: "Addis Ababa", type: "Cultural", price: 60 },
  { name: "Tiya Stelae", description: "UNESCO megalithic site with mysterious carved stone pillars dating back centuries", tours: 3, image: tiya, region: "SNNPR", type: "Historical", price: 70 },
  { name: "Lake Langano", description: "Ethiopia's favorite resort lake — swim, kayak & relax on golden shores", tours: 4, image: langano, region: "Oromia", type: "Nature", price: 80 },
  { name: "Debre Damo", description: "6th-century cliff-top monastery accessible only by rope — a spiritual adventure", tours: 3, image: debreDamo, region: "Tigray", type: "Historical", price: 140 },
  { name: "Awash National Park", description: "Waterfalls, hot springs & wildlife — oryx, baboons & 450+ bird species", tours: 6, image: awash, region: "Afar", type: "Nature", price: 120 },
  { name: "Al-Nejashi Mosque", description: "Africa's first mosque in Negash — one of Islam's earliest sanctuaries, dating to the 7th century", tours: 4, image: negashMosque, region: "Tigray", type: "Islamic Heritage", price: 130 },
  { name: "Anwar Mosque", description: "Ethiopia's largest mosque in Addis Ababa — a stunning symbol of Islamic architecture and faith", tours: 3, image: anwarMosque, region: "Addis Ababa", type: "Islamic Heritage", price: 50 },
  { name: "Harar Jugol Mosques", description: "The 4th holiest Islamic city with 82 mosques & 102 shrines within ancient walled city walls", tours: 6, image: hararMosques, region: "Harari", type: "Islamic Heritage", price: 130 },
  { name: "Sheikh Hussein Shrine", description: "Major Islamic pilgrimage site in Bale — a sacred shrine attracting thousands of devotees annually", tours: 4, image: sheikhHussein, region: "Oromia", type: "Islamic Heritage", price: 160 },
];

const regions = ["All", "Amhara", "Afar", "Tigray", "Harari", "SNNPR", "Oromia", "Addis Ababa"];
const types = ["All", "Cultural", "Historical", "Adventure", "Nature", "Islamic Heritage"];
const priceRanges = ["All", "$0–$100", "$100–$200", "$200+"];

const Destinations = () => {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = destinations.filter((d) => {
    if (activeRegion !== "All" && d.region !== activeRegion) return false;
    if (activeType !== "All" && d.type !== activeType) return false;
    if (activePriceRange === "$0–$100" && d.price > 100) return false;
    if (activePriceRange === "$100–$200" && (d.price < 100 || d.price > 200)) return false;
    if (activePriceRange === "$200+" && d.price < 200) return false;
    return true;
  });

  return (
    <section id="destinations" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("destinations.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("destinations.title")} <span className="text-gradient-gold italic">{t("destinations.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">{t("destinations.subtitle")}</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2 rounded-full border-border font-body text-xs">
              <Filter className="h-3.5 w-3.5" />
              {t("destinations.filters")}
            </Button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 flex flex-wrap items-center justify-center gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t("destinations.region")}:</span>
                {regions.map((r) => (
                  <button key={r} onClick={() => setActiveRegion(r)} className={`rounded-full px-3 py-1 font-body text-xs transition-all ${activeRegion === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {r}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t("destinations.type")}:</span>
                {types.map((ty) => (
                  <button key={ty} onClick={() => setActiveType(ty)} className={`rounded-full px-3 py-1 font-body text-xs transition-all ${activeType === ty ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {ty}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t("destinations.price")}:</span>
                {priceRanges.map((pr) => (
                  <button key={pr} onClick={() => setActivePriceRange(pr)} className={`rounded-full px-3 py-1 font-body text-xs transition-all ${activePriceRange === pr ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {pr}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Grid - 4 per row on large screens */}
        <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((dest, i) => (
            <motion.div key={dest.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group hover-lift cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-primary/90 px-2 py-0.5 sm:px-2.5 sm:py-1 font-body text-[10px] sm:text-xs font-semibold text-primary-foreground">
                  ${dest.price}+
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="rounded-full bg-primary/20 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-primary">{dest.tours} {t("destinations.tours")}</span>
                  <h3 className="mt-1.5 sm:mt-2 font-display text-sm sm:text-lg font-bold leading-tight text-foreground">{dest.name}</h3>
                  <p className="mt-1 font-body text-[10px] sm:text-xs text-muted-foreground line-clamp-2 hidden sm:block">{dest.description}</p>
                  <a
                    href={`https://wa.me/251998900160?text=I'm interested in ${dest.name} tours`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary/90 px-3 py-1.5 font-body text-xs font-semibold text-primary-foreground opacity-0 transition-all group-hover:opacity-100"
                  >
                    <MessageCircle className="h-3 w-3" />
                    {t("destinations.bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-body text-muted-foreground">{t("destinations.noResults")}</p>
        )}
      </div>
    </section>
  );
};

export default Destinations;
