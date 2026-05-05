import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { northernHeritageTours } from "@/data/northernHeritageTours";

const categoryLabels: Record<string, string> = {
  "short-break": "Short Breaks",
  classic: "Classic Historic Route",
  extended: "Extended Journeys",
  festival: "Festivals",
  grand: "Grand Tours",
};

const NorthernHeritageIndex = () => {
  const grouped = northernHeritageTours.reduce<Record<string, typeof northernHeritageTours>>(
    (acc, t) => {
      (acc[t.category] ||= []).push(t);
      return acc;
    },
    {},
  );

  const order: (keyof typeof categoryLabels)[] = ["short-break", "classic", "extended", "festival", "grand"];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Northern Heritage Tours of Ethiopia — Lalibela, Gondar, Axum & Simien"
        description="Original Ethiopia Historic Route tours: Lalibela rock-hewn churches, Gondar castles, Axum stelae, Simien Mountains. Short breaks to 30-day grand tours."
        canonicalPath="/experiences/northern-heritage"
      />
      <Navbar />

      <header className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Experiences · Northern Heritage
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Northern Heritage Tours
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            The Historic Route of Ethiopia — Lalibela's rock-hewn churches, Gondar's
            castles, Axum's ancient stelae, the Simien Mountains and Lake Tana's
            island monasteries. Choose a short break or a multi-week journey, all
            built and led by local Ethiopian experts.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-12 space-y-16">
        {order.map((cat) =>
          grouped[cat] ? (
            <section key={cat}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 border-b-2 border-primary/20 pb-2">
                {categoryLabels[cat]}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[cat].map((tour) => (
                  <Link
                    key={tour.slug}
                    to={`/experiences/northern-heritage/${tour.slug}`}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {tour.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {tour.startCity}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {tour.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {tour.heroTagline}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">From</p>
                          <p className="text-xl font-bold text-primary">
                            ${tour.pricePerPerson}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null,
        )}

        <section className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Want a tailor-made northern itinerary?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Mix and match destinations, durations and pace. We'll build it around your dates.
          </p>
          <Button asChild size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
            <Link to="/contact?region=north">Plan My Northern Trip</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NorthernHeritageIndex;
