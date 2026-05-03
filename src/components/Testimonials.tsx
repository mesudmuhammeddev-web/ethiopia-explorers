import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    country: "Spain",
    flag: "🇪🇸",
    rating: 5,
    text: "Everything was perfectly organized. Our guide felt like a friend, not just a guide. Ethiopia surprised me — this company made it unforgettable.",
    tour: "Northern Heritage Circuit",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Emily R.",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    text: "The Danakil Depression tour was unreal. Harsh environment, but the team handled everything professionally. I felt safe the whole time.",
    tour: "Danakil Depression Expedition",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Ahmed K.",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    rating: 5,
    text: "Fast replies on WhatsApp, clear pricing, no stress. This is how travel booking should be.",
    tour: "Harar Cultural Tour",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    name: "Marie D.",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    text: "Lalibela left me speechless. The team customized our itinerary twice without any fuss — true local experts who actually listen.",
    tour: "Lalibela & Gondar",
    avatar: "https://i.pravatar.cc/120?img=45",
  },
  {
    name: "Hiroshi T.",
    country: "Japan",
    flag: "🇯🇵",
    rating: 5,
    text: "Simien Mountains trek was the best part of our year. Camp setup, food, and the Gelada baboons — every detail handled.",
    tour: "Simien Mountains Trek",
    avatar: "https://i.pravatar.cc/120?img=68",
  },
  {
    name: "Anna K.",
    country: "Poland",
    flag: "🇵🇱",
    rating: 5,
    text: "Solo female traveler — I felt safe the entire trip. The 24/7 WhatsApp support is real, not just marketing.",
    tour: "Best of Ethiopia 10 Days",
    avatar: "https://i.pravatar.cc/120?img=49",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-body text-xs tracking-widest text-primary uppercase font-semibold">
            Verified Reviews
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Real stories from <span className="text-primary italic">real travelers</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">
              <strong className="text-foreground">4.9 / 5</strong> from 500+ verified travelers
            </span>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/10" />
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed text-foreground/90 flex-1">
                "{t.text}"
              </p>
              <p className="mt-3 font-body text-xs text-primary font-medium">{t.tour}</p>

              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold text-foreground flex items-center gap-1.5">
                    {t.name}
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    <span className="mr-1">{t.flag}</span>
                    {t.country}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
