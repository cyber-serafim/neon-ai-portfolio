import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "uk" ? "en" : "uk");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-body text-xs tracking-wider">
        {language === "uk" ? "EN" : "UA"}
      </span>
    </Button>
  );
};
