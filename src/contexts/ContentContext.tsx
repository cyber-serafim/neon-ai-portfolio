import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { contentTranslations } from "@/data/translations";

export interface HeroContent {
  name: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
}

export interface AboutContent {
  description: string;
  personalInfo: { label: string; value: string }[];
  skills: string[];
  profilePhoto?: string;
}

export interface Experience {
  company: string;
  period: string;
  title: string;
  responsibilities: string[];
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface Certificate {
  name: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  collaborationTitle: string;
  collaborationText: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  experiences: Experience[];
  education: Education[];
  certificates: Certificate[];
  languages: Language[];
  contact: ContactInfo;
}

export interface BilingualContent {
  uk: SiteContent;
  en: SiteContent;
}

// Default content from translations
const defaultContentUk: SiteContent = contentTranslations.uk;
const defaultContentEn: SiteContent = contentTranslations.en;

const defaultBilingualContent: BilingualContent = {
  uk: defaultContentUk,
  en: defaultContentEn,
};

interface ContentContextType {
  content: SiteContent; // For backward compatibility - returns current language content
  bilingualContent: BilingualContent;
  updateContent: (newContent: SiteContent, lang?: "uk" | "en") => void;
  updateBilingualContent: (newContent: BilingualContent) => void;
  resetContent: (lang?: "uk" | "en") => void;
  getContent: (lang: "uk" | "en") => SiteContent;
}

const ContentContext = createContext<ContentContextType | null>(null);

const STORAGE_KEY = "site_content_bilingual";

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [bilingualContent, setBilingualContent] = useState<BilingualContent>(defaultBilingualContent);

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Handle migration from old single-language format
        if (parsed.hero) {
          // Old format - migrate to bilingual
          setBilingualContent({
            uk: parsed,
            en: defaultContentEn,
          });
        } else if (parsed.uk && parsed.en) {
          setBilingualContent(parsed);
        }
      } catch {
        console.error("Failed to parse saved content");
      }
    }
  }, []);

  const updateContent = (newContent: SiteContent, lang: "uk" | "en" = "uk") => {
    setBilingualContent((prev) => {
      const updated: BilingualContent = {
        ...prev,
        [lang]: newContent,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateBilingualContent = (newContent: BilingualContent) => {
    setBilingualContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const resetContent = (lang?: "uk" | "en") => {
    if (lang) {
      setBilingualContent((prev) => {
        const updated: BilingualContent = {
          ...prev,
          [lang]: lang === "uk" ? defaultContentUk : defaultContentEn,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      return;
    }

    setBilingualContent(defaultBilingualContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getContent = (lang: "uk" | "en"): SiteContent => {
    return bilingualContent[lang];
  };

  return (
    <ContentContext.Provider 
      value={{ 
        content: bilingualContent.uk, // Default to Ukrainian for backward compatibility
        bilingualContent,
        updateContent, 
        updateBilingualContent,
        resetContent,
        getContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};
