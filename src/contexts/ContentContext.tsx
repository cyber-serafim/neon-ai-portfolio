import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const defaultContentUk: SiteContent = {
  hero: {
    name: "Антон Падура",
    title: "IT-спеціаліст",
    description: "15+ років досвіду в інформаційній безпеці, адмініструванні систем та IT-менеджменті",
    stats: [
      { value: "15+", label: "Років досвіду" },
      { value: "6+", label: "Компаній" },
      { value: "∞", label: "Проектів" },
    ],
  },
  about: {
    description: "IT-експерт з понад 15-річним досвідом роботи в галузі інформаційної безпеки, системного адміністрування та IT-менеджменту. Спеціалізуюся на захисті корпоративних ресурсів, розгортанні безпечної інфраструктури та впровадженні сучасних рішень для бізнесу.",
    personalInfo: [
      { label: "Ім'я", value: "Антон Падура" },
      { label: "Місто", value: "Київ, Україна" },
      { label: "Телефон", value: "+380958777997" },
      { label: "Email", value: "padura@proton.me" },
    ],
    skills: ["Інформаційна безпека", "Системне адміністрування", "IT-менеджмент", "DevOps", "Мережеві технології"],
  },
  experiences: [
    {
      company: "Digital Forensics Corporation",
      period: "08.2021 – 05.2025",
      title: "IT Security Specialist",
      responsibilities: [
        "Захист ресурсів, шифрування даних, аналітика інцидентів на базі ESET PROTECT",
        "Захист від витоку даних на базі DLP Safetica",
        "Планування заходів безпеки та виявлення вразливостей",
        "Сканування вразливостей (Tenable Nessus, Wireshark, Nmap)",
        "Адміністрування VMware, Proxmox, Veeam Backup",
        "AD, DNS, GPO, RemoteApp, TrueNAS, Firewall, MS Office 365, Azure",
        "Скриптинг (Python, PowerShell, bash)",
        "Розгортання RemoteApp для Magnet Forensics",
      ],
    },
    {
      company: 'ТОВ "ЛЮКСВЕНРІТЕЙЛ"',
      period: "06.2016 – 08.2021",
      title: "IT Manager / Security Lead",
      responsibilities: [
        "Розробка IT-стратегії та побудова інформаційної безпеки",
        "Забезпечення роботи та розвиток IT-інфраструктури",
        "Управління продуктом flirtandtan.com",
        "Адміністрування VMware, Proxmox, Hyper-V",
        "WEB-сервери (nginx, apache), Veeam Backup",
        "Системи відеоспостереження",
        "Розміщення серверів у Європі",
      ],
      link: "https://flirtandtan.com/",
    },
    {
      company: 'ПАТ "КБ "ГЕФЕСТ""',
      period: "08.2013 – 03.2015",
      title: "System Administrator",
      responsibilities: [
        "Впровадження посилення GSM",
        "Адміністрування відеоспостереження та контролю доступу",
        "Корпоративна телефонія на Asterisk",
        "Проектування СКС та інфраструктури",
        "Робота з Cisco, D-Link, MikroTik",
        "Адміністрування VDS та Unix/Linux",
      ],
    },
    {
      company: 'AT "КБ "СОЮЗ"',
      period: "06.2010 – 06.2016",
      title: "IT Specialist",
      responsibilities: [
        "Впровадження гібридної IP-телефонії (Asterisk, Tadiran Telecom, Panasonic)",
        "DLP на DeviceLock",
        "Корпоративна Wi-Fi (UniFi)",
        "Адміністрування ATC",
        "Скриптинг",
      ],
    },
    {
      company: "Heaven Group Multimedia Co. Ltd.",
      period: "08.2009 – 06.2010",
      title: "System Administrator",
      responsibilities: [
        "Побудова локальної мережі",
        "Моніторинг сервісів",
        "Резервне копіювання",
        "Адміністрування HP BladeSystem та StorageWorks",
        "Поштовий сервер",
      ],
    },
    {
      company: 'ТОВ "ЛАКІНЕТ"',
      period: "01.2008 – 08.2009",
      title: "Technical Support Engineer",
      responsibilities: [
        "Моніторинг сервісів",
        "Технічна підтримка",
        "Документація",
      ],
    },
  ],
  education: [
    {
      institution: "Міжнародний інститут бізнесу",
      degree: "Магістр",
      field: "Бізнес адміністрування",
      period: "2012 – 2015",
    },
    {
      institution: "Національний авіаційний університет",
      degree: "Спеціаліст",
      field: "Право, Кримінальне право",
      period: "2009 – 2012",
    },
    {
      institution: "Національний університет харчових технологій",
      degree: "Бакалавр",
      field: "Автоматизація та комп'ютерні системи",
      period: "2003 – 2008",
    },
  ],
  certificates: [
    { name: "Побудова систем IP-телефонії", year: "2013" },
    { name: "Certificate Association of MBA accredited, MIB National MBA Program", year: "2015" },
  ],
  languages: [
    { name: "Українська", level: "Вільно", percentage: 100 },
    { name: "Англійська", level: "Середній рівень", percentage: 60 },
  ],
  contact: {
    phone: "+380958777997",
    email: "padura@proton.me",
    location: "Київ, Україна",
    collaborationTitle: "Готовий до співпраці?",
    collaborationText: "Понад 15 років досвіду в IT-безпеці та адмініструванні систем. Працюю з компаніями різного масштабу — від стартапів до корпорацій.",
  },
};

const defaultContentEn: SiteContent = {
  hero: {
    name: "Anton Padura",
    title: "IT Specialist",
    description: "15+ years of experience in information security, systems administration and IT management",
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "6+", label: "Companies" },
      { value: "∞", label: "Projects" },
    ],
  },
  about: {
    description: "IT expert with over 15 years of experience in information security, system administration and IT management. I specialize in protecting corporate resources, deploying secure infrastructure and implementing modern solutions for business.",
    personalInfo: [
      { label: "Name", value: "Anton Padura" },
      { label: "City", value: "Kyiv, Ukraine" },
      { label: "Phone", value: "+380958777997" },
      { label: "Email", value: "padura@proton.me" },
    ],
    skills: ["Information Security", "System Administration", "IT Management", "DevOps", "Network Technologies"],
  },
  experiences: [
    {
      company: "Digital Forensics Corporation",
      period: "08.2021 – 05.2025",
      title: "IT Security Specialist",
      responsibilities: [
        "Resource protection, data encryption, incident analytics based on ESET PROTECT",
        "Data leak protection based on DLP Safetica",
        "Security planning and vulnerability detection",
        "Vulnerability scanning (Tenable Nessus, Wireshark, Nmap)",
        "Administration of VMware, Proxmox, Veeam Backup",
        "AD, DNS, GPO, RemoteApp, TrueNAS, Firewall, MS Office 365, Azure",
        "Scripting (Python, PowerShell, bash)",
        "Deployment of RemoteApp for Magnet Forensics",
      ],
    },
    {
      company: "LUXVENRETAIL LLC",
      period: "06.2016 – 08.2021",
      title: "IT Manager / Security Lead",
      responsibilities: [
        "IT strategy development and information security building",
        "Ensuring operation and development of IT infrastructure",
        "Product management flirtandtan.com",
        "Administration of VMware, Proxmox, Hyper-V",
        "WEB servers (nginx, apache), Veeam Backup",
        "Video surveillance systems",
        "Server hosting in Europe",
      ],
      link: "https://flirtandtan.com/",
    },
    {
      company: 'PJSC "CB "GEFEST"',
      period: "08.2013 – 03.2015",
      title: "System Administrator",
      responsibilities: [
        "GSM signal enhancement implementation",
        "Video surveillance and access control administration",
        "Corporate telephony on Asterisk",
        "SCS and infrastructure design",
        "Work with Cisco, D-Link, MikroTik",
        "VDS and Unix/Linux administration",
      ],
    },
    {
      company: 'JSC "CB "SOYUZ"',
      period: "06.2010 – 06.2016",
      title: "IT Specialist",
      responsibilities: [
        "Hybrid IP telephony implementation (Asterisk, Tadiran Telecom, Panasonic)",
        "DLP on DeviceLock",
        "Corporate Wi-Fi (UniFi)",
        "PBX administration",
        "Scripting",
      ],
    },
    {
      company: "Heaven Group Multimedia Co. Ltd.",
      period: "08.2009 – 06.2010",
      title: "System Administrator",
      responsibilities: [
        "Local network building",
        "Service monitoring",
        "Backup",
        "HP BladeSystem and StorageWorks administration",
        "Mail server",
      ],
    },
    {
      company: "LAKINET LLC",
      period: "01.2008 – 08.2009",
      title: "Technical Support Engineer",
      responsibilities: [
        "Service monitoring",
        "Technical support",
        "Documentation",
      ],
    },
  ],
  education: [
    {
      institution: "International Institute of Business",
      degree: "Master",
      field: "Business Administration",
      period: "2012 – 2015",
    },
    {
      institution: "National Aviation University",
      degree: "Specialist",
      field: "Law, Criminal Law",
      period: "2009 – 2012",
    },
    {
      institution: "National University of Food Technologies",
      degree: "Bachelor",
      field: "Automation and Computer Systems",
      period: "2003 – 2008",
    },
  ],
  certificates: [
    { name: "IP Telephony Systems Building", year: "2013" },
    { name: "Certificate Association of MBA accredited, MIB National MBA Program", year: "2015" },
  ],
  languages: [
    { name: "Ukrainian", level: "Fluent", percentage: 100 },
    { name: "English", level: "Intermediate", percentage: 60 },
  ],
  contact: {
    phone: "+380958777997",
    email: "padura@proton.me",
    location: "Kyiv, Ukraine",
    collaborationTitle: "Ready to collaborate?",
    collaborationText: "Over 15 years of experience in IT security and system administration. Working with companies of all sizes — from startups to corporations.",
  },
};

const defaultBilingualContent: BilingualContent = {
  uk: defaultContentUk,
  en: defaultContentEn,
};

interface ContentContextType {
  content: BilingualContent;
  updateContent: (newContent: BilingualContent) => void;
  updateLanguageContent: (lang: "uk" | "en", newContent: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

const STORAGE_KEY = "site_content_bilingual";

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<BilingualContent>(defaultBilingualContent);

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch {
        console.error("Failed to parse saved content");
      }
    }
  }, []);

  const updateContent = (newContent: BilingualContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const updateLanguageContent = (lang: "uk" | "en", newContent: SiteContent) => {
    const updated = { ...content, [lang]: newContent };
    setContent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const resetContent = () => {
    setContent(defaultBilingualContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateLanguageContent, resetContent }}>
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
