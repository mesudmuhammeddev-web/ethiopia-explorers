import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

const HelpPopup = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleClick = () => {
    setVisible(false);
    setDismissed(true);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={handleClick}
          className="fixed bottom-24 right-6 z-50 max-w-xs cursor-pointer rounded-2xl border border-gold/20 bg-gradient-to-br from-primary/95 to-primary-foreground/10 p-5 shadow-2xl backdrop-blur-xl sm:max-w-sm"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-full p-1 text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Need help planning your Ethiopia adventure?
              </p>
              <p className="mt-1 text-xs text-white/70">
                Click here to reach our travel experts ✨
              </p>
            </div>
          </div>

          <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gold/60"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 15, ease: "linear" }}
              onAnimationComplete={() => {
                setVisible(false);
                setDismissed(true);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpPopup;
