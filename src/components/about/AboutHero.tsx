import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP = "https://wa.me/251998900160?text=Hi%20Ethiopia%20Travel%20Explorer%2C%20I%27d%20like%20to%20plan%20a%20trip.";

const badges = [
  { icon: ShieldCheck, text: "Licensed by Ethiopia Ministry of Culture & Tourism" },
  { icon: Star, text: "5-Star Rated by 500+ Travelers" },
  { icon: Clock, text: "24/7 Local Support" },
  { icon: MessageCircle, text: "Secure Booking via WhatsApp" },
];

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            About Us
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Ethiopia Travel Explorer — <span className="text-primary">Licensed Local Experts</span> in Authentic Ethiopian Journeys
          </h1>
          <p className="mt-6 font-body text-lg text-muted-foreground md:text-xl">
            We are a fully licensed travel agency based in Addis Ababa, crafting safe, authentic, and unforgettable tours across Ethiopia's ancient history, culture, and landscapes.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl border border-primary/20 bg-card/80 px-4 py-3 text-left shadow-sm backdrop-blur"
              >
                <b.icon className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{b.text}</span>
              </motion.div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="mt-10 bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              Plan Your Trip in 30 Seconds
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
