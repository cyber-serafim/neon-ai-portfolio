import { ChevronDown, Shield, Server, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { content } = useContent();
  const { hero } = content;
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating icons */}
          <div className="flex justify-center gap-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="p-4 glass-card rounded-xl neon-border-cyan animate-float">
              <Shield className="w-8 h-8 text-neon-cyan" />
            </div>
            <div className="p-4 glass-card rounded-xl neon-border-magenta animate-float" style={{ animationDelay: "-2s" }}>
              <Server className="w-8 h-8 text-neon-magenta" />
            </div>
            <div className="p-4 glass-card rounded-xl neon-border-cyan animate-float" style={{ animationDelay: "-4s" }}>
              <Lock className="w-8 h-8 text-neon-cyan" />
            </div>
          </div>

          {/* Name */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="text-gradient-neon">{hero.name}</span>
          </h1>

          {/* Title */}
          <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <span className="inline-block font-display text-xl md:text-2xl lg:text-3xl text-foreground/90 border-l-4 border-neon-cyan pl-4">
              {hero.title}
            </span>
          </div>

          {/* Description */}
          <p className="font-body text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
            <Button
              variant="neonFilled"
              size="xl"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.contactBtn}
            </Button>
            <Button
              variant="neonCyan"
              size="xl"
              onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.experienceBtn}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            {hero.stats.map((stat, index) => (
              <div key={index} className="glass-card p-4 md:p-6 rounded-xl">
                <div className="font-display text-2xl md:text-4xl font-bold neon-text-cyan mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};
