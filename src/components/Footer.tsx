import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const destinations = [
  "Lake Tana", "Lalibela", "Simien Mountains", "Danakil Depression",
  "Gondar", "Axum", "Omo Valley", "Harar",
];

const quickLinks = [
  { label: "Bespoke Tours", href: "#tours" },
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experiences" },
  { label: "Tour Comparison", href: "#compare" },
  { label: "Travel Guide", href: "#" },
  { label: "About Us", href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border bg-secondary/20">
      {/* Newsletter banner */}
      <div className="border-b border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Get Travel <span className="text-gradient-gold italic">Inspiration</span>
            </h3>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Join 2,000+ travelers receiving our best Ethiopia travel tips & exclusive offers.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex w-full max-w-md gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <Button type="submit" className="gap-2 bg-primary text-primary-foreground hover:bg-gold-dark">
              <Send className="h-4 w-4" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-2xl font-bold text-foreground">
              Ethio<span className="text-gradient-gold">Wander</span>
            </a>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
              A fully licensed travel agency based in Addis Ababa, crafting bespoke tours across
              Ethiopia's rich history, culture, and breathtaking landscapes since 2018.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={Icon.displayName}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
              Top Destinations
            </h4>
            <ul className="mt-4 space-y-3">
              {destinations.map((dest) => (
                <li key={dest}>
                  <a
                    href="#destinations"
                    className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="font-body text-sm text-muted-foreground">
                  Bahir Dar, Ethiopia<br />Addis Ababa Office Available
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+251900000000" className="font-body text-sm text-muted-foreground hover:text-primary">
                  +251 900 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@ethiowander.com" className="font-body text-sm text-muted-foreground hover:text-primary">
                  info@ethiowander.com
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-lg bg-primary/10 p-3">
              <p className="font-body text-xs font-medium text-primary">
                🕐 Mon–Sat: 8:00 AM – 7:00 PM (EAT)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 EthioWander. All rights reserved. Licensed by Ethiopia Ministry of Culture & Tourism.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">Terms of Service</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
