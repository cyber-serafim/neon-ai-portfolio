import { useState } from "react";
import { Phone, Mail, Send, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/contexts/ContentContext";

export const ContactSection = () => {
  const { content } = useContent();
  const { contact } = content;
  
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
      title: "Повідомлення надіслано!",
      description: "Дякую за звернення. Я зв'яжуся з вами найближчим часом.",
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
      label: "Телефон",
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Локація",
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
              <span className="neon-text-magenta">Зв'язатися</span>{" "}
              <span className="text-foreground">зі мною</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full" />
            <p className="font-body text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Маєте пропозицію або питання? Заповніть форму або зв'яжіться напряму.
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
                    Дякую!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Ваше повідомлення успішно надіслано.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      Ім'я
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                      placeholder="Ваше ім'я"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                      Повідомлення
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body resize-none"
                      placeholder="Ваше повідомлення..."
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
                        Надсилання...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Надіслати
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
