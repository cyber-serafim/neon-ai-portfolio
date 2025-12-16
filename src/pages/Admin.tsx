import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Save, RotateCcw, Home, ChevronDown, Upload, X, Download, FileText, Info, Archive, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useContent, SiteContent, Experience, Education, Certificate, Language, BilingualContent } from "@/contexts/ContentContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditLanguage = "uk" | "en";

const Admin = () => {
  const { logout } = useAuth();
  const { content, updateContent, resetContent } = useContent();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editedContent, setEditedContent] = useState<BilingualContent>(content);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [editLang, setEditLang] = useState<EditLanguage>("uk");

  const currentContent = editedContent[editLang];

  const updateCurrentLangContent = (newContent: SiteContent) => {
    setEditedContent({
      ...editedContent,
      [editLang]: newContent
    });
  };

  const handleSave = () => {
    updateContent(editedContent);
    toast({
      title: "Збережено!",
      description: "Всі зміни успішно збережено для обох мов.",
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
    { id: "export", label: "Експорт та розгортання" },
  ];

  const handleExportContent = () => {
    const dataStr = JSON.stringify(editedContent, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `site-content-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "Експортовано!",
      description: "Бекап контенту (обидві мови) успішно завантажено.",
    });
  };

  const handleImportContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string) as BilingualContent;
          updateContent(imported);
          setEditedContent(imported);
          toast({
            title: "Імпортовано!",
            description: "Контент успішно відновлено з бекапу.",
          });
        } catch {
          toast({
            title: "Помилка!",
            description: "Не вдалося прочитати файл. Перевірте формат.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const isExportSection = activeSection === "export";

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
              {/* Language Tabs - show only for content sections */}
              {!isExportSection && (
                <div className="mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="font-body text-sm text-muted-foreground mr-2">Мова редагування:</span>
                  <button
                    onClick={() => setEditLang("uk")}
                    className={cn(
                      "px-4 py-2 rounded-lg font-body text-sm transition-all",
                      editLang === "uk"
                        ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    🇺🇦 Українська
                  </button>
                  <button
                    onClick={() => setEditLang("en")}
                    className={cn(
                      "px-4 py-2 rounded-lg font-body text-sm transition-all",
                      editLang === "en"
                        ? "bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/50"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}

              {/* Hero Section */}
              {activeSection === "hero" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Головна секція {editLang === "en" ? "(EN)" : "(UK)"}
                  </h2>
                  
                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Ім'я</label>
                    <Input
                      value={currentContent.hero.name}
                      onChange={(e) => updateCurrentLangContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, name: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Заголовок</label>
                    <Input
                      value={currentContent.hero.title}
                      onChange={(e) => updateCurrentLangContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, title: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">Опис</label>
                    <Textarea
                      value={currentContent.hero.description}
                      onChange={(e) => updateCurrentLangContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, description: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-4">Статистика</label>
                    {currentContent.hero.stats.map((stat, index) => (
                      <div key={index} className="flex gap-4 mb-3">
                        <Input
                          placeholder="Значення"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...currentContent.hero.stats];
                            newStats[index].value = e.target.value;
                            updateCurrentLangContent({
                              ...currentContent,
                              hero: { ...currentContent.hero, stats: newStats }
                            });
                          }}
                          className="bg-muted w-1/3"
                        />
                        <Input
                          placeholder="Підпис"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...currentContent.hero.stats];
                            newStats[index].label = e.target.value;
                            updateCurrentLangContent({
                              ...currentContent,
                              hero: { ...currentContent.hero, stats: newStats }
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
                  editedContent={currentContent}
                  setEditedContent={updateCurrentLangContent}
                  editLang={editLang}
                />
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Досвід роботи {editLang === "en" ? "(EN)" : "(UK)"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newExp: Experience = {
                          company: editLang === "uk" ? "Нова компанія" : "New Company",
                          period: "2024 – present",
                          title: editLang === "uk" ? "Посада" : "Position",
                          responsibilities: [editLang === "uk" ? "Обов'язок 1" : "Responsibility 1"],
                        };
                        updateCurrentLangContent({
                          ...currentContent,
                          experiences: [...currentContent.experiences, newExp]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {currentContent.experiences.map((exp, expIndex) => (
                    <ExperienceEditor
                      key={expIndex}
                      experience={exp}
                      index={expIndex}
                      onChange={(updated) => {
                        const newExps = [...currentContent.experiences];
                        newExps[expIndex] = updated;
                        updateCurrentLangContent({ ...currentContent, experiences: newExps });
                      }}
                      onDelete={() => {
                        const newExps = currentContent.experiences.filter((_, i) => i !== expIndex);
                        updateCurrentLangContent({ ...currentContent, experiences: newExps });
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
                      Освіта {editLang === "en" ? "(EN)" : "(UK)"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newEdu: Education = {
                          institution: editLang === "uk" ? "Новий навчальний заклад" : "New Institution",
                          degree: editLang === "uk" ? "Ступінь" : "Degree",
                          field: editLang === "uk" ? "Спеціальність" : "Field",
                          period: "2020 – 2024",
                        };
                        updateCurrentLangContent({
                          ...currentContent,
                          education: [...currentContent.education, newEdu]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {currentContent.education.map((edu, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-body text-sm text-muted-foreground">Запис #{index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            const newEdu = currentContent.education.filter((_, i) => i !== index);
                            updateCurrentLangContent({ ...currentContent, education: newEdu });
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
                            const newEdu = [...currentContent.education];
                            newEdu[index].institution = e.target.value;
                            updateCurrentLangContent({ ...currentContent, education: newEdu });
                          }}
                          className="bg-muted"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Ступінь"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...currentContent.education];
                              newEdu[index].degree = e.target.value;
                              updateCurrentLangContent({ ...currentContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder="Період"
                            value={edu.period}
                            onChange={(e) => {
                              const newEdu = [...currentContent.education];
                              newEdu[index].period = e.target.value;
                              updateCurrentLangContent({ ...currentContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                        </div>
                        <Input
                          placeholder="Спеціальність"
                          value={edu.field}
                          onChange={(e) => {
                            const newEdu = [...currentContent.education];
                            newEdu[index].field = e.target.value;
                            updateCurrentLangContent({ ...currentContent, education: newEdu });
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
                      Сертифікати {editLang === "en" ? "(EN)" : "(UK)"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newCert: Certificate = { 
                          name: editLang === "uk" ? "Новий сертифікат" : "New Certificate", 
                          year: "2024" 
                        };
                        updateCurrentLangContent({
                          ...currentContent,
                          certificates: [...currentContent.certificates, newCert]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {currentContent.certificates.map((cert, index) => (
                    <div key={index} className="flex gap-4 items-center mb-3">
                      <Input
                        placeholder="Назва сертифікату"
                        value={cert.name}
                        onChange={(e) => {
                          const newCerts = [...currentContent.certificates];
                          newCerts[index].name = e.target.value;
                          updateCurrentLangContent({ ...currentContent, certificates: newCerts });
                        }}
                        className="bg-muted flex-1"
                      />
                      <Input
                        placeholder="Рік"
                        value={cert.year}
                        onChange={(e) => {
                          const newCerts = [...currentContent.certificates];
                          newCerts[index].year = e.target.value;
                          updateCurrentLangContent({ ...currentContent, certificates: newCerts });
                        }}
                        className="bg-muted w-24"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          const newCerts = currentContent.certificates.filter((_, i) => i !== index);
                          updateCurrentLangContent({ ...currentContent, certificates: newCerts });
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
                      Мови {editLang === "en" ? "(EN)" : "(UK)"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newLang: Language = { 
                          name: editLang === "uk" ? "Нова мова" : "New Language", 
                          level: editLang === "uk" ? "Базовий" : "Basic", 
                          percentage: 30 
                        };
                        updateCurrentLangContent({
                          ...currentContent,
                          languages: [...currentContent.languages, newLang]
                        });
                      }}
                    >
                      + Додати
                    </Button>
                  </div>

                  {currentContent.languages.map((lang, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-body text-sm text-muted-foreground">Мова #{index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => {
                            const newLangs = currentContent.languages.filter((_, i) => i !== index);
                            updateCurrentLangContent({ ...currentContent, languages: newLangs });
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
                              const newLangs = [...currentContent.languages];
                              newLangs[index].name = e.target.value;
                              updateCurrentLangContent({ ...currentContent, languages: newLangs });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder="Рівень"
                            value={lang.level}
                            onChange={(e) => {
                              const newLangs = [...currentContent.languages];
                              newLangs[index].level = e.target.value;
                              updateCurrentLangContent({ ...currentContent, languages: newLangs });
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
                              const newLangs = [...currentContent.languages];
                              newLangs[index].percentage = parseInt(e.target.value);
                              updateCurrentLangContent({ ...currentContent, languages: newLangs });
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
                    Контакти {editLang === "en" ? "(EN)" : "(UK)"}
                  </h2>

                  <div className="grid gap-4">
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Телефон</label>
                      <Input
                        value={currentContent.contact.phone}
                        onChange={(e) => updateCurrentLangContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, phone: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Email</label>
                      <Input
                        value={currentContent.contact.email}
                        onChange={(e) => updateCurrentLangContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, email: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Локація</label>
                      <Input
                        value={currentContent.contact.location}
                        onChange={(e) => updateCurrentLangContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, location: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Заголовок блоку співпраці</label>
                      <Input
                        value={currentContent.contact.collaborationTitle}
                        onChange={(e) => updateCurrentLangContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, collaborationTitle: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">Текст блоку співпраці</label>
                      <Textarea
                        value={currentContent.contact.collaborationText}
                        onChange={(e) => updateCurrentLangContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, collaborationText: e.target.value }
                        })}
                        className="bg-muted"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Export & Deploy Section */}
              {activeSection === "export" && (
                <div className="space-y-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Експорт та розгортання
                  </h2>

                  {/* Export/Import Section */}
                  <div className="glass-card rounded-xl p-6 border border-neon-cyan/30">
                    <h3 className="font-display text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Бекап контенту (обидві мови)
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      Експортуйте весь контент сайту (українською та англійською) у JSON файл для резервного копіювання або перенесення на інший хостинг.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="neonCyan" onClick={handleExportContent}>
                        <Download className="w-4 h-4 mr-2" />
                        Експортувати контент
                      </Button>
                      <div>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportContent}
                          className="hidden"
                          id="import-file"
                        />
                        <label htmlFor="import-file">
                          <Button variant="outline" asChild>
                            <span className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Імпортувати контент
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Download Archive Section */}
                  <div className="glass-card rounded-xl p-6 border border-neon-green/30">
                    <h3 className="font-display text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                      <Archive className="w-5 h-5" />
                      Завантаження архіву сайту
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      Для отримання повного архіву сайту (всі файли, структура, код) скористайтесь GitHub:
                    </p>
                    <ol className="font-body text-muted-foreground text-sm space-y-3 mb-4 list-decimal list-inside">
                      <li>Відкрийте <strong className="text-foreground">налаштування проекту</strong> в Lovable (іконка шестерні)</li>
                      <li>Перейдіть у вкладку <strong className="text-foreground">GitHub</strong></li>
                      <li>Якщо ще не підключено — натисніть <strong className="text-neon-cyan">"Connect to GitHub"</strong></li>
                      <li>Після підключення відкрийте ваш репозиторій на GitHub</li>
                      <li>Натисніть зелену кнопку <strong className="text-neon-green">Code</strong> → <strong className="text-neon-green">Download ZIP</strong></li>
                    </ol>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-body text-sm text-muted-foreground">
                        <strong className="text-neon-cyan">Альтернатива через Git:</strong>
                      </p>
                      <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan mt-2">
                        git clone https://github.com/ваш-username/ваш-репозиторій.git
                      </code>
                    </div>
                  </div>

                  {/* Deployment Instructions */}
                  <div className="glass-card rounded-xl p-6 border border-neon-magenta/30">
                    <h3 className="font-display text-lg font-bold text-neon-magenta mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Інструкція з розгортання архіву
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          1. Розпакування архіву
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Розпакуйте завантажений ZIP-архів у будь-яку папку на вашому комп'ютері.
                        </p>
                        <p className="font-body text-muted-foreground text-sm">
                          Структура проекту:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs font-mono text-neon-cyan mt-2 overflow-x-auto">
{`📁 your-site/
├── 📁 public/          # Статичні файли
├── 📁 src/             # Вихідний код
│   ├── 📁 components/  # React компоненти
│   ├── 📁 pages/       # Сторінки
│   ├── 📁 contexts/    # Контексти
│   └── 📁 hooks/       # Хуки
├── index.html          # Головний HTML
├── package.json        # Залежності
├── vite.config.ts      # Налаштування Vite
└── tailwind.config.ts  # Налаштування Tailwind`}
                        </pre>
                      </div>

                      {/* Step 2 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          2. Встановлення Node.js та залежностей
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Переконайтесь, що на вашому комп'ютері встановлено <strong className="text-foreground">Node.js 18+</strong>. 
                          Завантажте з <a href="https://nodejs.org" target="_blank" rel="noopener" className="text-neon-cyan hover:underline">nodejs.org</a>
                        </p>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Відкрийте термінал у папці проекту та виконайте:
                        </p>
                        <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan">
                          npm install
                        </code>
                      </div>

                      {/* Step 3 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          3. Локальний запуск для тестування
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Для перевірки роботи сайту локально:
                        </p>
                        <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan">
                          npm run dev
                        </code>
                        <p className="font-body text-muted-foreground text-sm mt-2">
                          Сайт буде доступний за адресою <code className="text-neon-cyan">http://localhost:5173</code>
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          4. Збірка для production
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Створіть оптимізовану збірку:
                        </p>
                        <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan">
                          npm run build
                        </code>
                        <p className="font-body text-muted-foreground text-sm mt-2">
                          Готовий сайт буде у папці <code className="text-neon-cyan">dist/</code> — ці файли завантажуйте на хостинг
                        </p>
                      </div>

                      {/* Step 5 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          5. Варіанти хостингу
                        </h4>
                        <div className="space-y-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Info className="w-4 h-4 mr-2" />
                                Netlify (рекомендовано)
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-display text-neon-cyan">Розгортання на Netlify</DialogTitle>
                                <DialogDescription className="font-body">
                                  <ol className="list-decimal list-inside space-y-2 mt-4">
                                    <li>Зареєструйтесь на <a href="https://netlify.com" target="_blank" rel="noopener" className="text-neon-cyan hover:underline">netlify.com</a></li>
                                    <li>Перетягніть папку <code className="text-neon-cyan">dist/</code> у вікно Netlify</li>
                                    <li>Або підключіть GitHub репозиторій для автодеплою</li>
                                    <li>Налаштуйте власний домен (опціонально)</li>
                                  </ol>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Info className="w-4 h-4 mr-2" />
                                Vercel
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-display text-neon-cyan">Розгортання на Vercel</DialogTitle>
                                <DialogDescription className="font-body">
                                  <ol className="list-decimal list-inside space-y-2 mt-4">
                                    <li>Зареєструйтесь на <a href="https://vercel.com" target="_blank" rel="noopener" className="text-neon-cyan hover:underline">vercel.com</a></li>
                                    <li>Імпортуйте проект з GitHub</li>
                                    <li>Vercel автоматично визначить Vite конфігурацію</li>
                                    <li>Натисніть Deploy</li>
                                  </ol>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Info className="w-4 h-4 mr-2" />
                                GitHub Pages
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-display text-neon-cyan">Розгортання на GitHub Pages</DialogTitle>
                                <DialogDescription className="font-body">
                                  <ol className="list-decimal list-inside space-y-2 mt-4">
                                    <li>Додайте у vite.config.ts: <code className="text-neon-cyan">base: '/repo-name/'</code></li>
                                    <li>Встановіть: <code className="text-neon-cyan">npm install -D gh-pages</code></li>
                                    <li>Додайте скрипт у package.json: <code className="text-neon-cyan">"deploy": "gh-pages -d dist"</code></li>
                                    <li>Виконайте: <code className="text-neon-cyan">npm run build && npm run deploy</code></li>
                                    <li>Увімкніть Pages у налаштуваннях репозиторію</li>
                                  </ol>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Info className="w-4 h-4 mr-2" />
                                VPS / Власний сервер
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-display text-neon-cyan">Розгортання на VPS</DialogTitle>
                                <DialogDescription className="font-body">
                                  <ol className="list-decimal list-inside space-y-2 mt-4">
                                    <li>Скопіюйте вміст папки <code className="text-neon-cyan">dist/</code> на сервер</li>
                                    <li>Налаштуйте Nginx або Apache для статичного хостингу</li>
                                    <li>Приклад конфігу Nginx:</li>
                                    <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
{`server {
  listen 80;
  server_name your-domain.com;
  root /var/www/your-site;
  index index.html;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}`}
                                    </pre>
                                    <li>Налаштуйте SSL через Let's Encrypt</li>
                                  </ol>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {/* Step 6 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          6. Відновлення контенту
                        </h4>
                        <p className="font-body text-muted-foreground text-sm">
                          Після розгортання увійдіть в адмін-панель (<code className="text-neon-cyan">/login</code>) і імпортуйте раніше збережений JSON-файл з контентом.
                        </p>
                      </div>

                      {/* Important Note */}
                      <div className="bg-neon-magenta/10 border border-neon-magenta/30 rounded-lg p-4 mt-6">
                        <h4 className="font-display font-bold text-neon-magenta mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Важливо
                        </h4>
                        <ul className="font-body text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Контент зберігається у localStorage браузера</li>
                          <li>Регулярно робіть бекапи через функцію експорту</li>
                          <li>При очищенні кешу браузера контент буде скинуто</li>
                          <li>Для production рекомендуємо використовувати базу даних</li>
                        </ul>
                      </div>
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
  setEditedContent: (content: SiteContent) => void;
  editLang: EditLanguage;
}

const AboutSectionEditor = ({ editedContent, setEditedContent, editLang }: AboutSectionEditorProps) => {
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
        Про мене {editLang === "en" ? "(EN)" : "(UK)"}
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
