import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Phone, Mail, FileBadge } from "lucide-react";

const LicenseProof = () => {
  return (
    <section className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-card p-6 sm:p-10 shadow-md"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <ShieldCheck className="h-7 w-7" strokeWidth={2.4} />
            </div>
            <span className="mt-4 font-body text-xs tracking-widest text-primary uppercase font-semibold">
              Verified & Compliant
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Official & Licensed <span className="text-primary italic">Ethiopian Travel Agency</span>
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-muted-foreground max-w-2xl">
              Ethiopia Travel Explorer is officially registered with the Ethiopia Ministry of Culture
              & Tourism and operates in full compliance with national tourism standards, licensed
              guide requirements, and ethical travel guidelines.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <FileBadge className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted-foreground">License Number</p>
                <p className="font-display text-sm font-bold text-foreground">ET-TO-2026-458</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Office Location</p>
                <p className="font-display text-sm font-bold text-foreground">Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <a
              href="https://wa.me/251998900160"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition-colors"
            >
              <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted-foreground">WhatsApp / Phone</p>
                <p className="font-display text-sm font-bold text-foreground">+251 99 890 0160</p>
              </div>
            </a>
            <a
              href="mailto:info@ethiopiatravelexplorer.com"
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition-colors"
            >
              <Mail className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Email</p>
                <p className="font-display text-sm font-bold text-foreground break-all">
                  info@ethiopiatravelexplorer.com
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LicenseProof;
