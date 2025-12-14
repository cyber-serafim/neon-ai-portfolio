import { GraduationCap, Award, Globe } from "lucide-react";

interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  icon: typeof GraduationCap;
}

interface Certificate {
  name: string;
  year: string;
}

interface Language {
  name: string;
  level: string;
  percentage: number;
}

const educations: Education[] = [
  {
    institution: "Міжнародний інститут бізнесу",
    degree: "Магістр",
    field: "Бізнес адміністрування",
    period: "2012 – 2015",
    icon: GraduationCap,
  },
  {
    institution: "Національний авіаційний університет",
    degree: "Спеціаліст",
    field: "Право, Кримінальне право",
    period: "2009 – 2012",
    icon: GraduationCap,
  },
  {
    institution: "Національний університет харчових технологій",
    degree: "Бакалавр",
    field: "Автоматизація та комп'ютерні системи",
    period: "2003 – 2008",
    icon: GraduationCap,
  },
];

const certificates: Certificate[] = [
  { name: "Побудова систем IP-телефонії", year: "2013" },
  { name: "Certificate Association of MBA accredited, MIB National MBA Program", year: "2015" },
];

const languages: Language[] = [
  { name: "Українська", level: "Вільно", percentage: 100 },
  { name: "Англійська", level: "Середній рівень", percentage: 60 },
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-magenta/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-cyan">Освіта</span>{" "}
              <span className="text-foreground">та навички</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education column */}
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-neon-cyan" />
                <span className="text-foreground">Освіта</span>
              </h3>
              
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-xl border border-border/50 hover:neon-border-cyan transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                        <edu.icon className="w-6 h-6 text-neon-cyan" />
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
                  <span className="text-foreground">Сертифікати</span>
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
                  <span className="text-foreground">Мови</span>
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
