import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "destinations", href: "/destinations" },
  { key: "tours", href: "/tours" },
  { key: "experiences", href: "/tours" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
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
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setLangOpen(false);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-3" : "bg-background py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ethiopia Travel Logo" className="h-10 w-auto" />
          <span className="text-lg font-bold text-primary tracking-tight hidden sm:inline">Ethiopia Travel Explorer</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.href}
              className={`font-body text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
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
            onClick={() => navigate("/tours")}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" />
            {t("nav.bookNow")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="text-foreground md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="glass-card mt-2 overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body text-lg ${
                    isActive(link.href) ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
              {/* Mobile language switcher */}
              <div className="flex gap-2 pt-2 border-t border-border">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`flex-1 rounded-lg py-2.5 text-center font-body text-xs transition-all ${
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
                  navigate("/tours");
                }}
                className="bg-primary text-primary-foreground"
              >
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
