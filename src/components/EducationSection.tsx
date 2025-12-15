import { GraduationCap, Award, Globe } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const EducationSection = () => {
  const { content } = useContent();
  const { education, certificates, languages } = content;
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-magenta/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-cyan">{t.education.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.education.title}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education column */}
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-neon-cyan" />
                <span className="text-foreground">{t.education.educationTitle}</span>
              </h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-xl border border-border/50 hover:neon-border-cyan transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                        <GraduationCap className="w-6 h-6 text-neon-cyan" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body text-sm text-neon-cyan mb-1">
                          {edu.period}
                        </div>
                        <h4 className="font-display text-lg font-bold text-foreground mb-1">
                          {edu.institution}
                        </h4>
                        <p className="font-body text-muted-foreground">
                          {edu.degree} • {edu.field}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates & Languages column */}
            <div className="space-y-12">
              {/* Certificates */}
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                  <Award className="w-6 h-6 text-neon-magenta" />
                  <span className="text-foreground">{t.education.certificates}</span>
                </h3>
                
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="glass-card p-4 rounded-xl border border-border/50 hover:neon-border-magenta transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-neon-magenta" />
                        <span className="font-body text-foreground">{cert.name}</span>
                      </div>
                      <span className="font-body text-sm text-muted-foreground flex-shrink-0">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-neon-purple" />
                  <span className="text-foreground">{t.education.languages}</span>
                </h3>
                
                <div className="space-y-6">
                  {languages.map((lang, index) => (
                    <div key={index} className="glass-card p-4 rounded-xl border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-body font-semibold text-foreground">
                          {lang.name}
                        </span>
                        <span className="font-body text-sm text-muted-foreground">
                          {lang.level}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${lang.percentage}%`,
                            background: `linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))`,
                            boxShadow: "0 0 10px hsl(180 100% 50% / 0.5)",
                          }}
                        />
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
