import { SiteContent } from "@/contexts/ContentContext";
import { ChevronDown, Shield, Server, Lock, MapPin, Mail, Phone, User, Briefcase, GraduationCap, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreviewProps {
  content: SiteContent;
  language: "uk" | "en";
}

// Static translations for preview mode
const previewT = {
  uk: {
    hero: { contactBtn: "Зв'язатися", experienceBtn: "Досвід роботи" },
    about: { titleHighlight: "Про", title: "мене", securityExpert: "Експерт з безпеки" },
    experience: { titleHighlight: "Досвід", title: "роботи", viewProject: "Переглянути проєкт" },
    education: { titleHighlight: "Освіта", title: "та навички", educationTitle: "Освіта", certificates: "Сертифікати", languages: "Мови" },
    contact: { titleHighlight: "Контакти", title: "та зв'язок", subtitle: "Готовий до нових викликів", phone: "Телефон", email: "Email", location: "Локація" },
  },
  en: {
    hero: { contactBtn: "Contact", experienceBtn: "Experience" },
    about: { titleHighlight: "About", title: "me", securityExpert: "Security Expert" },
    experience: { titleHighlight: "Work", title: "Experience", viewProject: "View Project" },
    education: { titleHighlight: "Education", title: "& Skills", educationTitle: "Education", certificates: "Certificates", languages: "Languages" },
    contact: { titleHighlight: "Contact", title: "Information", subtitle: "Ready for new challenges", phone: "Phone", email: "Email", location: "Location" },
  },
};

export const PreviewHeroSection = ({ content, language }: PreviewProps) => {
  const { hero } = content;
  const t = previewT[language];

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden cyber-grid">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-neon-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-magenta/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="p-3 glass-card rounded-xl neon-border-cyan">
              <Shield className="w-6 h-6 text-neon-cyan" />
            </div>
            <div className="p-3 glass-card rounded-xl neon-border-magenta">
              <Server className="w-6 h-6 text-neon-magenta" />
            </div>
            <div className="p-3 glass-card rounded-xl neon-border-cyan">
              <Lock className="w-6 h-6 text-neon-cyan" />
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient-neon">{hero.name}</span>
          </h1>

          <div className="mb-4">
            <span className="inline-block font-display text-lg md:text-xl text-foreground/90 border-l-4 border-neon-cyan pl-3">
              {hero.title}
            </span>
          </div>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button variant="neonFilled" size="lg">{t.hero.contactBtn}</Button>
            <Button variant="neonCyan" size="lg">{t.hero.experienceBtn}</Button>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {hero.stats.map((stat, index) => (
              <div key={index} className="glass-card p-3 md:p-4 rounded-xl">
                <div className="font-display text-xl md:text-2xl font-bold neon-text-cyan mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PreviewAboutSection = ({ content, language }: PreviewProps) => {
  const { about } = content;
  const t = previewT[language];

  const getIconForLabel = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("name") || lowerLabel.includes("ім'я")) return User;
    if (lowerLabel.includes("city") || lowerLabel.includes("місто")) return MapPin;
    if (lowerLabel.includes("phone") || lowerLabel.includes("телефон")) return Phone;
    if (lowerLabel.includes("email")) return Mail;
    return User;
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              <span className="neon-text-cyan">{t.about.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.about.title}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="aspect-square max-w-xs mx-auto relative">
                <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full" />
                <div className="absolute inset-4 border-2 border-neon-magenta/20 rounded-full" />
                <div className="absolute inset-8 glass-card rounded-full flex items-center justify-center neon-border-cyan overflow-hidden">
                  {about.profilePhoto ? (
                    <img src={about.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-neon mb-1">AP</div>
                      <div className="font-body text-xs text-muted-foreground uppercase tracking-widest">
                        {t.about.securityExpert}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {about.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {about.personalInfo.map((item, index) => {
                  const IconComponent = getIconForLabel(item.label);
                  return (
                    <div key={index} className="glass-card p-3 rounded-xl group hover:neon-border-cyan transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                          <IconComponent className="w-4 h-4 text-neon-cyan" />
                        </div>
                        <div>
                          <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                          <div className="font-body text-sm text-foreground">{item.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 font-body text-xs border border-border rounded-full text-muted-foreground hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PreviewExperienceSection = ({ content, language }: PreviewProps) => {
  const { experiences } = content;
  const t = previewT[language];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-12 relative overflow-hidden bg-gradient-cyber">
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              <span className="neon-text-magenta">{t.experience.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.experience.title}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan transform md:-translate-x-1/2" />

            {experiences.slice(0, 3).map((exp, index) => (
              <div key={index} className={cn("relative mb-6", index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto")}>
                <div className={cn("absolute top-4 w-3 h-3 rounded-full border-2 border-neon-cyan bg-background z-10", "left-0 -translate-x-1/2", "md:left-1/2 md:-translate-x-1/2")} />

                <div className={cn("ml-6 md:ml-0", index % 2 === 0 ? "md:mr-8" : "md:ml-8")}>
                  <div className={cn("glass-card rounded-xl overflow-hidden transition-all duration-500 cursor-pointer", expandedIndex === index ? "neon-border-cyan" : "border border-border/50 hover:border-neon-cyan/50")}
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-3 h-3 text-neon-cyan" />
                            <span className="font-body text-xs text-neon-cyan">{exp.period}</span>
                          </div>
                          <h3 className="font-display text-base font-bold text-foreground mb-1">{exp.company}</h3>
                          <p className="font-body text-sm text-muted-foreground">{exp.title}</p>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", expandedIndex === index && "rotate-180 text-neon-cyan")} />
                      </div>
                    </div>

                    <div className={cn("overflow-hidden transition-all duration-500", expandedIndex === index ? "max-h-48" : "max-h-0")}>
                      <div className="px-4 pb-4 border-t border-border/50">
                        <ul className="mt-3 space-y-1">
                          {exp.responsibilities.slice(0, 3).map((resp, respIndex) => (
                            <li key={respIndex} className="font-body text-xs text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-neon-cyan mt-1.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PreviewEducationSection = ({ content, language }: PreviewProps) => {
  const { education, certificates, languages } = content;
  const t = previewT[language];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              <span className="neon-text-cyan">{t.education.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.education.title}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-neon-cyan" />
                <span className="text-foreground">{t.education.educationTitle}</span>
              </h3>
              
              <div className="space-y-4">
                {education.slice(0, 2).map((edu, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl border border-border/50 hover:neon-border-cyan transition-all duration-300 group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                        <GraduationCap className="w-5 h-5 text-neon-cyan" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body text-xs text-neon-cyan mb-1">{edu.period}</div>
                        <h4 className="font-display text-sm font-bold text-foreground mb-1">{edu.institution}</h4>
                        <p className="font-body text-xs text-muted-foreground">{edu.degree} • {edu.field}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-neon-magenta" />
                  <span className="text-foreground">{t.education.certificates}</span>
                </h3>
                
                <div className="space-y-3">
                  {certificates.slice(0, 3).map((cert, index) => (
                    <div key={index} className="glass-card p-3 rounded-xl border border-border/50 hover:neon-border-magenta transition-all duration-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta" />
                        <span className="font-body text-sm text-foreground">{cert.name}</span>
                      </div>
                      <span className="font-body text-xs text-muted-foreground flex-shrink-0">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-neon-purple" />
                  <span className="text-foreground">{t.education.languages}</span>
                </h3>
                
                <div className="space-y-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="glass-card p-3 rounded-xl border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm font-semibold text-foreground">{lang.name}</span>
                        <span className="font-body text-xs text-muted-foreground">{lang.level}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${lang.percentage}%`, background: `linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PreviewContactSection = ({ content, language }: PreviewProps) => {
  const { contact } = content;
  const t = previewT[language];

  const contactInfo = [
    { icon: Phone, label: t.contact.phone, value: contact.phone },
    { icon: Mail, label: t.contact.email, value: contact.email },
    { icon: MapPin, label: t.contact.location, value: contact.location },
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-gradient-cyber">
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              <span className="neon-text-magenta">{t.contact.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.contact.title}</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full" />
            <p className="font-body text-base text-muted-foreground mt-4">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="glass-card p-4 rounded-xl border border-border/50 hover:neon-border-cyan transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                      <info.icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">{info.label}</div>
                      <div className="font-body text-sm text-foreground group-hover:text-neon-cyan transition-colors">{info.value}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="glass-card p-6 rounded-xl border border-border/50">
                <div className="font-display text-lg font-bold mb-2">
                  <span className="text-gradient-neon">{contact.collaborationTitle}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{contact.collaborationText}</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl neon-border-magenta flex items-center justify-center min-h-[300px]">
              <p className="font-body text-muted-foreground text-center">
                {language === "uk" ? "Тут буде контактна форма" : "Contact form will be here"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};