import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    { icon: MessageCircle, label: t("contact.whatsapp"), value: t("contact.whatsappValue"), action: "https://wa.me/251900000000", highlight: true },
    { icon: Phone, label: t("contact.phone"), value: "+251 900 000 000", action: "tel:+251900000000" },
    { icon: Mail, label: t("contact.email"), value: "info@ethiowander.com", action: "mailto:info@ethiowander.com" },
    { icon: MapPin, label: t("contact.office"), value: t("contact.officeValue"), action: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="font-body text-sm tracking-widest text-primary uppercase">{t("contact.badge")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("contact.title")} <span className="text-gradient-gold italic">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-muted-foreground">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">{t("contact.formTitle")}</h3>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Send className="h-7 w-7" />
                </div>
                <h4 className="font-display text-lg font-bold text-foreground">{t("contact.thankYou")}</h4>
                <p className="mt-2 font-body text-sm text-muted-foreground">{t("contact.thankYouText")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-secondary/40 px-4 pt-6 pb-2 font-body text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 font-body text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                    {t("contact.nameLabel")}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-secondary/40 px-4 pt-6 pb-2 font-body text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 font-body text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                    {t("contact.emailLabel")}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-secondary/40 px-4 pt-6 pb-2 font-body text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 font-body text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                    {t("contact.phoneLabel")}
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-border bg-secondary/40 px-4 pt-6 pb-2 font-body text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  <label className="pointer-events-none absolute left-4 top-2 font-body text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
                    {t("contact.messageLabel")}
                  </label>
                </div>
                <Button type="submit" className="w-full gap-2 rounded-xl bg-primary py-3 font-body font-semibold text-primary-foreground hover:bg-gold-dark" style={{ background: "var(--gradient-gold)" }}>
                  <Send className="h-4 w-4" />
                  {t("contact.sendInquiry")}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Methods + Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method, i) => (
                <motion.a
                  key={method.label}
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card hover-lift flex items-center gap-4 rounded-xl p-5 ${method.highlight ? "border-primary/30 ring-1 ring-primary/20" : ""}`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${method.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-wider text-muted-foreground uppercase">{method.label}</p>
                    <p className="mt-0.5 font-body text-sm font-semibold text-foreground">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Google Map */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex-1 overflow-hidden rounded-2xl border border-border min-h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63056.82073884746!2d37.3563!3d11.5936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644d1a50b0dc96d%3A0x3132dc270e68c58c!2sBahir%20Dar%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EthioWander Office Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
