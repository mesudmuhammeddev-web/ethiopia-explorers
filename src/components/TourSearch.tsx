import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, DollarSign, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const tours = [
  { id: 1, name: "Lake Tana Boat Tour", destination: "Lake Tana", duration: "5 hours", price: 42.50, priceNote: "per person", groupSize: "2–12", category: "Adventure", rating: 4.9 },
  { id: 2, name: "Blue Nile Falls Adventure", destination: "Blue Nile Falls", duration: "4 hours", price: 37.00, priceNote: "per person", groupSize: "2–10", category: "Adventure", rating: 4.8 },
  { id: 3, name: "Monastery Island Hopping", destination: "Lake Tana", duration: "6 hours", price: 48.75, priceNote: "per person", groupSize: "2–8", category: "Culture", rating: 5.0 },
  { id: 4, name: "Sunset Lake Cruise", destination: "Lake Tana", duration: "3 hours", price: 29.99, priceNote: "per person", groupSize: "2–20", category: "Relaxation", rating: 4.7 },
  { id: 5, name: "Gondar Royal Castles Tour", destination: "Gondar", duration: "5 hours", price: 39.00, priceNote: "per person", groupSize: "2–15", category: "Culture", rating: 4.9 },
  { id: 6, name: "Lalibela Rock Churches Trek", destination: "Lalibela", duration: "8 hours", price: 58.50, priceNote: "per person", groupSize: "2–10", category: "Adventure", rating: 5.0 },
  { id: 7, name: "Simien Mountains Day Hike", destination: "Simien Mountains", duration: "10 hours", price: 75.00, priceNote: "per person", groupSize: "2–8", category: "Adventure", rating: 4.9 },
  { id: 8, name: "Simien 3-Day Trek", destination: "Simien Mountains", duration: "3 days", price: 285.00, priceNote: "per person", groupSize: "2–6", category: "Adventure", rating: 5.0 },
  { id: 9, name: "Danakil Depression Expedition", destination: "Danakil Depression", duration: "3 days", price: 395.00, priceNote: "per person", groupSize: "4–12", category: "Adventure", rating: 4.8 },
  { id: 10, name: "Erta Ale Volcano Night Trek", destination: "Danakil Depression", duration: "2 days", price: 275.00, priceNote: "per person", groupSize: "4–10", category: "Adventure", rating: 4.9 },
  { id: 11, name: "Axum Historical Tour", destination: "Axum", duration: "6 hours", price: 44.00, priceNote: "per person", groupSize: "2–15", category: "Culture", rating: 4.8 },
  { id: 12, name: "Harar Old City Walking Tour", destination: "Harar", duration: "4 hours", price: 32.50, priceNote: "per person", groupSize: "2–12", category: "Culture", rating: 4.7 },
  { id: 13, name: "Hyena Man Night Experience", destination: "Harar", duration: "2 hours", price: 25.00, priceNote: "per person", groupSize: "2–20", category: "Adventure", rating: 4.9 },
  { id: 14, name: "Omo Valley Tribal Encounter", destination: "Omo Valley", duration: "3 days", price: 320.00, priceNote: "per person", groupSize: "2–8", category: "Culture", rating: 5.0 },
  { id: 15, name: "Bale Mountains Wildlife Safari", destination: "Bale Mountains", duration: "2 days", price: 195.00, priceNote: "per person", groupSize: "2–8", category: "Adventure", rating: 4.8 },
  { id: 16, name: "Ethiopian Coffee Ceremony", destination: "Lake Tana", duration: "2 hours", price: 18.50, priceNote: "per person", groupSize: "2–10", category: "Culture", rating: 4.9 },
  { id: 17, name: "Bahir Dar City & Market Tour", destination: "Lake Tana", duration: "3 hours", price: 22.00, priceNote: "per person", groupSize: "2–12", category: "Culture", rating: 4.6 },
  { id: 18, name: "Debre Birhan Selassie Church", destination: "Gondar", duration: "3 hours", price: 28.00, priceNote: "per person", groupSize: "2–15", category: "Culture", rating: 4.8 },
];

const destinationList = ["All", "Lake Tana", "Blue Nile Falls", "Gondar", "Lalibela", "Simien Mountains", "Danakil Depression", "Axum", "Harar", "Omo Valley", "Bale Mountains"];
const categories = ["All", "Adventure", "Culture", "Relaxation"];

const TourSearch = () => {
  const [selectedDest, setSelectedDest] = useState("All");
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tours.filter((t) => {
    if (selectedDest !== "All" && t.destination !== selectedDest) return false;
    if (selectedCat !== "All" && t.category !== selectedCat) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="tours" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-body text-sm tracking-widest text-primary uppercase">Find Your Adventure</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Explore Our <span className="text-gradient-gold italic">Tours</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">
            {tours.length} tours across {destinationList.length - 1} destinations — all prices per person, inclusive of guide & transport
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card mx-auto mt-12 max-w-5xl rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {destinationList.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDest(d)}
                className={`rounded-lg px-3 py-1.5 font-body text-xs font-medium transition-all ${
                  selectedDest === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`rounded-full px-3 py-1 font-body text-xs transition-all ${
                  selectedCat === c
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mx-auto mt-6 max-w-5xl">
          <p className="font-body text-sm text-muted-foreground">{filtered.length} tours found</p>
        </div>

        {/* Results */}
        <div className="mx-auto mt-4 grid max-w-5xl gap-3">
          {filtered.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card hover-lift flex flex-col items-start justify-between gap-4 rounded-xl p-5 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground">{tour.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tour.destination}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tour.duration}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{tour.groupSize}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{tour.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-primary">${tour.price.toFixed(2)}</span>
                  <p className="font-body text-xs text-muted-foreground">{tour.priceNote}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-body text-xs font-semibold text-primary">⭐ {tour.rating}</span>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-dark">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No tours found. Try adjusting your filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourSearch;
