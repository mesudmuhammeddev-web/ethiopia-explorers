const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <a href="#" className="font-display text-xl font-bold text-foreground">
          Ethio<span className="text-gradient-gold">Wander</span>
        </a>
        <div className="flex gap-6">
          {["Destinations", "Tours", "About", "Contact"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 EthioWander. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
