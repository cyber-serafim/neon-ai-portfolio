import { useState } from "react";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Experience {
  company: string;
  period: string;
  title: string;
  responsibilities: string[];
  link?: string;
}

const experiences: Experience[] = [
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
];

export const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden bg-gradient-cyber">
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-magenta">Досвід</span>{" "}
              <span className="text-foreground">роботи</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-magenta to-neon-cyan mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={cn(
                  "relative mb-8 md:mb-12",
                  index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute top-6 w-4 h-4 rounded-full border-2 border-neon-cyan bg-background z-10",
                    "left-0 -translate-x-1/2",
                    "md:left-1/2 md:-translate-x-1/2",
                    expandedIndex === index && "animate-glow-pulse"
                  )}
                />

                {/* Content card */}
                <div
                  className={cn(
                    "ml-8 md:ml-0",
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  )}
                >
                  <div
                    className={cn(
                      "glass-card rounded-xl overflow-hidden transition-all duration-500 cursor-pointer",
                      expandedIndex === index
                        ? "neon-border-cyan"
                        : "border border-border/50 hover:border-neon-cyan/50"
                    )}
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    {/* Header */}
                    <div className="p-4 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-neon-cyan" />
                            <span className="font-body text-sm text-neon-cyan">
                              {exp.period}
                            </span>
                          </div>
                          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
                            {exp.company}
                          </h3>
                          <p className="font-body text-muted-foreground">
                            {exp.title}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform duration-300",
                            expandedIndex === index && "rotate-180 text-neon-cyan"
                          )}
                        />
                      </div>
                    </div>

                    {/* Expandable content */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500",
                        expandedIndex === index ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-border/50">
                        <ul className="mt-4 space-y-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li
                              key={respIndex}
                              className="font-body text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 font-body text-sm text-neon-cyan hover:text-neon-magenta transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Переглянути проект
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
