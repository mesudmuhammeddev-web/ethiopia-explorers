import { Check } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  "No hidden fees",
  "Free itinerary changes",
  "Safe & verified guides",
  "Pay on arrival available",
  "Flexible cancellation",
  "100% local team",
];

const MicroTrust = () => {
  return (
    <section className="py-10 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default MicroTrust;
