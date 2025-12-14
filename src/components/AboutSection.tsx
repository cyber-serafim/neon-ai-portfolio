import { MapPin, Mail, Phone, User } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const iconMap: Record<string, typeof User> = {
  "Ім'я": User,
  "Місто": MapPin,
  "Телефон": Phone,
  "Email": Mail,
};

export const AboutSection = () => {
  const { content } = useContent();
  const { about } = content;

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
                {about.description}
              </p>

              {/* Personal info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {about.personalInfo.map((item, index) => {
                  const IconComponent = iconMap[item.label] || User;
                  return (
                    <div
                      key={index}
                      className="glass-card p-4 rounded-xl group hover:neon-border-cyan transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg group-hover:bg-neon-cyan/10 transition-colors">
                          <IconComponent className="w-5 h-5 text-neon-cyan" />
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
                  );
                })}
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill, index) => (
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
