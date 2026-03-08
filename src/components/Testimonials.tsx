import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "The Lake Tana boat tour was absolutely magical. Our guide knew every hidden monastery and the sunset was unforgettable. Best travel experience of my life!",
    avatar: "SM",
    tour: "Lake Tana Boat Tour",
  },
  {
    name: "James Okonkwo",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Blue Nile Falls took my breath away. The hiking trail was well-organized and our guide shared fascinating stories about the local culture. Highly recommend!",
    avatar: "JO",
    tour: "Blue Nile Falls Hike",
  },
  {
    name: "Elena Rossi",
    location: "Milan, Italy",
    rating: 5,
    text: "From the ancient churches of Lalibela to the castles of Gondar, every moment felt like stepping back in time. EthioWander made it all seamless.",
    avatar: "ER",
    tour: "Historical North Circuit",
  },
  {
    name: "Hiroshi Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    text: "The Danakil Depression was like visiting another planet. Incredible logistics by the team — felt safe the entire time despite the extreme conditions.",
    avatar: "HT",
    tour: "Danakil Expedition",
  },
  {
    name: "Amara Johnson",
    location: "London, UK",
    rating: 5,
    text: "Trekking the Simien Mountains with EthioWander was the highlight of my year. The Gelada baboons, the views — absolutely unreal. Can't wait to return!",
    avatar: "AJ",
    tour: "Simien Mountains Trek",
  },
  {
    name: "Carlos Mendez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "Harar was a revelation — the hyena feeding at night, the colorful markets, the 82 mosques. Our guide made every moment feel personal and authentic.",
    avatar: "CM",
    tour: "Harar Cultural Tour",
  },
  {
    name: "Fatima Al-Hassan",
    location: "Dubai, UAE",
    rating: 5,
    text: "We did the Omo Valley tribal tour with our family. The children loved meeting the Mursi and Hamer tribes. EthioWander handled every detail flawlessly.",
    avatar: "FA",
    tour: "Omo Valley Tribal Experience",
  },
  {
    name: "David Müller",
    location: "Berlin, Germany",
    rating: 5,
    text: "The Bale Mountains trek was incredible — we spotted the Ethiopian wolf on day two! The camping setup was comfortable and the food was surprisingly amazing.",
    avatar: "DM",
    tour: "Bale Mountains Wildlife Trek",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "Axum's ancient obelisks and the Church of St. Mary of Zion left me speechless. The history here rivals anything in Egypt. Absolutely must-visit!",
    avatar: "PS",
    tour: "Axum Heritage Tour",
  },
  {
    name: "Marie Dupont",
    location: "Paris, France",
    rating: 5,
    text: "The sunset boat cruise on Lake Tana was pure magic. Pelicans, hippos, and ancient monasteries — all in one afternoon. Merci EthioWander!",
    avatar: "MD",
    tour: "Lake Tana Sunset Cruise",
  },
  {
    name: "Robert Osei",
    location: "Accra, Ghana",
    rating: 5,
    text: "As an African traveler, Ethiopia exceeded all my expectations. The coffee ceremony, the injera, Lalibela — everything was world-class. Proud of our continent!",
    avatar: "RO",
    tour: "Best of Ethiopia 12-Day",
  },
  {
    name: "Anna Kowalski",
    location: "Warsaw, Poland",
    rating: 5,
    text: "Solo female traveler here — I felt completely safe throughout my 10-day trip. The 24/7 support was real, not just marketing. They genuinely care.",
    avatar: "AK",
    tour: "Solo Explorer Package",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  const testimonial = testimonials[current];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("testimonials.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("testimonials.title")} <span className="text-gradient-gold italic">{t("testimonials.titleHighlight")}</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">{t("testimonials.ratingText")}</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass-card w-full rounded-3xl p-8 md:p-12 relative"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10" />

                <div className="flex gap-1 mb-1">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-body text-xs text-primary/70 font-medium">{testimonial.tour}</span>

                <p className="mt-5 font-body text-lg leading-relaxed text-muted-foreground italic md:text-xl">
                  "{testimonial.text}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 font-display text-lg font-bold text-primary ring-2 ring-primary/30">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">{testimonial.name}</p>
                    <p className="font-body text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-14 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary/80 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-14 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary/80 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
