import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { contentTranslations } from "@/data/translations";
import { SiteContent } from "@/contexts/ContentContext";

export const useTranslatedContent = (): SiteContent => {
  const { language } = useLanguage();
  const { getContent, bilingualContent } = useContent();
  
  // Get content for the current language
  const currentContent = getContent(language);
  
  // Get default content for the current language
  const defaultContent = contentTranslations[language];
  
  // Check if content was customized (different from default for current language)
  const isCustomContent = JSON.stringify(currentContent) !== JSON.stringify(defaultContent);
  
  // If content was customized, use stored content; otherwise use default translations
  if (isCustomContent) {
    return currentContent;
  }
  
  return contentTranslations[language];
};
