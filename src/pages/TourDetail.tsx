import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Users, Star, Calendar, Check, X,
  ChevronLeft, ChevronRight, DollarSign, Sparkles, Phone, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, getTourBySlug, getPriceForGroup, type Tour } from "@/data/tours";

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tour = getTourBySlug(slug || "");

  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Tour Not Found</h1>
        <p className="mt-2 text-muted-foreground">The tour you're looking for doesn't exist.</p>
        <Button className="mt-6 bg-primary text-primary-foreground" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }

  const price = getPriceForGroup(tour.pricing, travelers);
  const totalPrice = price * travelers;
  const relatedTours = tour.relatedTourIds.map((id) => tours.find((t) => t.id === id)!).filter(Boolean);
  const availableSlot = selectedDate
    ? tour.availability.find((a) => a.date === selectedDate)
    : null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={tour.image} alt={tour.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="container mx-auto">
            <button
              onClick={() => navigate("/")}
              className="mb-4 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all tours
            </button>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/20 px-3 py-1 font-body text-xs font-medium text-primary">{tour.category}</span>
              <span className="flex items-center gap-1 font-body text-sm text-primary">
                <Star className="h-3.5 w-3.5 fill-primary" /> {tour.rating}
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-5xl">{tour.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{tour.destination}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{tour.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{tour.groupSize} travelers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Overview</h2>
              <p className="mt-4 font-body leading-relaxed text-muted-foreground">{tour.longDescription}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tour.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="font-body text-xs text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Gallery</h2>
              <div className="mt-4">
                <div
                  className="relative cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={tour.galleryImages[galleryIndex]}
                    alt={`${tour.name} gallery ${galleryIndex + 1}`}
                    className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg bg-background/80 px-3 py-1 font-body text-xs text-foreground backdrop-blur">
                    {galleryIndex + 1} / {tour.galleryImages.length}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  {tour.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`overflow-hidden rounded-lg transition-all ${
                        i === galleryIndex ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="h-16 w-24 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
              {lightboxOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6"
                  onClick={() => setLightboxOpen(false)}
                >
                  <button
                    className="absolute top-6 right-6 rounded-full bg-secondary p-2 text-foreground"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute left-4 rounded-full bg-secondary p-2 text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex((prev) => (prev - 1 + tour.galleryImages.length) % tour.galleryImages.length);
                    }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <img
                    src={tour.galleryImages[galleryIndex]}
                    alt=""
                    className="max-h-[80vh] max-w-full rounded-2xl object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="absolute right-4 rounded-full bg-secondary p-2 text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex((prev) => (prev + 1) % tour.galleryImages.length);
                    }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Itinerary */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Itinerary</h2>
              <div className="mt-6 space-y-0">
                {tour.itinerary.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      {i < tour.itinerary.length - 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-secondary px-2 py-0.5 font-body text-[10px] font-medium text-muted-foreground">{step.time}</span>
                        <h3 className="font-display text-base font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-1 font-body text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's included */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">What's Included</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-body text-sm font-semibold text-primary">Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-body text-sm font-semibold text-destructive">Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-destructive/60" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Traveler Reviews</h2>
              <div className="mt-4 space-y-4">
                {tour.reviews.map((review, i) => (
                  <div key={i} className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-sm font-semibold text-foreground">{review.name}</span>
                        <span className="ml-2 font-body text-xs text-muted-foreground">{review.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar — Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price card */}
              <div className="glass-card rounded-2xl p-6">
                <div className="text-center">
                  <span className="font-display text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                  <p className="font-body text-xs text-muted-foreground">per person</p>
                </div>

                {/* Pricing tiers */}
                <div className="mt-4 flex gap-2">
                  {[
                    { n: 1, label: "Solo", price: tour.pricing.solo },
                    { n: 2, label: "2–3", price: tour.pricing.small },
                    { n: 4, label: "4+", price: tour.pricing.group },
                  ].map((tier) => (
                    <button
                      key={tier.n}
                      onClick={() => setTravelers(tier.n)}
                      className={`flex-1 rounded-lg py-2 text-center transition-all ${
                        travelers === tier.n || (travelers >= 2 && travelers < 4 && tier.n === 2) || (travelers >= 4 && tier.n === 4)
                          ? "bg-primary/20 ring-1 ring-primary"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="font-display text-sm font-bold text-primary">${tier.price.toFixed(2)}</p>
                      <p className="font-body text-[10px] text-muted-foreground">{tier.label}</p>
                    </button>
                  ))}
                </div>

                {/* Traveler count */}
                <div className="mt-4">
                  <label className="font-body text-xs text-muted-foreground">Number of travelers</label>
                  <div className="mt-1 flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button
                        key={n}
                        onClick={() => setTravelers(n)}
                        className={`flex-1 rounded-lg py-2 font-body text-xs font-medium transition-all ${
                          travelers === n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability dates */}
                <div className="mt-4">
                  <label className="font-body text-xs text-muted-foreground">Select a date</label>
                  <div className="mt-1 grid grid-cols-4 gap-1.5">
                    {tour.availability.slice(0, 8).map((slot) => {
                      const d = new Date(slot.date);
                      const isSoldOut = slot.spotsLeft === 0;
                      const isLow = slot.spotsLeft > 0 && slot.spotsLeft <= 3;
                      const isSelected = selectedDate === slot.date;
                      return (
                        <button
                          key={slot.date}
                          disabled={isSoldOut}
                          onClick={() => setSelectedDate(slot.date)}
                          className={`flex flex-col items-center rounded-lg py-2 text-center transition-all ${
                            isSoldOut
                              ? "cursor-not-allowed bg-destructive/10 opacity-40"
                              : isSelected
                              ? "bg-primary text-primary-foreground ring-2 ring-primary"
                              : isLow
                              ? "bg-accent/20 hover:bg-accent/30"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          <span className={`text-[10px] ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}>
                            {d.toLocaleDateString("en-US", { weekday: "short" })}
                          </span>
                          <span className={`font-display text-sm font-semibold ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                            {d.getDate()}
                          </span>
                          <span className={`text-[8px] font-medium ${
                            isSoldOut ? "text-destructive" : isLow ? "text-accent" : isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}>
                            {isSoldOut ? "Full" : `${slot.spotsLeft} left`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-body text-sm text-muted-foreground">Total ({travelers} {travelers === 1 ? "person" : "people"})</span>
                  <span className="font-display text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Booking form */}
              <div className="glass-card rounded-2xl p-6">
                {bookingSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">Booking Requested!</h3>
                    <p className="mt-2 font-body text-sm text-muted-foreground">
                      We'll confirm your {tour.name} booking within 24 hours via email.
                    </p>
                    <Button className="mt-4 bg-primary text-primary-foreground" onClick={() => setBookingSubmitted(false)}>
                      Book Another Tour
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-foreground">Book This Tour</h3>
                    <div>
                      <label className="font-body text-xs text-muted-foreground">Full Name *</label>
                      <input
                        required
                        maxLength={100}
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground">Email *</label>
                      <input
                        required
                        type="email"
                        maxLength={255}
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground">Phone</label>
                      <input
                        type="tel"
                        maxLength={20}
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground">Special Requests</label>
                      <textarea
                        maxLength={500}
                        rows={3}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="mt-1 w-full resize-none rounded-lg bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Dietary needs, accessibility, etc."
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-gold-dark" size="lg">
                      Request Booking — ${totalPrice.toFixed(2)}
                    </Button>
                    <p className="text-center font-body text-[10px] text-muted-foreground">
                      No payment required now. We'll confirm availability within 24 hours.
                    </p>
                  </form>
                )}
              </div>

              {/* Quick contact */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/251900000000?text=${encodeURIComponent(`Hi! I'm interested in the ${tour.name} tour.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3 font-body text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" /> WhatsApp
                </a>
                <a
                  href={`mailto:info@ethiowander.com?subject=${encodeURIComponent(tour.name)}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3 font-body text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  <Mail className="h-3.5 w-3.5 text-primary" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related tours */}
        {relatedTours.length > 0 && (
          <section className="mt-20">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
              <Sparkles className="h-5 w-5 text-primary" /> You Might Also Like
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((rt) => (
                <Link
                  key={rt.id}
                  to={`/tour/${rt.slug}`}
                  className="group glass-card hover-lift overflow-hidden rounded-2xl"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={rt.image} alt={rt.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 font-body text-[10px] font-medium text-primary">{rt.category}</span>
                      <span className="flex items-center gap-1 font-body text-xs text-primary"><Star className="h-3 w-3 fill-primary" /> {rt.rating}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-bold text-foreground">{rt.name}</h3>
                    <p className="mt-1 font-body text-xs text-muted-foreground line-clamp-2">{rt.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="font-display text-lg font-bold text-primary">${getPriceForGroup(rt.pricing, 2).toFixed(2)}</span>
                        <span className="font-body text-[10px] text-muted-foreground"> /person</span>
                      </div>
                      <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {rt.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TourDetail;
