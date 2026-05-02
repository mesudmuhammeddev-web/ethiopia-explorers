import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Users, Leaf } from "lucide-react";

const compliance = [
  { icon: FileCheck, text: "National tourism standards" },
  { icon: Users, text: "Licensed guide requirements" },
  { icon: Leaf, text: "Ethical travel guidelines" },
];

const LicensedSection = () => {
  return (
    <section className="bg-primary py-20 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-white/80">
            Trust & Legal
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Fully Licensed Ethiopian Travel Agency
          </h2>
          <p className="mt-4 font-body text-white/90 md:text-lg">
            Ethiopia Travel Explorer is officially registered and licensed under Ethiopian tourism regulations.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {compliance.map((c) => (
              <div key={c.text} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <c.icon className="mx-auto h-7 w-7" />
                <p className="mt-3 font-body text-sm font-medium">{c.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LicensedSection;
