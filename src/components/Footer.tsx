import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative py-8 border-t border-border/50">
      {/* Neon line animation */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div 
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          style={{
            animation: "border-flow 3s ease infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="font-display text-xl font-bold neon-text-cyan animate-pulse-neon">
            AP<span className="text-neon-magenta">_</span>
          </div>

          {/* Copyright */}
          <div className="font-body text-sm text-muted-foreground flex items-center gap-2">
            <span>© {currentYear} CyberSecurity Ukraine.</span>
            <span className="hidden md:inline">{t.footer.createdWith}</span>
            <Heart className="w-4 h-4 text-neon-magenta hidden md:inline animate-pulse" />
            <span className="hidden md:inline">{t.footer.andTechnologies}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin link */}
            <Link
              to="/login"
              className="font-body text-sm text-muted-foreground hover:text-neon-magenta transition-colors"
            >
             
            </Link>
            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-body text-sm text-muted-foreground hover:text-neon-cyan transition-colors uppercase tracking-wider"
            >
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
