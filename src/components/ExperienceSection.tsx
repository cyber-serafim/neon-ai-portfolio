import { useState } from "react";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const ExperienceSection = () => {
  const { content } = useContent();
  const { experiences } = content;
  const { t } = useLanguage();
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
              <span className="neon-text-magenta">{t.experience.titleHighlight}</span>{" "}
              <span className="text-foreground">{t.experience.title}</span>
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
                            {t.experience.viewProject}
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
