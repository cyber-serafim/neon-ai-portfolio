import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "uk" | "en";

interface Translations {
  nav: {
    about: string;
    experience: string;
    education: string;
    contact: string;
  };
  hero: {
    contactBtn: string;
    experienceBtn: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    securityExpert: string;
    labels: {
      name: string;
      city: string;
      phone: string;
      email: string;
    };
  };
  experience: {
    title: string;
    titleHighlight: string;
    viewProject: string;
  };
  education: {
    title: string;
    titleHighlight: string;
    educationTitle: string;
    certificates: string;
    languages: string;
  };
  contact: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    phone: string;
    email: string;
    location: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
    };
    success: {
      title: string;
      message: string;
    };
    toast: {
      title: string;
      description: string;
      errorTitle: string;
      errorDescription: string;
    };
  };
  footer: {
    createdWith: string;
    andTechnologies: string;
    backToTop: string;
  };
}

const translations: Record<Language, Translations> = {
  uk: {
    nav: {
      about: "Про мене",
      experience: "Досвід",
      education: "Освіта",
      contact: "Контакти",
    },
    hero: {
      contactBtn: "Зв'язатися",
      experienceBtn: "Мій досвід",
    },
    about: {
      title: "мене",
      titleHighlight: "Про",
      securityExpert: "Security Expert",
      labels: {
        name: "Ім'я",
        city: "Місто",
        phone: "Телефон",
        email: "Email",
      },
    },
    experience: {
      title: "роботи",
      titleHighlight: "Досвід",
      viewProject: "Переглянути проект",
    },
    education: {
      title: "та навички",
      titleHighlight: "Освіта",
      educationTitle: "Освіта",
      certificates: "Сертифікати",
      languages: "Мови",
    },
    contact: {
      title: "зі мною",
      titleHighlight: "Зв'язатися",
      subtitle: "Маєте пропозицію або питання? Заповніть форму або зв'яжіться напряму.",
      phone: "Телефон",
      email: "Email",
      location: "Локація",
      form: {
        name: "Ім'я",
        namePlaceholder: "Ваше ім'я",
        email: "Email",
        emailPlaceholder: "your@email.com",
        phone: "Телефон",
        phonePlaceholder: "+380 XX XXX XX XX",
        message: "Повідомлення",
        messagePlaceholder: "Ваше повідомлення...",
        submit: "Надіслати",
        sending: "Надсилання...",
      },
      success: {
        title: "Дякую!",
        message: "Ваше повідомлення успішно надіслано.",
      },
      toast: {
        title: "Повідомлення надіслано!",
        description: "Дякую за звернення. Я зв'яжуся з вами найближчим часом.",
        errorTitle: "Помилка",
        errorDescription: "Не вдалося надіслати повідомлення. Спробуйте ще раз.",
      },
    },
    footer: {
      createdWith: "Створено з",
      andTechnologies: "та технологіями.",
      backToTop: "На початок ↑",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      contactBtn: "Contact Me",
      experienceBtn: "My Experience",
    },
    about: {
      title: "me",
      titleHighlight: "About",
      securityExpert: "Security Expert",
      labels: {
        name: "Name",
        city: "City",
        phone: "Phone",
        email: "Email",
      },
    },
    experience: {
      title: "experience",
      titleHighlight: "Work",
      viewProject: "View Project",
    },
    education: {
      title: "& Skills",
      titleHighlight: "Education",
      educationTitle: "Education",
      certificates: "Certificates",
      languages: "Languages",
    },
    contact: {
      title: "with me",
      titleHighlight: "Connect",
      subtitle: "Have a proposal or question? Fill out the form or contact me directly.",
      phone: "Phone",
      email: "Email",
      location: "Location",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        phone: "Phone",
        phonePlaceholder: "+380 XX XXX XX XX",
        message: "Message",
        messagePlaceholder: "Your message...",
        submit: "Send",
        sending: "Sending...",
      },
      success: {
        title: "Thank you!",
        message: "Your message has been sent successfully.",
      },
      toast: {
        title: "Message sent!",
        description: "Thank you for reaching out. I will contact you soon.",
        errorTitle: "Error",
        errorDescription: "Failed to send message. Please try again.",
      },
    },
    footer: {
      createdWith: "Created with",
      andTechnologies: "and technologies.",
      backToTop: "Back to top ↑",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "site_language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("uk");

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLang && (savedLang === "uk" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
