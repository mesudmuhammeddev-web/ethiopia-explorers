import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type MenuItem = { label: string; href: string };
type NavEntry = {
  key: string;
  label: string;
  href?: string;
  tagline?: string;
  items?: MenuItem[];
};

const navMenu: NavEntry[] = [
  {
    key: "experiences",
    label: "Experiences",
    tagline: "Inspiration — discover Ethiopia by region",
    items: [
      { label: "Northern Heritage", href: "/experiences/northern-heritage" },
      { label: "Danakil & Afar", href: "/contact?region=danakil" },
      { label: "Omo Valley", href: "/contact?region=omo" },
      { label: "Simien Mountains", href: "/contact?region=simien" },
      { label: "Bale Highlands", href: "/contact?region=bale" },
      { label: "Rift Valley", href: "/contact?region=rift-valley" },
      { label: "Harar & Eastern Ethiopia", href: "/contact?region=harar" },
      { label: "Addis Ababa", href: "/contact?region=addis" },
      { label: "Coffee Origin", href: "/contact?region=coffee" },
    ],
  },
  {
    key: "tours",
    label: "Tours",
    tagline: "Browse & book curated journeys",
    items: [
      { label: "All Tours", href: "/contact" },
      { label: "Day Trips", href: "/contact?type=day" },
      { label: "Multi-Day Tours", href: "/contact?type=multi-day" },
      { label: "Group Departures", href: "/contact?type=group" },
      { label: "Private Tours", href: "/contact?type=private" },
    ],
  },
  {
    key: "activities",
    label: "Activities",
    tagline: "Find your kind of adventure",
    items: [
      { label: "Trekking & Hiking", href: "/contact?activity=trekking" },
      { label: "Cultural Experiences", href: "/contact?activity=cultural" },
      { label: "Coffee Tours", href: "/contact?activity=coffee" },
      { label: "Wildlife & Safari", href: "/contact?activity=wildlife" },
      { label: "Birding", href: "/contact?activity=birding" },
      { label: "Festivals & Events", href: "/contact?activity=festivals" },
      { label: "Adventure", href: "/contact?activity=adventure" },
    ],
  },
  {
    key: "private",
    label: "Private Journeys",
    tagline: "Tailor-made luxury & special travel",
    items: [
      { label: "Tailor-Made Trips", href: "/contact?type=tailor-made" },
      { label: "Luxury Experiences", href: "/contact?type=luxury" },
      { label: "Honeymoon / Special Travel", href: "/contact?type=honeymoon" },
    ],
  },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

const languages = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "am", flag: "🇪🇹", label: "አማርኛ" },
];

const resolveLanguage = (lng: string): string => {
  const base = lng.split("-")[0].split("_")[0].toLowerCase();
  return languages.find((l) => l.code === base) ? base : "en";
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const activeLang = resolveLanguage(i18n.language);
  const currentLang = languages.find((l) => l.code === activeLang) || languages[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setLangOpen(false);
  };

  const isActive = (href?: string) => !!href && location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseLeave={() => setOpenMenu(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-3" : "bg-background py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ethiopia Travel Logo" className="h-10 w-auto" />
          <span className="text-lg font-bold text-primary tracking-tight hidden sm:inline">Ethiopia Travel Explorer</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navMenu.map((entry) => {
            if (!entry.items) {
              return (
                <Link
                  key={entry.key}
                  to={entry.href!}
                  onMouseEnter={() => setOpenMenu(null)}
                  className={`px-3 py-2 font-body text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isActive(entry.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {entry.label}
                </Link>
              );
            }
            const open = openMenu === entry.key;
            return (
              <div
                key={entry.key}
                className="relative"
                onMouseEnter={() => setOpenMenu(entry.key)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 font-body text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    open ? "text-primary" : "text-foreground"
                  }`}
                >
                  {entry.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="w-72 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
                        <div className="border-b border-border bg-secondary/40 px-5 py-3">
                          <p className="font-display text-sm font-semibold text-primary">{entry.label}</p>
                          {entry.tagline && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{entry.tagline}</p>
                          )}
                        </div>
                        <ul className="p-2">
                          {entry.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.href}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-lg px-3 py-2 font-body text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Language Switcher */}
          <div className="relative ml-2" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-body text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="h-3.5 w-3.5" />
              {currentLang.flag} {currentLang.label}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl glass-card min-w-[160px] shadow-lg"
                  role="listbox"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      role="option"
                      aria-selected={activeLang === lang.code}
                      className={`flex w-full items-center gap-2.5 px-4 py-2.5 font-body text-xs transition-colors hover:bg-secondary/80 ${
                        activeLang === lang.code ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1 text-left">{lang.label}</span>
                      {activeLang === lang.code && <Check className="h-3.5 w-3.5 text-primary" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            size="sm"
            onClick={() => navigate("/contact")}
            className="ml-2 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" />
            {t("nav.bookNow")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="text-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card mt-2 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 p-5 max-h-[75vh] overflow-y-auto">
              {navMenu.map((entry) => {
                if (!entry.items) {
                  return (
                    <Link
                      key={entry.key}
                      to={entry.href!}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-lg px-3 py-3 font-body text-base ${
                        isActive(entry.href) ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }
                const open = mobileSection === entry.key;
                return (
                  <div key={entry.key} className="border-b border-border/60 last:border-b-0">
                    <button
                      onClick={() => setMobileSection(open ? null : entry.key)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-body text-base text-foreground"
                    >
                      <span className="font-medium">{entry.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3"
                        >
                          {entry.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileSection(null);
                                }}
                                className="block rounded-lg px-3 py-2.5 font-body text-sm text-muted-foreground hover:text-primary"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile language switcher */}
              <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-border">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`flex-1 min-w-[60px] rounded-lg py-2.5 text-center font-body text-xs transition-all ${
                      activeLang === lang.code
                        ? "bg-primary text-primary-foreground font-semibold ring-2 ring-primary/30"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/contact");
                }}
                className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Phone className="h-3.5 w-3.5 mr-2" />
                {t("nav.bookNow")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
