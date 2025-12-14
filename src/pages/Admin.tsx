import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Save, RotateCcw, Home, ChevronDown, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useContent, SiteContent, Experience, Education, Certificate, Language } from "@/contexts/ContentContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Admin = () => {
  const { logout } = useAuth();
  const { content, updateContent, resetContent } = useContent();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editedContent, setEditedContent] = useState<SiteContent>(content);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const handleSave = () => {
    updateContent(editedContent);
    toast({
      title: "Збережено!",
      description: "Всі зміни успішно збережено.",
    });
  };

  const handleReset = () => {
    resetContent();
    setEditedContent(content);
    toast({
      title: "Скинуто!",
      description: "Контент відновлено до початкових значень.",
    });
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sections = [
    { id: "hero", label: "Головна секція" },
    { id: "about", label: "Про мене" },
    { id: "experience", label: "Досвід роботи" },
    { id: "education", label: "Освіта" },
    { id: "certificates", label: "Сертифікати" },
    { id: "languages", label: "Мови" },
    { id: "contact", label: "Контакти" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold neon-text-cyan">
            Адмін панель
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              На сайт
            </Button>
            <Button variant="neonCyan" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Зберегти
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Скинути
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Вийти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="glass-card rounded-xl p-4 sticky top-24">
              <h2 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Секції
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-all",
                        activeSection === section.id
                          ? "bg-neon-cyan/10 text-neon-cyan neon-border-cyan"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-xl p-6">
              {/* Hero Section */}
              {activeSection === "hero" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Головна секція
                  </h2>
                  
                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Ім'я</label>
                    <Input
                      value={editedContent.hero.name}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        hero: { ...editedContent.hero, name: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Заголовок</label>
                    <Input
                      value={editedContent.hero.title}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        hero: { ...editedContent.hero, title: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Опис</label>
                    <Textarea
                      value={editedContent.hero.description}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        hero: { ...editedContent.hero, description: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-4">Статистика</label>
                    {editedContent.hero.stats.map((stat, index) => (
                      <div key={index} className="flex gap-4 mb-3">
                        <Input
                          placeholder="Значення"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...editedContent.hero.stats];
                            newStats[index].value = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              hero: { ...editedContent.hero, stats: newStats }
                            });
                          }}
                          className="bg-muted w-1/3"
                        />
                        <Input
                          placeholder="Підпис"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...editedContent.hero.stats];
                            newStats[index].label = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              hero: { ...editedContent.hero, stats: newStats }
                            });
                          }}
                          className="bg-muted flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeSection === "about" && (
                <AboutSectionEditor 
                  editedContent={editedContent}
                  setEditedContent={setEditedContent}
                />
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Досвід роботи
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newExp: Experience = {
                          company: "Нова компанія",
                          period: "2024 – теперішній",
                          title: "Посада",
                          responsibilities: ["Обов'язок 1"],
                        };
                        setEditedContent({
                          ...editedContent,
                          experiences: [...editedContent.experiences, newExp]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {editedContent.experiences.map((exp, expIndex) => (
                    <ExperienceEditor
                      key={expIndex}
                      experience={exp}
                      index={expIndex}
                      onChange={(updated) => {
                        const newExps = [...editedContent.experiences];
                        newExps[expIndex] = updated;
                        setEditedContent({ ...editedContent, experiences: newExps });
                      }}
                      onDelete={() => {
                        const newExps = editedContent.experiences.filter((_, i) => i !== expIndex);
                        setEditedContent({ ...editedContent, experiences: newExps });
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Освіта
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newEdu: Education = {
                          institution: "Новий навчальний заклад",
                          degree: "Ступінь",
                          field: "Спеціальність",
                          period: "2020 – 2024",
                        };
                        setEditedContent({
                          ...editedContent,
                          education: [...editedContent.education, newEdu]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {editedContent.education.map((edu, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-body text-sm text-muted-foreground">Запис #{index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            const newEdu = editedContent.education.filter((_, i) => i !== index);
                            setEditedContent({ ...editedContent, education: newEdu });
                          }}
                        >
                          Видалити
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <Input
                          placeholder="Навчальний заклад"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...editedContent.education];
                            newEdu[index].institution = e.target.value;
                            setEditedContent({ ...editedContent, education: newEdu });
                          }}
                          className="bg-muted"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Ступінь"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...editedContent.education];
                              newEdu[index].degree = e.target.value;
                              setEditedContent({ ...editedContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder="Період"
                            value={edu.period}
                            onChange={(e) => {
                              const newEdu = [...editedContent.education];
                              newEdu[index].period = e.target.value;
                              setEditedContent({ ...editedContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                        </div>
                        <Input
                          placeholder="Спеціальність"
                          value={edu.field}
                          onChange={(e) => {
                            const newEdu = [...editedContent.education];
                            newEdu[index].field = e.target.value;
                            setEditedContent({ ...editedContent, education: newEdu });
                          }}
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certificates Section */}
              {activeSection === "certificates" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Сертифікати
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newCert: Certificate = { name: "Новий сертифікат", year: "2024" };
                        setEditedContent({
                          ...editedContent,
                          certificates: [...editedContent.certificates, newCert]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {editedContent.certificates.map((cert, index) => (
                    <div key={index} className="flex gap-4 items-center mb-3">
                      <Input
                        placeholder="Назва сертифікату"
                        value={cert.name}
                        onChange={(e) => {
                          const newCerts = [...editedContent.certificates];
                          newCerts[index].name = e.target.value;
                          setEditedContent({ ...editedContent, certificates: newCerts });
                        }}
                        className="bg-muted flex-1"
                      />
                      <Input
                        placeholder="Рік"
                        value={cert.year}
                        onChange={(e) => {
                          const newCerts = [...editedContent.certificates];
                          newCerts[index].year = e.target.value;
                          setEditedContent({ ...editedContent, certificates: newCerts });
                        }}
                        className="bg-muted w-24"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          const newCerts = editedContent.certificates.filter((_, i) => i !== index);
                          setEditedContent({ ...editedContent, certificates: newCerts });
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages Section */}
              {activeSection === "languages" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Мови
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newLang: Language = { name: "Нова мова", level: "Базовий", percentage: 30 };
                        setEditedContent({
                          ...editedContent,
                          languages: [...editedContent.languages, newLang]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {editedContent.languages.map((lang, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-body text-sm text-muted-foreground">Мова #{index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => {
                            const newLangs = editedContent.languages.filter((_, i) => i !== index);
                            setEditedContent({ ...editedContent, languages: newLangs });
                          }}
                        >
                          Видалити
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Назва мови"
                            value={lang.name}
                            onChange={(e) => {
                              const newLangs = [...editedContent.languages];
                              newLangs[index].name = e.target.value;
                              setEditedContent({ ...editedContent, languages: newLangs });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder="Рівень"
                            value={lang.level}
                            onChange={(e) => {
                              const newLangs = [...editedContent.languages];
                              newLangs[index].level = e.target.value;
                              setEditedContent({ ...editedContent, languages: newLangs });
                            }}
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <label className="font-body text-sm text-muted-foreground block mb-2">
                            Відсоток: {lang.percentage}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={lang.percentage}
                            onChange={(e) => {
                              const newLangs = [...editedContent.languages];
                              newLangs[index].percentage = parseInt(e.target.value);
                              setEditedContent({ ...editedContent, languages: newLangs });
                            }}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Контакти
                  </h2>

                  <div className="grid gap-4">
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Телефон</label>
                      <Input
                        value={editedContent.contact.phone}
                        onChange={(e) => setEditedContent({
                          ...editedContent,
                          contact: { ...editedContent.contact, phone: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Email</label>
                      <Input
                        value={editedContent.contact.email}
                        onChange={(e) => setEditedContent({
                          ...editedContent,
                          contact: { ...editedContent.contact, email: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Локація</label>
                      <Input
                        value={editedContent.contact.location}
                        onChange={(e) => setEditedContent({
                          ...editedContent,
                          contact: { ...editedContent.contact, location: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Заголовок блоку співпраці</label>
                      <Input
                        value={editedContent.contact.collaborationTitle}
                        onChange={(e) => setEditedContent({
                          ...editedContent,
                          contact: { ...editedContent.contact, collaborationTitle: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Текст блоку співпраці</label>
                      <Textarea
                        value={editedContent.contact.collaborationText}
                        onChange={(e) => setEditedContent({
                          ...editedContent,
                          contact: { ...editedContent.contact, collaborationText: e.target.value }
                        })}
                        className="bg-muted"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Section Editor Component
interface AboutSectionEditorProps {
  editedContent: SiteContent;
  setEditedContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}

const AboutSectionEditor = ({ editedContent, setEditedContent }: AboutSectionEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл занадто великий. Максимум 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedContent({
          ...editedContent,
          about: { ...editedContent.about, profilePhoto: reader.result as string }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setEditedContent({
      ...editedContent,
      about: { ...editedContent.about, profilePhoto: undefined }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Про мене
      </h2>

      {/* Profile Photo Upload */}
      <div>
        <label className="font-body text-sm text-muted-foreground block mb-2">Фото профілю</label>
        <div className="flex items-start gap-4">
          {editedContent.about.profilePhoto ? (
            <div className="relative">
              <img 
                src={editedContent.about.profilePhoto} 
                alt="Фото профілю" 
                className="w-32 h-32 object-cover rounded-full border-2 border-neon-cyan/50"
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-neon-cyan/50 transition-colors"
            >
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="font-body text-xs text-muted-foreground text-center">Завантажити</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          {editedContent.about.profilePhoto && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Змінити фото
            </Button>
          )}
        </div>
        <p className="font-body text-xs text-muted-foreground mt-2">
          Рекомендований розмір: 500x500px. Максимум 5MB.
        </p>
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground block mb-2">Опис</label>
        <Textarea
          value={editedContent.about.description}
          onChange={(e) => setEditedContent({
            ...editedContent,
            about: { ...editedContent.about, description: e.target.value }
          })}
          className="bg-muted"
          rows={4}
        />
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground block mb-4">Персональна інформація</label>
        {editedContent.about.personalInfo.map((info, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <Input
              placeholder="Мітка"
              value={info.label}
              onChange={(e) => {
                const newInfo = [...editedContent.about.personalInfo];
                newInfo[index].label = e.target.value;
                setEditedContent({
                  ...editedContent,
                  about: { ...editedContent.about, personalInfo: newInfo }
                });
              }}
              className="bg-muted w-1/3"
            />
            <Input
              placeholder="Значення"
              value={info.value}
              onChange={(e) => {
                const newInfo = [...editedContent.about.personalInfo];
                newInfo[index].value = e.target.value;
                setEditedContent({
                  ...editedContent,
                  about: { ...editedContent.about, personalInfo: newInfo }
                });
              }}
              className="bg-muted flex-1"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground block mb-2">
          Навички (через кому)
        </label>
        <Input
          value={editedContent.about.skills.join(", ")}
          onChange={(e) => setEditedContent({
            ...editedContent,
            about: { ...editedContent.about, skills: e.target.value.split(",").map(s => s.trim()) }
          })}
          className="bg-muted"
        />
      </div>
    </div>
  );
};

// Experience Editor Component
interface ExperienceEditorProps {
  experience: Experience;
  index: number;
  onChange: (updated: Experience) => void;
  onDelete: () => void;
}

const ExperienceEditor = ({ experience, index, onChange, onDelete }: ExperienceEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="text-left">
          <div className="font-display font-bold text-foreground">{experience.company}</div>
          <div className="font-body text-sm text-muted-foreground">{experience.period}</div>
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-border/50 space-y-4">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="text-destructive" onClick={onDelete}>
              Видалити запис
            </Button>
          </div>

          <Input
            placeholder="Компанія"
            value={experience.company}
            onChange={(e) => onChange({ ...experience, company: e.target.value })}
            className="bg-muted"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Період"
              value={experience.period}
              onChange={(e) => onChange({ ...experience, period: e.target.value })}
              className="bg-muted"
            />
            <Input
              placeholder="Посада"
              value={experience.title}
              onChange={(e) => onChange({ ...experience, title: e.target.value })}
              className="bg-muted"
            />
          </div>

          <Input
            placeholder="Посилання (опціонально)"
            value={experience.link || ""}
            onChange={(e) => onChange({ ...experience, link: e.target.value || undefined })}
            className="bg-muted"
          />

          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">
              Обов'язки (кожен з нового рядка)
            </label>
            <Textarea
              value={experience.responsibilities.join("\n")}
              onChange={(e) => onChange({
                ...experience,
                responsibilities: e.target.value.split("\n").filter(r => r.trim())
              })}
              className="bg-muted"
              rows={6}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
