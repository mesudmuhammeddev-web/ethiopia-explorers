import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  const contactMethods = [
    { icon: MessageCircle, label: t("contact.whatsapp"), value: t("contact.whatsappValue"), action: "https://wa.me/251900000000", highlight: true },
    { icon: Phone, label: t("contact.phone"), value: "+251 900 000 000", action: "tel:+251900000000" },
    { icon: Mail, label: t("contact.email"), value: "info@ethiowander.com", action: "mailto:info@ethiowander.com" },
    { icon: MapPin, label: t("contact.office"), value: t("contact.officeValue"), action: "#" },
  ];

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

        <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.action}
              target={method.action.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card hover-lift flex items-center gap-4 rounded-xl p-6 ${method.highlight ? "border-primary/30 ring-1 ring-primary/20" : ""}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                <method.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-body text-xs tracking-wider text-muted-foreground uppercase">{method.label}</p>
                <p className="mt-0.5 font-body text-sm font-semibold text-foreground">{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
