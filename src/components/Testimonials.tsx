import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "The Lake Tana boat tour was absolutely magical. Our guide knew every hidden monastery and the sunset was unforgettable. Best travel experience of my life!",
    avatar: "SM",
  },
  {
    name: "James Okonkwo",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Blue Nile Falls took my breath away. The hiking trail was well-organized and our guide shared fascinating stories about the local culture. Highly recommend!",
    avatar: "JO",
  },
  {
    name: "Elena Rossi",
    location: "Milan, Italy",
    rating: 5,
    text: "From the ancient churches of Lalibela to the castles of Gondar, every moment felt like stepping back in time. EthioWander made it all seamless.",
    avatar: "ER",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("testimonials.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("testimonials.title")} <span className="text-gradient-gold italic">{t("testimonials.titleHighlight")}</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-primary text-primary" />))}
            </div>
            <span className="font-body text-sm text-muted-foreground">{t("testimonials.ratingText")}</span>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card hover-lift rounded-2xl p-6">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, j) => (<Star key={j} className="h-4 w-4 fill-primary text-primary" />))}
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground italic">"{testimonial.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-display text-sm font-bold text-primary">{testimonial.avatar}</div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
