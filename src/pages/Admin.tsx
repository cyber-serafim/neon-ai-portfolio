import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Save, RotateCcw, Home, ChevronDown, Upload, X, Download, FileText, Info, Archive, Globe, Eye } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PreviewHeroSection,
  PreviewAboutSection,
  PreviewExperienceSection,
  PreviewEducationSection,
  PreviewContactSection,
} from "@/components/admin/PreviewSections";

type EditLanguage = "uk" | "en";

const Admin = () => {
  const { logout } = useAuth();
  const { bilingualContent, updateContent, resetContent } = useContent();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editLanguage, setEditLanguage] = useState<EditLanguage>("uk");
  const [editedContent, setEditedContent] = useState<BilingualContent>(bilingualContent);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Get current language content for editing
  const currentContent = editedContent[editLanguage];

  // Update content for current language
  const setCurrentContent = (newContent: SiteContent) => {
    setEditedContent({
      ...editedContent,
      [editLanguage]: newContent,
    });
  };

  const handleSave = () => {
    updateContent(editedContent.uk, "uk");
    updateContent(editedContent.en, "en");
    toast({
      title: editLanguage === "uk" ? "Збережено!" : "Saved!",
      description: editLanguage === "uk" 
        ? "Всі зміни для обох мов успішно збережено." 
        : "All changes for both languages saved successfully.",
    });
  };

  const handleReset = () => {
    resetContent(editLanguage);
    const langLabel = editLanguage === "uk" ? "українською" : "англійською";
    const langLabelEn = editLanguage === "uk" ? "Ukrainian" : "English";
    toast({
      title: editLanguage === "uk" ? "Скинуто!" : "Reset!",
      description: editLanguage === "uk" 
        ? `Контент ${langLabel} відновлено.`
        : `${langLabelEn} content restored.`,
    });
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sections = [
    { id: "hero", label: editLanguage === "uk" ? "Головна секція" : "Hero Section" },
    { id: "about", label: editLanguage === "uk" ? "Про мене" : "About Me" },
    { id: "experience", label: editLanguage === "uk" ? "Досвід роботи" : "Experience" },
    { id: "education", label: editLanguage === "uk" ? "Освіта" : "Education" },
    { id: "certificates", label: editLanguage === "uk" ? "Сертифікати" : "Certificates" },
    { id: "languages", label: editLanguage === "uk" ? "Мови" : "Languages" },
    { id: "contact", label: editLanguage === "uk" ? "Контакти" : "Contacts" },
    { id: "export", label: editLanguage === "uk" ? "Експорт та розгортання" : "Export & Deploy" },
  ];

  const handleExportContent = () => {
    const dataStr = JSON.stringify(editedContent, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `site-content-bilingual-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: editLanguage === "uk" ? "Експортовано!" : "Exported!",
      description: editLanguage === "uk" ? "Бекап контенту успішно завантажено." : "Content backup downloaded successfully.",
    });
  };

  const handleImportContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          // Handle both old single-language and new bilingual format
          if (imported.uk && imported.en) {
            setEditedContent(imported as BilingualContent);
            updateContent(imported.uk, "uk");
            updateContent(imported.en, "en");
          } else if (imported.hero) {
            // Old format - import as current language
            setCurrentContent(imported as SiteContent);
          }
          toast({
            title: editLanguage === "uk" ? "Імпортовано!" : "Imported!",
            description: editLanguage === "uk" ? "Контент успішно відновлено з бекапу." : "Content restored from backup.",
          });
        } catch {
          toast({
            title: editLanguage === "uk" ? "Помилка!" : "Error!",
            description: editLanguage === "uk" ? "Не вдалося прочитати файл. Перевірте формат." : "Failed to read file. Check format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  // Language toggle component
  const LanguageToggle = () => (
    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
      <button
        onClick={() => setEditLanguage("uk")}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-md font-body text-sm transition-all",
          editLanguage === "uk" 
            ? "bg-neon-cyan/20 text-neon-cyan" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🇺🇦 UA
      </button>
      <button
        onClick={() => setEditLanguage("en")}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-md font-body text-sm transition-all",
          editLanguage === "en" 
            ? "bg-neon-cyan/20 text-neon-cyan" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🇬🇧 EN
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold neon-text-cyan">
              {editLanguage === "uk" ? "Адмін панель" : "Admin Panel"}
            </h1>
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              {editLanguage === "uk" ? "На сайт" : "View Site"}
            </Button>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  {editLanguage === "uk" ? "Попередній перегляд" : "Preview"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="font-display text-xl">
                    {editLanguage === "uk" ? "Попередній перегляд змін" : "Preview Changes"}
                  </DialogTitle>
                  <DialogDescription>
                    {editLanguage === "uk" 
                      ? "Перегляд контенту українською мовою"
                      : "Previewing English content"}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[calc(90vh-120px)]">
                  <div className="bg-background rounded-lg overflow-hidden">
                    <PreviewHeroSection content={currentContent} language={editLanguage} />
                    <PreviewAboutSection content={currentContent} language={editLanguage} />
                    <PreviewExperienceSection content={currentContent} language={editLanguage} />
                    <PreviewEducationSection content={currentContent} language={editLanguage} />
                    <PreviewContactSection content={currentContent} language={editLanguage} />
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setPreviewOpen(false)}>
                    {editLanguage === "uk" ? "Закрити" : "Close"}
                  </Button>
                  <Button variant="neonCyan" onClick={() => { handleSave(); setPreviewOpen(false); }}>
                    <Save className="w-4 h-4 mr-2" />
                    {editLanguage === "uk" ? "Зберегти зміни" : "Save Changes"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="neonCyan" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              {editLanguage === "uk" ? "Зберегти" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {editLanguage === "uk" ? "Скинути" : "Reset"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {editLanguage === "uk" ? "Вийти" : "Logout"}
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
                {editLanguage === "uk" ? "Секції" : "Sections"}
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

              {/* Language indicator */}
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <p className="font-body text-xs text-muted-foreground mb-2">
                  {editLanguage === "uk" ? "Редагування мови:" : "Editing language:"}
                </p>
                <p className="font-display text-sm text-neon-cyan">
                  {editLanguage === "uk" ? "🇺🇦 Українська" : "🇬🇧 English"}
                </p>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-xl p-6">
              {/* Hero Section */}
              {activeSection === "hero" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    {editLanguage === "uk" ? "Головна секція" : "Hero Section"}
                  </h2>
                  
                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">
                      {editLanguage === "uk" ? "Ім'я" : "Name"}
                    </label>
                    <Input
                      value={currentContent.hero.name}
                      onChange={(e) => setCurrentContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, name: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">
                      {editLanguage === "uk" ? "Заголовок" : "Title"}
                    </label>
                    <Input
                      value={currentContent.hero.title}
                      onChange={(e) => setCurrentContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, title: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-2">
                      {editLanguage === "uk" ? "Опис" : "Description"}
                    </label>
                    <Textarea
                      value={currentContent.hero.description}
                      onChange={(e) => setCurrentContent({
                        ...currentContent,
                        hero: { ...currentContent.hero, description: e.target.value }
                      })}
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-4">
                      {editLanguage === "uk" ? "Статистика" : "Statistics"}
                    </label>
                    {currentContent.hero.stats.map((stat, index) => (
                      <div key={index} className="flex gap-4 mb-3">
                        <Input
                          placeholder={editLanguage === "uk" ? "Значення" : "Value"}
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...currentContent.hero.stats];
                            newStats[index].value = e.target.value;
                            setCurrentContent({
                              ...currentContent,
                              hero: { ...currentContent.hero, stats: newStats }
                            });
                          }}
                          className="bg-muted w-1/3"
                        />
                        <Input
                          placeholder={editLanguage === "uk" ? "Підпис" : "Label"}
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...currentContent.hero.stats];
                            newStats[index].label = e.target.value;
                            setCurrentContent({
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
                  setEditedContent={setCurrentContent}
                  editLanguage={editLanguage}
                  fullBilingualContent={editedContent}
                  setFullBilingualContent={setEditedContent}
                />
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {editLanguage === "uk" ? "Досвід роботи" : "Work Experience"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newExp: Experience = {
                          company: editLanguage === "uk" ? "Нова компанія" : "New Company",
                          period: "2024 – present",
                          title: editLanguage === "uk" ? "Посада" : "Position",
                          responsibilities: [editLanguage === "uk" ? "Обов'язок 1" : "Responsibility 1"],
                        };
                        setCurrentContent({
                          ...currentContent,
                          experiences: [...currentContent.experiences, newExp]
                        });
                      }}
                    >
                      + {editLanguage === "uk" ? "Додати" : "Add"}
                    </Button>
                  </div>

                  {currentContent.experiences.map((exp, expIndex) => (
                    <ExperienceEditor
                      key={expIndex}
                      experience={exp}
                      index={expIndex}
                      editLanguage={editLanguage}
                      onChange={(updated) => {
                        const newExps = [...currentContent.experiences];
                        newExps[expIndex] = updated;
                        setCurrentContent({ ...currentContent, experiences: newExps });
                      }}
                      onDelete={() => {
                        const newExps = currentContent.experiences.filter((_, i) => i !== expIndex);
                        setCurrentContent({ ...currentContent, experiences: newExps });
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
                      {editLanguage === "uk" ? "Освіта" : "Education"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newEdu: Education = {
                          institution: editLanguage === "uk" ? "Новий навчальний заклад" : "New Institution",
                          degree: editLanguage === "uk" ? "Ступінь" : "Degree",
                          field: editLanguage === "uk" ? "Спеціальність" : "Field",
                          period: "2020 – 2024",
                        };
                        setCurrentContent({
                          ...currentContent,
                          education: [...currentContent.education, newEdu]
                        });
                      }}
                    >
                      + {editLanguage === "uk" ? "Додати" : "Add"}
                    </Button>
                  </div>

                  {currentContent.education.map((edu, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-body text-sm text-muted-foreground">
                          {editLanguage === "uk" ? "Запис" : "Entry"} #{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            const newEdu = currentContent.education.filter((_, i) => i !== index);
                            setCurrentContent({ ...currentContent, education: newEdu });
                          }}
                        >
                          {editLanguage === "uk" ? "Видалити" : "Delete"}
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <Input
                          placeholder={editLanguage === "uk" ? "Навчальний заклад" : "Institution"}
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...currentContent.education];
                            newEdu[index].institution = e.target.value;
                            setCurrentContent({ ...currentContent, education: newEdu });
                          }}
                          className="bg-muted"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder={editLanguage === "uk" ? "Ступінь" : "Degree"}
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...currentContent.education];
                              newEdu[index].degree = e.target.value;
                              setCurrentContent({ ...currentContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder={editLanguage === "uk" ? "Період" : "Period"}
                            value={edu.period}
                            onChange={(e) => {
                              const newEdu = [...currentContent.education];
                              newEdu[index].period = e.target.value;
                              setCurrentContent({ ...currentContent, education: newEdu });
                            }}
                            className="bg-muted"
                          />
                        </div>
                        <Input
                          placeholder={editLanguage === "uk" ? "Спеціальність" : "Field of Study"}
                          value={edu.field}
                          onChange={(e) => {
                            const newEdu = [...currentContent.education];
                            newEdu[index].field = e.target.value;
                            setCurrentContent({ ...currentContent, education: newEdu });
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
                      {editLanguage === "uk" ? "Сертифікати" : "Certificates"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newCert: Certificate = { 
                          name: editLanguage === "uk" ? "Новий сертифікат" : "New Certificate", 
                          year: "2024" 
                        };
                        setCurrentContent({
                          ...currentContent,
                          certificates: [...currentContent.certificates, newCert]
                        });
                      }}
                    >
                      + {editLanguage === "uk" ? "Додати" : "Add"}
                    </Button>
                  </div>

                  {currentContent.certificates.map((cert, index) => (
                    <div key={index} className="flex gap-4 items-center mb-3">
                      <Input
                        placeholder={editLanguage === "uk" ? "Назва сертифікату" : "Certificate Name"}
                        value={cert.name}
                        onChange={(e) => {
                          const newCerts = [...currentContent.certificates];
                          newCerts[index].name = e.target.value;
                          setCurrentContent({ ...currentContent, certificates: newCerts });
                        }}
                        className="bg-muted flex-1"
                      />
                      <Input
                        placeholder={editLanguage === "uk" ? "Рік" : "Year"}
                        value={cert.year}
                        onChange={(e) => {
                          const newCerts = [...currentContent.certificates];
                          newCerts[index].year = e.target.value;
                          setCurrentContent({ ...currentContent, certificates: newCerts });
                        }}
                        className="bg-muted w-24"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          const newCerts = currentContent.certificates.filter((_, i) => i !== index);
                          setCurrentContent({ ...currentContent, certificates: newCerts });
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
                      {editLanguage === "uk" ? "Мови" : "Languages"}
                    </h2>
                    <Button
                      variant="neonCyan"
                      size="sm"
                      onClick={() => {
                        const newLang: Language = { 
                          name: editLanguage === "uk" ? "Нова мова" : "New Language", 
                          level: editLanguage === "uk" ? "Базовий" : "Basic", 
                          percentage: 30 
                        };
                        setCurrentContent({
                          ...currentContent,
                          languages: [...currentContent.languages, newLang]
                        });
                      }}
                    >
                      + {editLanguage === "uk" ? "Додати" : "Add"}
                    </Button>
                  </div>

                  {currentContent.languages.map((lang, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-body text-sm text-muted-foreground">
                          {editLanguage === "uk" ? "Мова" : "Language"} #{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => {
                            const newLangs = currentContent.languages.filter((_, i) => i !== index);
                            setCurrentContent({ ...currentContent, languages: newLangs });
                          }}
                        >
                          {editLanguage === "uk" ? "Видалити" : "Delete"}
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder={editLanguage === "uk" ? "Назва мови" : "Language Name"}
                            value={lang.name}
                            onChange={(e) => {
                              const newLangs = [...currentContent.languages];
                              newLangs[index].name = e.target.value;
                              setCurrentContent({ ...currentContent, languages: newLangs });
                            }}
                            className="bg-muted"
                          />
                          <Input
                            placeholder={editLanguage === "uk" ? "Рівень" : "Level"}
                            value={lang.level}
                            onChange={(e) => {
                              const newLangs = [...currentContent.languages];
                              newLangs[index].level = e.target.value;
                              setCurrentContent({ ...currentContent, languages: newLangs });
                            }}
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <label className="font-body text-sm text-muted-foreground block mb-2">
                            {editLanguage === "uk" ? "Відсоток" : "Percentage"}: {lang.percentage}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={lang.percentage}
                            onChange={(e) => {
                              const newLangs = [...currentContent.languages];
                              newLangs[index].percentage = parseInt(e.target.value);
                              setCurrentContent({ ...currentContent, languages: newLangs });
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
                    {editLanguage === "uk" ? "Контакти" : "Contacts"}
                  </h2>

                  <div className="grid gap-4">
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">
                        {editLanguage === "uk" ? "Телефон" : "Phone"}
                      </label>
                      <Input
                        value={currentContent.contact.phone}
                        onChange={(e) => setCurrentContent({
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
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, email: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">
                        {editLanguage === "uk" ? "Локація" : "Location"}
                      </label>
                      <Input
                        value={currentContent.contact.location}
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, location: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">
                        {editLanguage === "uk" ? "Заголовок блоку співпраці" : "Collaboration Section Title"}
                      </label>
                      <Input
                        value={currentContent.contact.collaborationTitle}
                        onChange={(e) => setCurrentContent({
                          ...currentContent,
                          contact: { ...currentContent.contact, collaborationTitle: e.target.value }
                        })}
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-2">
                        {editLanguage === "uk" ? "Текст блоку співпраці" : "Collaboration Section Text"}
                      </label>
                      <Textarea
                        value={currentContent.contact.collaborationText}
                        onChange={(e) => setCurrentContent({
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
                    {editLanguage === "uk" ? "Експорт та розгортання" : "Export & Deployment"}
                  </h2>

                  {/* Export/Import Section */}
                  <div className="glass-card rounded-xl p-6 border border-neon-cyan/30">
                    <h3 className="font-display text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      {editLanguage === "uk" ? "Бекап контенту" : "Content Backup"}
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      {editLanguage === "uk" 
                        ? "Експортуйте весь контент сайту (обидві мови) у JSON файл для резервного копіювання."
                        : "Export all site content (both languages) to a JSON file for backup."}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="neonCyan" onClick={handleExportContent}>
                        <Download className="w-4 h-4 mr-2" />
                        {editLanguage === "uk" ? "Експортувати контент" : "Export Content"}
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
                              {editLanguage === "uk" ? "Імпортувати контент" : "Import Content"}
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
                      {editLanguage === "uk" ? "Завантаження архіву сайту" : "Download Site Archive"}
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      {editLanguage === "uk" 
                        ? "Для отримання повного архіву сайту скористайтесь GitHub:"
                        : "To get the full site archive, use GitHub:"}
                    </p>
                    <ol className="font-body text-muted-foreground text-sm space-y-3 mb-4 list-decimal list-inside">
                      <li>{editLanguage === "uk" ? "Відкрийте налаштування проекту в Lovable" : "Open project settings in Lovable"}</li>
                      <li>{editLanguage === "uk" ? "Перейдіть у вкладку GitHub" : "Go to GitHub tab"}</li>
                      <li>{editLanguage === "uk" ? 'Натисніть "Connect to GitHub"' : 'Click "Connect to GitHub"'}</li>
                      <li>{editLanguage === "uk" ? "Відкрийте репозиторій на GitHub" : "Open repository on GitHub"}</li>
                      <li>{editLanguage === "uk" ? "Натисніть Code → Download ZIP" : "Click Code → Download ZIP"}</li>
                    </ol>
                  </div>

                  {/* Important Note */}
                  <div className="bg-neon-magenta/10 border border-neon-magenta/30 rounded-lg p-4">
                    <h4 className="font-display font-bold text-neon-magenta mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      {editLanguage === "uk" ? "Важливо" : "Important"}
                    </h4>
                    <ul className="font-body text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>{editLanguage === "uk" ? "Контент зберігається у localStorage браузера" : "Content is stored in browser localStorage"}</li>
                      <li>{editLanguage === "uk" ? "Регулярно робіть бекапи через функцію експорту" : "Regularly backup using the export function"}</li>
                      <li>{editLanguage === "uk" ? "При очищенні кешу браузера контент буде скинуто" : "Clearing browser cache will reset content"}</li>
                    </ul>
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
  editLanguage: EditLanguage;
  fullBilingualContent: BilingualContent;
  setFullBilingualContent: (content: BilingualContent) => void;
}

const AboutSectionEditor = ({ editedContent, setEditedContent, editLanguage, fullBilingualContent, setFullBilingualContent }: AboutSectionEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(editLanguage === "uk" ? "Файл занадто великий. Максимум 5MB." : "File too large. Maximum 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoBase64 = reader.result as string;
        // Save photo to BOTH languages since it's a visual asset, not translatable content
        setFullBilingualContent({
          uk: {
            ...fullBilingualContent.uk,
            about: { ...fullBilingualContent.uk.about, profilePhoto: photoBase64 }
          },
          en: {
            ...fullBilingualContent.en,
            about: { ...fullBilingualContent.en.about, profilePhoto: photoBase64 }
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    // Remove photo from BOTH languages
    setFullBilingualContent({
      uk: {
        ...fullBilingualContent.uk,
        about: { ...fullBilingualContent.uk.about, profilePhoto: undefined }
      },
      en: {
        ...fullBilingualContent.en,
        about: { ...fullBilingualContent.en.about, profilePhoto: undefined }
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {editLanguage === "uk" ? "Про мене" : "About Me"}
      </h2>

      {/* Profile Photo Upload */}
      <div>
        <label className="font-body text-sm text-muted-foreground block mb-2">
          {editLanguage === "uk" ? "Фото профілю" : "Profile Photo"}
        </label>
        <div className="flex items-start gap-4">
          {editedContent.about.profilePhoto ? (
            <div className="relative">
              <img 
                src={editedContent.about.profilePhoto} 
                alt={editLanguage === "uk" ? "Фото профілю" : "Profile photo"} 
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
              <span className="font-body text-xs text-muted-foreground text-center">
                {editLanguage === "uk" ? "Завантажити" : "Upload"}
              </span>
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
              {editLanguage === "uk" ? "Змінити фото" : "Change photo"}
            </Button>
          )}
        </div>
        <p className="font-body text-xs text-muted-foreground mt-2">
          {editLanguage === "uk" ? "Рекомендований розмір: 500x500px. Максимум 5MB." : "Recommended size: 500x500px. Maximum 5MB."}
        </p>
      </div>

      <div>
        <label className="font-body text-sm text-muted-foreground block mb-2">
          {editLanguage === "uk" ? "Опис" : "Description"}
        </label>
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
        <label className="font-body text-sm text-muted-foreground block mb-4">
          {editLanguage === "uk" ? "Персональна інформація" : "Personal Information"}
        </label>
        {editedContent.about.personalInfo.map((info, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <Input
              placeholder={editLanguage === "uk" ? "Мітка" : "Label"}
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
              placeholder={editLanguage === "uk" ? "Значення" : "Value"}
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
        <label className="font-body text-sm text-muted-foreground block mb-4">
          {editLanguage === "uk" ? "Навички" : "Skills"}
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {editedContent.about.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
              <Input
                value={skill}
                onChange={(e) => {
                  const newSkills = [...editedContent.about.skills];
                  newSkills[index] = e.target.value;
                  setEditedContent({
                    ...editedContent,
                    about: { ...editedContent.about, skills: newSkills }
                  });
                }}
                className="bg-transparent border-0 p-0 h-auto text-sm w-auto min-w-[100px]"
              />
              <button
                onClick={() => {
                  const newSkills = editedContent.about.skills.filter((_, i) => i !== index);
                  setEditedContent({
                    ...editedContent,
                    about: { ...editedContent.about, skills: newSkills }
                  });
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditedContent({
              ...editedContent,
              about: { 
                ...editedContent.about, 
                skills: [...editedContent.about.skills, editLanguage === "uk" ? "Нова навичка" : "New Skill"] 
              }
            });
          }}
        >
          + {editLanguage === "uk" ? "Додати навичку" : "Add Skill"}
        </Button>
      </div>
    </div>
  );
};

// Experience Editor Component
interface ExperienceEditorProps {
  experience: Experience;
  index: number;
  editLanguage: EditLanguage;
  onChange: (updated: Experience) => void;
  onDelete: () => void;
}

const ExperienceEditor = ({ experience, index, editLanguage, onChange, onDelete }: ExperienceEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
          <div>
            <h3 className="font-display font-bold text-foreground">{experience.company}</h3>
            <p className="font-body text-sm text-muted-foreground">{experience.title} • {experience.period}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          {editLanguage === "uk" ? "Видалити" : "Delete"}
        </Button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">
                {editLanguage === "uk" ? "Компанія" : "Company"}
              </label>
              <Input
                value={experience.company}
                onChange={(e) => onChange({ ...experience, company: e.target.value })}
                className="bg-muted"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">
                {editLanguage === "uk" ? "Період" : "Period"}
              </label>
              <Input
                value={experience.period}
                onChange={(e) => onChange({ ...experience, period: e.target.value })}
                className="bg-muted"
              />
            </div>
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">
              {editLanguage === "uk" ? "Посада" : "Title"}
            </label>
            <Input
              value={experience.title}
              onChange={(e) => onChange({ ...experience, title: e.target.value })}
              className="bg-muted"
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">
              {editLanguage === "uk" ? "Посилання (необов'язково)" : "Link (optional)"}
            </label>
            <Input
              value={experience.link || ""}
              onChange={(e) => onChange({ ...experience, link: e.target.value || undefined })}
              placeholder="https://..."
              className="bg-muted"
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">
              {editLanguage === "uk" ? "Обов'язки" : "Responsibilities"}
            </label>
            {experience.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex gap-2 mb-2">
                <Input
                  value={resp}
                  onChange={(e) => {
                    const newResps = [...experience.responsibilities];
                    newResps[respIndex] = e.target.value;
                    onChange({ ...experience, responsibilities: newResps });
                  }}
                  className="bg-muted flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    const newResps = experience.responsibilities.filter((_, i) => i !== respIndex);
                    onChange({ ...experience, responsibilities: newResps });
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onChange({
                  ...experience,
                  responsibilities: [...experience.responsibilities, ""]
                });
              }}
            >
              + {editLanguage === "uk" ? "Додати обов'язок" : "Add Responsibility"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
