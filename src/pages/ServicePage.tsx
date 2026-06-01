import { Link, useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Check, MessageCircle, Mail, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Footer = lazy(() => import("@/components/Footer"));

type Service = {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  intro: string;
  bullets: string[];
  details: { heading: string; body: string }[];
  seoTitle: string;
  seoDescription: string;
};

const services: Record<string, Service> = {
  "car-rental": {
    slug: "car-rental",
    title: "Car Rental with Driver in Ethiopia",
    tagline: "Reliable 4WD vehicles with experienced local drivers — countrywide",
    heroImage: "/photos/landcruiser-ethiopia.jpg",
    intro:
      "Renting a self-drive car in Ethiopia is rarely advisable: road signage is limited, fuel stops are sparse outside cities, and rural police checkpoints prefer to see a local driver. We provide modern 4WD vehicles — typically Toyota Land Cruisers, Land Cruiser Prados or Hilux double-cabs — with our own experienced English-speaking drivers.",
    bullets: [
      "Toyota Land Cruiser / Prado / Hilux 4WD vehicles",
      "Experienced English-speaking Ethiopian drivers",
      "Fuel, driver food and lodging included on multi-day trips",
      "Comprehensive insurance and 24/7 backup",
      "Daily, weekly and monthly rates available",
      "Airport pickup and city transfers",
    ],
    details: [
      { heading: "Who this is for", body: "Independent travellers, NGOs, photographers, journalists, business visitors and travel writers who need flexible transport without booking a full guided tour." },
      { heading: "Coverage", body: "Anywhere in Ethiopia: Addis Ababa, historic north (Bahir Dar, Gondar, Lalibela, Axum), Danakil, Omo Valley, Bale Mountains, Harar — all reachable." },
      { heading: "Pricing", body: "Daily rate depends on vehicle, route and season. Long-term rentals (2+ weeks) attract significant discounts. WhatsApp us with your dates and route for a firm quote within the hour." },
    ],
    seoTitle: "Car Rental Ethiopia with Driver — 4WD Land Cruiser Hire | Ethiopia Travel Explorer",
    seoDescription:
      "Rent a 4WD Land Cruiser with experienced English-speaking driver anywhere in Ethiopia. Insurance, fuel and 24/7 backup included. Quote in under an hour on WhatsApp.",
  },
  "day-trips-addis": {
    slug: "day-trips-addis",
    title: "Day Trips from Addis Ababa",
    tagline: "Stuck in Addis for a day? Make it count.",
    heroImage: "/photos/addis-ababa.jpg",
    intro:
      "Whether you're on a layover or have a free day before your main tour begins, Addis Ababa is a great launch point for short trips. We run private day excursions to the crater lakes of Debre Zeit, the rock-hewn churches of Adadi Maryam, the Menagesha forest and the Mt. Entoto viewpoint.",
    bullets: [
      "Addis Ababa city tour (Lucy / Holy Trinity / Merkato)",
      "Debre Zeit crater lakes (Bishoftu)",
      "Adadi Maryam + Melka Kunture archaeological site",
      "Mt. Entoto viewpoint + Entoto Maryam church",
      "Menagesha-Suba forest hike",
      "Tiya stelae UNESCO site",
    ],
    details: [
      { heading: "Half-day vs full-day", body: "Half-day options run 4–5 hours and include city tour, Entoto, or a single crater lake. Full-day trips cover further destinations like Debre Zeit, Adadi Maryam or Tiya." },
      { heading: "What's included", body: "Private vehicle and driver, licensed guide, all entrance fees, bottled water and hotel pickup/drop-off in Addis Ababa." },
      { heading: "Booking", body: "Same-day or next-day booking usually possible via WhatsApp — message us your hotel and we'll send a quote within the hour." },
    ],
    seoTitle: "Addis Ababa Day Trips — Crater Lakes, Tiya, Entoto | Ethiopia Travel Explorer",
    seoDescription:
      "Private day trips from Addis Ababa: city tour, Debre Zeit crater lakes, Adadi Maryam, Tiya stelae and Mt. Entoto. Same-day booking on WhatsApp.",
  },
  "group-vs-private": {
    slug: "group-vs-private",
    title: "Group Tours vs Private Tours",
    tagline: "How to choose between joining a group departure and travelling privately",
    heroImage: "/photos/group-travelers.jpg",
    intro:
      "Most of our trips are run privately — just you, your travel companions and our team. We also run small-group departures on set dates for solo travellers and couples who prefer the cost savings (and social side) of shared travel.",
    bullets: [
      "Private tours: your own vehicle, guide, schedule — any date",
      "Group tours: scheduled departures, max 8 travellers, shared cost",
      "Both options use the same licensed guides and vehicles",
      "Both include WhatsApp planning support before departure",
      "Pricing is per person; group rates are 20–35% lower",
      "Solo traveller welcome on group departures",
    ],
    details: [
      { heading: "Choose Private if", body: "You want flexibility on dates and pace, you're travelling with family or close friends, you're a photographer needing time at specific sites, or you want to customise the itinerary." },
      { heading: "Choose Group if", body: "You're a solo traveller wanting company, you're budget-conscious, your dates are flexible enough to match a scheduled departure, or you enjoy meeting fellow travellers." },
      { heading: "Set departures", body: "We publish set Omo Valley, Danakil and Historic North departures roughly monthly. Message on WhatsApp for upcoming dates." },
    ],
    seoTitle: "Private Tours vs Group Departures Ethiopia | Ethiopia Travel Explorer",
    seoDescription:
      "Compare private Ethiopia tours with scheduled group departures. Same licensed guides, different prices and group sizes. Solo travellers welcome.",
  },
};

const ServicePage = () => {
  const { slug } = useParams();
  const service = slug ? services[slug] : undefined;

  if (!service) return <Navigate to="/" replace />;

  const wa = `https://wa.me/251998900160?text=${encodeURIComponent(
    `Hi, I'd like info about ${service.title}.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={service.seoTitle} description={service.seoDescription} canonicalPath={`/services/${service.slug}`} />
      <Navbar />

      <section className="relative pt-20">
        <div className="relative h-[45vh] min-h-[320px] overflow-hidden bg-muted">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4">
                <ArrowLeft className="w-4 h-4" /> Home
              </Link>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white max-w-3xl">{service.title}</h1>
              <p className="mt-2 text-white/90 text-lg max-w-2xl">{service.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">{service.intro}</p>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">What's included</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {service.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>{b}</span></li>
                ))}
              </ul>
            </div>

            {service.details.map((d, i) => (
              <div key={i}>
                <h3 className="font-display text-xl font-bold mb-2">{d.heading}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 shadow-xl space-y-3">
              <h3 className="font-display text-xl font-bold">Get a quote in under an hour</h3>
              <p className="text-sm opacity-90">WhatsApp is fastest. Tell us your dates, group size and route — we'll reply with options and price.</p>
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full gap-2">
                <Link to="/contact"><Mail className="w-4 h-4" /> Send an Inquiry</Link>
              </Button>
              <div className="pt-3 border-t border-white/20 text-xs opacity-90">
                <div>📞 +251 99 890 0160 (24/7)</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ServicePage;
