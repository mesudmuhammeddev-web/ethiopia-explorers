import { useParams, Link, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Clock, MapPin, Users, Check, X, MessageCircle, Mail, ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getNorthernHeritageTour } from "@/data/northernHeritageTours";

const Footer = lazy(() => import("@/components/Footer"));

const NorthernHeritageTour = () => {
  const { slug } = useParams();
  const tour = slug ? getNorthernHeritageTour(slug) : undefined;

  if (!tour) return <Navigate to="/experiences/northern-heritage" replace />;

  const waMessage = encodeURIComponent(`Hi! I'd like more info about the "${tour.title}" tour.`);
  const whatsappUrl = `https://wa.me/251998900160?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${tour.title} — Ethiopia Travel Explorer`}
        description={tour.shortDescription}
        canonicalPath={`/experiences/northern-heritage/${tour.slug}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[55vh] min-h-[400px] overflow-hidden bg-muted">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/experiences/northern-heritage" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4">
                <ArrowLeft className="w-4 h-4" /> All Northern Heritage Tours
              </Link>
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {tour.category}
              </span>
              <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold text-white max-w-4xl">{tour.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Quick facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card border border-border rounded-xl">
                <div><div className="text-xs text-muted-foreground uppercase tracking-wider">Duration</div><div className="mt-1 font-semibold flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{tour.duration}</div></div>
                <div><div className="text-xs text-muted-foreground uppercase tracking-wider">Transport</div><div className="mt-1 font-semibold">{tour.transport}</div></div>
                <div><div className="text-xs text-muted-foreground uppercase tracking-wider">Group Size</div><div className="mt-1 font-semibold flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{tour.groupSize}</div></div>
                <div><div className="text-xs text-muted-foreground uppercase tracking-wider">From</div><div className="mt-1 font-bold text-xl text-primary">${tour.priceFrom}</div></div>
              </div>

              {/* Overview */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Tour Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{tour.overview}</p>
              </div>

              {/* Route */}
              <div>
                <h3 className="font-display text-xl font-bold mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Route</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {tour.route.map((stop, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-medium">{stop}</span>
                      {i < tour.route.length - 1 && <span className="text-muted-foreground">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Tour Highlights</h3>
                <ul className="space-y-2">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3"><Check className="w-5 h-5 text-accent shrink-0 mt-0.5" /><span className="text-foreground">{h}</span></li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-primary" /> Day-by-Day Itinerary</h3>
                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-primary pl-5 py-3">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded">DAY {day.day}</span>
                        <h4 className="font-display text-lg font-bold text-foreground">{day.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{day.description}</p>
                      {(day.meals || day.overnight) && (
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {day.meals && <span><strong className="text-foreground">Meals:</strong> {day.meals}</span>}
                          {day.overnight && day.overnight !== "—" && <span><strong className="text-foreground">Overnight:</strong> {day.overnight}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Excluded */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2 text-green-700"><Check className="w-5 h-5" /> What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span className="text-muted-foreground">{item}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2 text-destructive"><X className="w-5 h-5" /> Not Included</h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /><span className="text-muted-foreground">{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sticky sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 shadow-xl">
                  <div className="text-sm opacity-90">Starting from</div>
                  <div className="text-4xl font-bold">${tour.priceFrom}<span className="text-base font-normal opacity-80"> /person</span></div>
                  <div className="text-xs opacity-80 mt-1">Final price varies by group size & season</div>

                  <div className="mt-5 space-y-2.5">
                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full gap-2">
                      <Link to={`/contact?tour=${encodeURIComponent(tour.title)}`}>
                        <Mail className="w-4 h-4" /> Request Itinerary
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/20 space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Licensed Ethiopian operator</div>
                    <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Replies usually within 1 hour</div>
                    <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Free itinerary changes</div>
                    <div className="flex items-center gap-2"><Check className="w-4 h-4" /> No hidden fees</div>
                  </div>
                </div>

                <div className="bg-secondary/30 border border-border rounded-xl p-5 text-sm">
                  <div className="font-semibold mb-1">📞 Prefer to call?</div>
                  <a href="tel:+251998900160" className="text-primary font-medium">+251 99 890 0160</a>
                  <div className="text-muted-foreground text-xs mt-1">Available 24/7</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default NorthernHeritageTour;
