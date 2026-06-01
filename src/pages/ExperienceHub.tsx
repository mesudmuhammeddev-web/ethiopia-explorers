import { Link, useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Clock, MapPin, Users, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/experiences";

const Footer = lazy(() => import("@/components/Footer"));

const categories = ["Express", "Classic", "Extended", "Grand"] as const;

const labels: Record<string, string> = {
  Express: "Express Trips (2–4 days)",
  Classic: "Classic Tours (5–8 days)",
  Extended: "Extended Journeys (9–15 days)",
  Grand: "Grand Tours (16+ days)",
};

const ExperienceHub = () => {
  const { category: catSlug } = useParams();
  const category = catSlug ? getCategory(catSlug) : undefined;

  if (!category) return <Navigate to="/" replace />;

  const wa = `https://wa.me/251998900160?text=${encodeURIComponent(
    `Hi, I'm interested in your ${category.label} tours`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={category.seoTitle}
        description={category.seoDescription}
        canonicalPath={`/experiences/${category.slug}`}
      />
      <Navbar />

      <section className="relative pt-24 pb-12">
        <div className="container mx-auto px-6">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span>Experiences</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{category.label}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {category.region}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {category.label}
            </h1>
            <p className="mt-3 text-lg text-primary font-medium">{category.tagline}</p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {category.intro} Choose from {category.tours.length} expertly designed itineraries, all led by licensed Ethiopian guides.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <a href={wa} target="_blank" rel="noopener noreferrer">
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

      <section className="py-12">
        <div className="container mx-auto px-6">
          {categories.map((cat) => {
            const tours = category.tours.filter((t) => t.category === cat);
            if (tours.length === 0) return null;
            return (
              <div key={cat} className="mb-16">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{labels[cat]}</h2>
                <div className="w-16 h-1 bg-accent mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <Link
                      key={tour.slug}
                      to={`/experiences/${category.slug}/${tour.slug}`}
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

export default ExperienceHub;
