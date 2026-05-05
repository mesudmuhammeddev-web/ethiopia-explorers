import { useParams, Link, Navigate } from "react-router-dom";
import { Check, X, Clock, MapPin, Users, Calendar, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getNorthernHeritageTour } from "@/data/northernHeritageTours";
import { getBookingFormUrl } from "@/lib/bookingForm";

const WHATSAPP = "+251998900160";

const NorthernHeritageTourDetail = () => {
  const { slug = "" } = useParams();
  const tour = getNorthernHeritageTour(slug);

  if (!tour) return <Navigate to="/experiences/northern-heritage" replace />;

  const waMsg = encodeURIComponent(
    `Hello! I'd like to learn more about the "${tour.title}" tour (${tour.duration}, from $${tour.pricePerPerson}/person).`,
  );
  const waUrl = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${waMsg}`;
  const bookingUrl = getBookingFormUrl({
    tourName: tour.title,
    price: tour.pricePerPerson,
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${tour.title} | Ethiopia Travel Explorer`}
        description={`${tour.heroTagline} ${tour.duration}. From $${tour.pricePerPerson}/person. ${tour.routeSummary}.`}
        canonicalPath={`/experiences/northern-heritage/${tour.slug}`}
      />
      <Navbar />

      <header className="pt-28 pb-10 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            to="/experiences/northern-heritage"
            className="text-sm text-primary hover:underline"
          >
            ← All Northern Heritage Tours
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-3">
            {tour.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{tour.heroTagline}</p>
          <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {tour.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {tour.routeSummary}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> {tour.startCity} → {tour.endCity}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-foreground/80 leading-relaxed">{tour.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <ul className="space-y-2">
              {tour.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Day-by-Day Itinerary</h2>
            <ol className="space-y-4">
              {tour.itinerary.map((d) => (
                <li key={d.day} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase mb-1">
                    <Calendar className="w-3.5 h-3.5" /> Day {d.day}
                    {d.overnight && <span className="text-muted-foreground font-normal normal-case">· Overnight: {d.overnight}</span>}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{d.title}</h3>
                  {d.summary && <p className="text-sm text-foreground/75">{d.summary}</p>}
                  {d.meals && <p className="text-xs text-muted-foreground mt-1">Meals: {d.meals}</p>}
                </li>
              ))}
            </ol>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-3 text-primary">Included</h2>
              <ul className="space-y-2">
                {tour.inclusions.map((x, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3 text-muted-foreground">Not Included</h2>
              <ul className="space-y-2">
                {tour.exclusions.map((x, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-card border border-border rounded-xl p-6 shadow-lg">
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-3xl font-bold text-primary mb-1">${tour.pricePerPerson}</p>
            <p className="text-xs text-muted-foreground mb-5">per person · indicative starting price</p>

            <Button asChild size="lg" className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white mb-3">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book This Tour
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full mb-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/contact?region=north">Customize this trip</Link>
            </Button>

            <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-muted-foreground">
              <p>✔ Licensed Ethiopian tour operator</p>
              <p>✔ 24/7 WhatsApp support</p>
              <p>✔ Free itinerary changes</p>
              <p>✔ No hidden fees</p>
            </div>

            <div className="mt-4 text-xs">
              <p className="font-semibold text-foreground mb-1">Best for:</p>
              <p className="text-muted-foreground">{tour.bestFor.join(" · ")}</p>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default NorthernHeritageTourDetail;
