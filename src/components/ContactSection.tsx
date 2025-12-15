import { useState } from "react";
import { Phone, Mail, Send, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { content } = useContent();
  const { contact } = content;
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: t.contact.toast.title,
      description: t.contact.toast.description,
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: contact.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-gradient-cyber">
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-magenta">{t.contact.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.contact.title}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full" />
            <p className="font-body text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-xl border border-border/50 hover:neon-border-cyan transition-all duration-300 group"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-center gap-4"
                      >
                        <div className="p-3 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                          <info.icon className="w-6 h-6 text-neon-cyan" />
                        </div>
                        <div>
                          <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                            {info.label}
                          </div>
                          <div className="font-body text-lg text-foreground group-hover:text-neon-cyan transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <info.icon className="w-6 h-6 text-neon-cyan" />
                        </div>
                        <div>
                          <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                            {info.label}
                          </div>
                          <div className="font-body text-lg text-foreground">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Decorative element */}
              <div className="hidden lg:block glass-card p-8 rounded-xl border border-border/50">
                <div className="font-display text-2xl font-bold mb-4">
                  <span className="text-gradient-neon">{contact.collaborationTitle}</span>
                </div>
                <p className="font-body text-muted-foreground">
                  {contact.collaborationText}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-6 md:p-8 rounded-xl neon-border-magenta">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="p-4 bg-neon-cyan/10 rounded-full mb-6 animate-pulse-neon">
                    <CheckCircle className="w-12 h-12 text-neon-cyan" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {t.contact.success.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {t.contact.success.message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      {t.contact.form.name}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      {t.contact.form.email}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      {t.contact.form.message}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body resize-none"
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="neonFilled"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        {t.contact.form.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t.contact.form.submit}
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
