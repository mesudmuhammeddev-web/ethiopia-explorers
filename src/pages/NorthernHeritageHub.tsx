import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Clock, MapPin, Users, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { northernHeritageTours } from "@/data/northernHeritageTours";

const Footer = lazy(() => import("@/components/Footer"));

const WHATSAPP = "https://wa.me/251998900160?text=Hi%2C%20I%27m%20interested%20in%20your%20Northern%20Ethiopia%20heritage%20tours";

const categories = ["Express", "Classic", "Extended", "Grand"] as const;

const NorthernHeritageHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Northern Ethiopia Heritage Tours — 24 Curated Itineraries"
        description="Lalibela rock-hewn churches, Gondar castles, Axum stelae, Lake Tana monasteries and the Simien Mountains. 2 to 30-day expert-led tours. Licensed local operator."
        canonicalPath="/experiences/northern-heritage"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12">
        <div className="container mx-auto px-6">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span>Experiences</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Northern Heritage</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Northern Ethiopia
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Northern Heritage <span className="text-gradient-gold italic">Tours</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From Lalibela's rock-hewn churches to Gondar's 17th-century castles, Axum's ancient stelae and the wild Simien Mountains —
              choose from {northernHeritageTours.length} expertly designed itineraries, 2 to 30 days, all led by licensed Ethiopian guides.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Plan My Trip on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Request Custom Itinerary</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours grid by category */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {categories.map((cat) => {
            const tours = northernHeritageTours.filter((t) => t.category === cat);
            if (tours.length === 0) return null;
            const labels: Record<string, string> = {
              Express: "Express Trips (2–4 days)",
              Classic: "Classic Tours (5–8 days)",
              Extended: "Extended Journeys (10–15 days)",
              Grand: "Grand Tours (20+ days)",
            };
            return (
              <div key={cat} className="mb-16">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{labels[cat]}</h2>
                <div className="w-16 h-1 bg-accent mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <Link
                      key={tour.slug}
                      to={`/experiences/northern-heritage/${tour.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-[16/10] bg-muted overflow-hidden">
                        <img
                          src={tour.heroImage}
                          alt={tour.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {tour.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tour.shortDescription}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tour.duration}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {tour.route.length} stops</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {tour.groupSize}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-sm">
                            <span className="text-muted-foreground">From </span>
                            <span className="font-bold text-primary">${tour.priceFrom}</span>
                          </span>
                          <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            View <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default NorthernHeritageHub;
