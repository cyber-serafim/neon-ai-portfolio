import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { contentTranslations } from "@/data/translations";
import { SiteContent } from "@/contexts/ContentContext";

export const useTranslatedContent = (): SiteContent => {
  const { language } = useLanguage();
  const { content } = useContent();
  
  // Check if content was customized (different from default Ukrainian)
  const isCustomContent = JSON.stringify(content) !== JSON.stringify(contentTranslations.uk);
  
  // If content was customized, use it; otherwise use translated content
  if (isCustomContent) {
    return content;
  }
  
  return contentTranslations[language];
};
