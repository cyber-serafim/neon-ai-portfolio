import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Save, RotateCcw, Home, ChevronDown, Upload, X, Download, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useContent, SiteContent, Experience, Education, Certificate, Language } from "@/contexts/ContentContext";
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
    { id: "export", label: "Експорт та розгортання" },
  ];

  const handleExportContent = () => {
    const dataStr = JSON.stringify(content, null, 2);
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
      description: "Бекап контенту успішно завантажено.",
    });
  };

  const handleImportContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string) as SiteContent;
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
                      Бекап контенту
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      Експортуйте весь контент сайту у JSON файл для резервного копіювання або перенесення на інший хостинг.
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

                  {/* Deployment Instructions */}
                  <div className="glass-card rounded-xl p-6 border border-neon-magenta/30">
                    <h3 className="font-display text-lg font-bold text-neon-magenta mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Інструкція з розгортання
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          1. Завантаження коду з GitHub
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Перейдіть у налаштування проекту Lovable → GitHub і скопіюйте репозиторій:
                        </p>
                        <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan">
                          git clone https://github.com/your-username/your-repo.git
                        </code>
                      </div>

                      {/* Step 2 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          2. Встановлення залежностей
                        </h4>
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
                          3. Збірка проекту
                        </h4>
                        <p className="font-body text-muted-foreground text-sm mb-2">
                          Створіть production-збірку:
                        </p>
                        <code className="block bg-muted p-3 rounded text-sm font-mono text-neon-cyan">
                          npm run build
                        </code>
                        <p className="font-body text-muted-foreground text-sm mt-2">
                          Результат буде у папці <code className="text-neon-cyan">dist/</code>
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          4. Варіанти хостингу
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
                                    <li>Зареєструйтесь на netlify.com</li>
                                    <li>Натисніть "Add new site" → "Deploy manually"</li>
                                    <li>Перетягніть папку <code className="text-neon-cyan">dist/</code> у вікно</li>
                                    <li>Або підключіть GitHub репозиторій для автоматичного деплою</li>
                                    <li>Налаштуйте власний домен у розділі "Domain settings"</li>
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
                                    <li>Зареєструйтесь на vercel.com</li>
                                    <li>Імпортуйте проект з GitHub</li>
                                    <li>Виберіть Framework: Vite</li>
                                    <li>Натисніть "Deploy"</li>
                                    <li>Налаштуйте власний домен у налаштуваннях проекту</li>
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

                      {/* Step 5 */}
                      <div className="border-l-2 border-neon-cyan/50 pl-4">
                        <h4 className="font-display font-bold text-foreground mb-2">
                          5. Відновлення контенту
                        </h4>
                        <p className="font-body text-muted-foreground text-sm">
                          Після розгортання увійдіть в адмін-панель і імпортуйте раніше збережений JSON-файл з контентом.
                          Контент зберігається у localStorage браузера користувача.
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
