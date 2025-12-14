import { MapPin, Calendar, Mail, Phone, User } from "lucide-react";

export const AboutSection = () => {
  const personalInfo = [
    { icon: User, label: "Ім'я", value: "Антон Падура" },
    { icon: MapPin, label: "Місто", value: "Київ, Україна" },
    { icon: Phone, label: "Телефон", value: "+380958777997" },
    { icon: Mail, label: "Email", value: "padura@proton.me" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-cyan/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-cyan">Про</span>{" "}
              <span className="text-foreground">мене</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Avatar/Visual */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full animate-pulse-neon" />
                <div className="absolute inset-4 border-2 border-neon-magenta/20 rounded-full animate-pulse-neon" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-8 border-2 border-neon-cyan/10 rounded-full animate-pulse-neon" style={{ animationDelay: "1s" }} />
                
                {/* Center content */}
                <div className="absolute inset-12 glass-card rounded-full flex items-center justify-center neon-border-cyan">
                  <div className="text-center p-6">
                    <div className="font-display text-6xl md:text-8xl font-bold text-gradient-neon mb-2">AP</div>
                    <div className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                      Security Expert
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Info */}
            <div className="space-y-8">
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
                IT-експерт з понад <span className="neon-text-cyan">15-річним досвідом</span> роботи в галузі 
                інформаційної безпеки, системного адміністрування та IT-менеджменту. Спеціалізуюся на 
                <span className="neon-text-magenta"> захисті корпоративних ресурсів</span>, розгортанні 
                безпечної інфраструктури та впровадженні сучасних рішень для бізнесу.
              </p>

              {/* Personal info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {personalInfo.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-xl group hover:neon-border-cyan transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                        <item.icon className="w-5 h-5 text-neon-cyan" />
                      </div>
                      <div>
                        <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="font-body text-foreground">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {["Інформаційна безпека", "Системне адміністрування", "IT-менеджмент", "DevOps", "Мережеві технології"].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 font-body text-sm border border-border rounded-full text-muted-foreground hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                  >
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
