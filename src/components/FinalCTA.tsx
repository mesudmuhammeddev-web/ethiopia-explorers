import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import simien from "@/assets/simien-mountains.jpg";

const FinalCTA = () => {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border shadow-xl"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${simien})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

          {/* Content */}
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24 max-w-2xl">
            <span className="font-body text-xs sm:text-sm tracking-widest text-white/80 uppercase font-semibold">
              Your Adventure Awaits
            </span>
            <h2
              className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white leading-tight"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              Ready to Explore <span className="italic">Ethiopia?</span>
            </h2>
            <p
              className="mt-4 font-body text-base sm:text-lg text-white/90 max-w-lg"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
            >
              Chat with a local expert on WhatsApp now — get a custom itinerary and quote within minutes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="h-12 gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-body text-sm font-semibold text-accent-foreground shadow-xl hover:scale-[1.02] transition-transform"
              >
                <a
                  href="https://wa.me/251998900160?text=Hello!%20I'd%20like%20to%20plan%20my%20Ethiopia%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book via WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 gap-2 rounded-full border-white/40 bg-white/10 px-7 font-body text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                <Link to="/contact">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Trust micro-row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 font-body text-xs sm:text-sm">
              <span>✓ Replies within 1 hour</span>
              <span>✓ 100% customizable</span>
              <span>✓ No booking fees</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
