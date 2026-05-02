import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WHATSAPP = "https://wa.me/251998900160?text=Hi%20Ethiopia%20Travel%20Explorer%2C%20I%27d%20like%20to%20plan%20a%20trip.";

const AboutFinalCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#0d4a8f] to-[#082f5c] p-8 text-center text-white shadow-2xl md:p-14"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Ready to Experience Ethiopia the Right Way?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-white/90 md:text-lg">
            Book directly with our local team and get a custom itinerary in minutes.
          </p>

          <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Book via WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              <Link to="/tours">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Instant Custom Trip Plan
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Speak to a Real Local Expert
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFinalCTA;
