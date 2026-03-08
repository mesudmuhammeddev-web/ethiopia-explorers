import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const destinations = ["Lake Tana", "Lalibela", "Simien Mountains", "Danakil Depression", "Gondar", "Axum", "Omo Valley", "Harar"];

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const quickLinks = [
    { label: t("footer.bespokeTours"), href: "#tours" },
    { label: t("nav.destinations"), href: "#destinations" },
    { label: t("nav.experiences"), href: "#experiences" },
    { label: t("footer.travelGuide"), href: "#" },
    { label: t("footer.aboutUs"), href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="border-b border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {t("footer.newsletterTitle")} <span className="text-gradient-gold italic">{t("footer.newsletterHighlight")}</span>
            </h3>
            <p className="mt-1 font-body text-sm text-muted-foreground">{t("footer.newsletterSubtitle")}</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex w-full max-w-md gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("footer.emailPlaceholder")} className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
            <Button type="submit" className="gap-2 bg-primary text-primary-foreground hover:bg-gold-dark">
              <Send className="h-4 w-4" />
              {t("footer.subscribe")}
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="font-display text-2xl font-bold text-foreground">Ethio<span className="text-gradient-gold">Wander</span></a>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">{t("footer.aboutText")}</p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon) => (
                <a key={Icon.displayName} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">{t("footer.quickLinks")}</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}><a href={link.href} className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">{t("footer.topDestinations")}</h4>
            <ul className="mt-4 space-y-3">
              {destinations.map((dest) => (
                <li key={dest}><a href="#destinations" className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">{dest}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">{t("footer.contactUs")}</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="font-body text-sm text-muted-foreground">Bahir Dar, Ethiopia<br />{t("footer.addisOffice")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+251998900160" className="font-body text-sm text-muted-foreground hover:text-primary">+251 99 890 0160</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@ethiowander.com" className="font-body text-sm text-muted-foreground hover:text-primary">info@ethiowander.com</a>
              </li>
            </ul>
            <div className="mt-6 rounded-lg bg-primary/10 p-3">
              <p className="font-body text-xs font-medium text-primary">🕐 {t("footer.hours")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row">
          <p className="font-body text-xs text-muted-foreground">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">{t("footer.privacy")}</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">{t("footer.terms")}</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">{t("footer.cancellation")}</a>
          </div>
        </div>

        {/* Built by */}
        <div className="border-t border-border mt-4 sm:mt-6 pt-4 pb-4 text-center px-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Built by <span className="font-semibold text-foreground">Mesud</span> and <span className="font-semibold text-foreground">Amanuel Technologies</span> · <a href="tel:+251905517626" className="text-primary hover:underline">+251 90 551 7626</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
