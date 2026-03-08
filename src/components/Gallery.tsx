import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

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
import ertaAle from "@/assets/erta-ale.jpg";
import sofOmar from "@/assets/sof-omar.jpg";
import wonchi from "@/assets/wonchi.jpg";
import addisAbaba from "@/assets/addis-ababa.jpg";
import tiya from "@/assets/tiya.jpg";
import langano from "@/assets/langano.jpg";
import debreDamo from "@/assets/debre-damo.jpg";
import awash from "@/assets/awash.jpg";
import monastery from "@/assets/monastery.jpg";
import sunsetCruise from "@/assets/sunset-cruise.jpg";
import negashMosque from "@/assets/negash-mosque.jpg";
import anwarMosque from "@/assets/anwar-mosque.jpg";
import hararMosques from "@/assets/harar-mosques.jpg";
import sheikhHussein from "@/assets/sheikh-hussein.jpg";

type GalleryImage = {
  id: number;
  src: string;
  title: string;
  location: string;
  region: string;
  type: string;
  aspect: "landscape" | "portrait" | "square";
};

const galleryImages: GalleryImage[] = [
  // Amhara Region
  { id: 1, src: lakeTana, title: "Lake Tana at Dawn", location: "Lake Tana", region: "Amhara", type: "Nature", aspect: "landscape" },
  { id: 2, src: monastery, title: "Island Monastery", location: "Lake Tana", region: "Amhara", type: "Culture", aspect: "portrait" },
  { id: 3, src: sunsetCruise, title: "Golden Sunset Cruise", location: "Lake Tana", region: "Amhara", type: "Nature", aspect: "landscape" },
  { id: 4, src: heroFalls, title: "Blue Nile Falls", location: "Blue Nile", region: "Amhara", type: "Adventure", aspect: "portrait" },
  { id: 5, src: gondar, title: "Fasil Ghebbi Castle", location: "Gondar", region: "Amhara", type: "Culture", aspect: "landscape" },
  { id: 6, src: lalibela, title: "Bete Giyorgis Church", location: "Lalibela", region: "Amhara", type: "Culture", aspect: "square" },
  { id: 7, src: simienMountains, title: "Simien Peaks Panorama", location: "Simien Mountains", region: "Amhara", type: "Adventure", aspect: "landscape" },

  // Afar Region
  { id: 8, src: danakil, title: "Dallol Sulfur Springs", location: "Danakil Depression", region: "Afar", type: "Adventure", aspect: "landscape" },
  { id: 9, src: ertaAle, title: "Erta Ale Lava Lake", location: "Erta Ale", region: "Afar", type: "Adventure", aspect: "square" },
  { id: 10, src: awash, title: "Awash River Gorge", location: "Awash National Park", region: "Afar", type: "Nature", aspect: "portrait" },

  // Tigray Region
  { id: 11, src: axum, title: "Obelisk of Axum", location: "Axum", region: "Tigray", type: "Culture", aspect: "portrait" },
  { id: 12, src: debreDamo, title: "Debre Damo Cliff Monastery", location: "Debre Damo", region: "Tigray", type: "Adventure", aspect: "landscape" },

  // Harari Region
  { id: 13, src: harar, title: "Harar Jugol Alleyway", location: "Harar", region: "Harari", type: "Culture", aspect: "portrait" },

  // SNNPR Region
  { id: 14, src: omoValley, title: "Mursi Tribe Portrait", location: "Omo Valley", region: "SNNPR", type: "Culture", aspect: "portrait" },
  { id: 15, src: tiya, title: "Tiya Megalithic Stelae", location: "Tiya", region: "SNNPR", type: "Culture", aspect: "landscape" },

  // Oromia Region
  { id: 16, src: baleMountains, title: "Ethiopian Wolf Hunt", location: "Bale Mountains", region: "Oromia", type: "Nature", aspect: "landscape" },
  { id: 17, src: wonchi, title: "Wonchi Crater Lake", location: "Wonchi", region: "Oromia", type: "Nature", aspect: "square" },
  { id: 18, src: sofOmar, title: "Sof Omar Cave Pillars", location: "Sof Omar", region: "Oromia", type: "Adventure", aspect: "portrait" },
  { id: 19, src: langano, title: "Lake Langano Shores", location: "Langano", region: "Oromia", type: "Nature", aspect: "landscape" },

  // Addis Ababa
  { id: 20, src: addisAbaba, title: "Mercato Bustle", location: "Addis Ababa", region: "Addis Ababa", type: "Culture", aspect: "landscape" },

  // Islamic Heritage Sites
  { id: 21, src: negashMosque, title: "Al-Nejashi Mosque", location: "Negash", region: "Tigray", type: "Islamic Heritage", aspect: "landscape" },
  { id: 22, src: anwarMosque, title: "Anwar Mosque", location: "Addis Ababa", region: "Addis Ababa", type: "Islamic Heritage", aspect: "landscape" },
  { id: 23, src: hararMosques, title: "Harar Jugol Mosques", location: "Harar", region: "Harari", type: "Islamic Heritage", aspect: "portrait" },
  { id: 24, src: sheikhHussein, title: "Sheikh Hussein Shrine", location: "Bale", region: "Oromia", type: "Islamic Heritage", aspect: "landscape" },
];

const regions = ["All", "Amhara", "Afar", "Tigray", "Harari", "SNNPR", "Oromia", "Addis Ababa"];
const types = ["All", "Nature", "Culture", "Adventure", "Islamic Heritage"];

const LazyImage = ({ src, alt, className, onClick }: { src: string; alt: string; className?: string; onClick?: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className || ""}`} onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (imgSrc !== "/placeholder.svg") setImgSrc("/placeholder.svg");
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
      />
    </div>
  );
};

const Gallery = () => {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(18);

  const filtered = galleryImages.filter((img) => {
    const regionMatch = activeRegion === "All" || img.region === activeRegion;
    const typeMatch = activeType === "All" || img.type === activeType;
    return regionMatch && typeMatch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goNext, goPrev]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [activeRegion, activeType]);

  const getSpanClass = (aspect: string, index: number) => {
    // Create a varied masonry layout
    if (aspect === "portrait") return "row-span-2";
    if (aspect === "landscape" && index % 7 === 0) return "col-span-2";
    if (aspect === "square" && index % 11 === 0) return "col-span-2 row-span-2";
    return "";
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Ambient decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            <span>{filtered.length} Photos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Multi-Destination Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore Ethiopia through our curated collection — grouped by region and travel style for effortless browsing.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-4 mb-8 md:mb-12"
        >
          {/* Region filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider self-center mr-2 hidden sm:inline">Region</span>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeRegion === r
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          {/* Type filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider self-center mr-2 hidden sm:inline">Style</span>
            {types.map((tp) => (
              <button
                key={tp}
                onClick={() => setActiveType(tp)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeType === tp
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-2 md:gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.5) }}
                className={`group relative cursor-pointer rounded-lg md:rounded-xl overflow-hidden ${getSpanClass(img.aspect, idx)}`}
                onClick={() => openLightbox(idx)}
              >
                <LazyImage
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                  <h4 className="text-white font-semibold text-sm md:text-base leading-tight">{img.title}</h4>
                  <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{img.location}</span>
                  </div>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No photos match your filters.</p>
            <button onClick={() => { setActiveRegion("All"); setActiveType("All"); }} className="mt-3 text-primary underline text-sm">
              Reset filters
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setVisibleCount((c) => c + 18)}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-md"
            >
              Load More Photos ({filtered.length - visibleCount} remaining)
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2" onClick={closeLightbox}>
              <X className="w-6 h-6" />
            </button>

            {/* Nav buttons */}
            <button
              className="absolute left-2 md:left-6 z-10 text-white/60 hover:text-white p-2 bg-white/10 backdrop-blur-sm rounded-full"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-2 md:right-6 z-10 text-white/60 hover:text-white p-2 bg-white/10 backdrop-blur-sm rounded-full"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={filtered[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-[90vw] max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-center text-white z-10 w-[90vw] sm:w-auto">
              <h3 className="font-semibold text-sm sm:text-lg">{filtered[lightboxIndex].title}</h3>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-white/70 text-xs sm:text-sm mt-1">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{filtered[lightboxIndex].location}</span>
                <span className="mx-1">·</span>
                <span>{filtered[lightboxIndex].region}</span>
                <span className="mx-1">·</span>
                <span>{filtered[lightboxIndex].type}</span>
              </div>
              <p className="text-white/50 text-[10px] sm:text-xs mt-1">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
