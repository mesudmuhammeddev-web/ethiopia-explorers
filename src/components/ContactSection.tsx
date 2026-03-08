import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Send, Upload, X, FileText, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", whatsapp: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contactMethods = [
    { icon: MessageCircle, label: t("contact.whatsapp"), value: t("contact.whatsappValue"), action: "https://wa.me/251998900160", highlight: true },
    { icon: Phone, label: t("contact.phone"), value: "+251 99 890 0160", action: "tel:+251998900160" },
    { icon: Mail, label: t("contact.email"), value: "info@ethiopiatravelexplorer.com", action: "mailto:info@ethiopiatravelexplorer.com" },
    { icon: MapPin, label: t("contact.office"), value: t("contact.officeValue"), action: "#" },
  ];

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_inquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        whatsapp: formData.whatsapp || null,
        message: formData.message,
      });

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", whatsapp: "", message: "" });
      setFile(null);
      toast({ title: "Inquiry sent!", description: "We'll get back to you within 24 hours." });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Contact form error:", err);
      toast({ title: "Something went wrong", description: "Please try again or contact us via WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.size <= 5 * 1024 * 1024) {
      setFile(selected);
    }
  };

  const inputClass = "peer w-full rounded-xl border border-border bg-secondary/40 px-4 pt-6 pb-2 font-body text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClass = "pointer-events-none absolute left-4 top-2 font-body text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary";

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder=" " className={inputClass} />
                    <label className={labelClass}>{t("contact.nameLabel")}</label>
                  </div>
                  <div className="relative">
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder=" " className={inputClass} />
                    <label className={labelClass}>{t("contact.emailLabel")}</label>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder=" " className={inputClass} />
                    <label className={labelClass}>{t("contact.phoneLabel")}</label>
                  </div>
                  <div className="relative">
                    <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3 inline" /> WhatsApp
                      </span>
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={3} placeholder=" " className={`${inputClass} resize-none`} />
                  <label className={labelClass}>{t("contact.messageLabel")}</label>
                </div>

                {/* File upload */}
                <div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  {file ? (
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-body text-sm text-foreground flex-1 truncate">{file.name}</span>
                      <button type="button" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/20 px-4 py-3 font-body text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Attach document (passport, itinerary) — max 5MB
                    </button>
                  )}
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

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex-1 overflow-hidden rounded-2xl border border-border min-h-[280px]">
              <iframe
                src="https://maps.google.com/maps?q=9.0192,38.7525&z=13&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ethiopia Travel Explorer Office Location — Addis Ababa, Ethiopia"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
