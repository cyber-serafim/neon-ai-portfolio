import { useState, useEffect } from "react";
import { Mail, ExternalLink, CheckCircle, AlertCircle, Send, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSettings, EmailSettings } from "@/hooks/useEmailSettings";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface EmailSettingsEditorProps {
  editLanguage: "uk" | "en";
}

export const EmailSettingsEditor = ({ editLanguage }: EmailSettingsEditorProps) => {
  const { settings, updateSettings, isConfigured } = useEmailSettings();
  const { toast } = useToast();
  const [localSettings, setLocalSettings] = useState<EmailSettings>(settings);
  const [isTesting, setIsTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
    toast({
      title: editLanguage === "uk" ? "Збережено!" : "Saved!",
      description: editLanguage === "uk" 
        ? "Налаштування пошти збережено." 
        : "Email settings saved.",
    });
  };

  const handleTestEmail = async () => {
    if (!localSettings.serviceId || !localSettings.templateId || !localSettings.publicKey) {
      toast({
        title: editLanguage === "uk" ? "Помилка" : "Error",
        description: editLanguage === "uk" 
          ? "Заповніть всі обов'язкові поля" 
          : "Fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    
    try {
      await emailjs.send(
        localSettings.serviceId,
        localSettings.templateId,
        {
          from_name: "Тест / Test",
          from_email: "test@example.com",
          message: editLanguage === "uk" 
            ? "Це тестове повідомлення з адмін-панелі сайту." 
            : "This is a test message from the site admin panel.",
          to_email: localSettings.recipientEmail || "admin@example.com",
        },
        localSettings.publicKey
      );

      toast({
        title: editLanguage === "uk" ? "Успішно!" : "Success!",
        description: editLanguage === "uk" 
          ? "Тестовий лист надіслано. Перевірте вашу пошту." 
          : "Test email sent. Check your inbox.",
      });
    } catch (error: any) {
      console.error("EmailJS error:", error);
      toast({
        title: editLanguage === "uk" ? "Помилка" : "Error",
        description: error?.text || (editLanguage === "uk" 
          ? "Не вдалося надіслати лист. Перевірте налаштування." 
          : "Failed to send email. Check settings."),
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {editLanguage === "uk" ? "Налаштування пошти" : "Email Settings"}
      </h2>

      {/* Status indicator */}
      <div className={`flex items-center gap-2 p-3 rounded-lg ${isConfigured ? "bg-neon-green/10 border border-neon-green/30" : "bg-neon-yellow/10 border border-neon-yellow/30"}`}>
        {isConfigured ? (
          <>
            <CheckCircle className="w-5 h-5 text-neon-green" />
            <span className="font-body text-sm text-neon-green">
              {editLanguage === "uk" ? "EmailJS налаштовано" : "EmailJS configured"}
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-neon-yellow" />
            <span className="font-body text-sm text-neon-yellow">
              {editLanguage === "uk" ? "EmailJS не налаштовано" : "EmailJS not configured"}
            </span>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-xl p-6 border border-neon-cyan/30">
        <h3 className="font-display text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {editLanguage === "uk" ? "Інструкція з налаштування" : "Setup Instructions"}
        </h3>
        <ol className="font-body text-sm text-muted-foreground space-y-2 list-decimal list-inside mb-4">
          <li>
            {editLanguage === "uk" ? "Зареєструйтесь на " : "Sign up at "}
            <a 
              href="https://www.emailjs.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline inline-flex items-center gap-1"
            >
              emailjs.com <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Додайте ваш SMTP сервер або Gmail/Outlook в розділі 'Email Services'" 
              : "Add your SMTP server or Gmail/Outlook in 'Email Services' section"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Створіть шаблон листа в 'Email Templates'" 
              : "Create an email template in 'Email Templates'"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Скопіюйте Service ID, Template ID та Public Key" 
              : "Copy Service ID, Template ID and Public Key"}
          </li>
        </ol>
        
        <div className="bg-muted/50 rounded-lg p-4 mt-4">
          <h4 className="font-body text-sm font-semibold text-foreground mb-2">
            {editLanguage === "uk" ? "Змінні для шаблону EmailJS:" : "Template variables for EmailJS:"}
          </h4>
          <code className="font-mono text-xs text-neon-cyan block">
            {"{{from_name}}"} - {editLanguage === "uk" ? "ім'я відправника" : "sender name"}<br/>
            {"{{from_email}}"} - {editLanguage === "uk" ? "email відправника" : "sender email"}<br/>
            {"{{message}}"} - {editLanguage === "uk" ? "текст повідомлення" : "message text"}<br/>
            {"{{to_email}}"} - {editLanguage === "uk" ? "email отримувача" : "recipient email"}
          </code>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-4">
        <div>
          <label className="font-body text-sm text-muted-foreground block mb-2">
            Service ID *
          </label>
          <Input
            value={localSettings.serviceId}
            onChange={(e) => setLocalSettings({ ...localSettings, serviceId: e.target.value })}
            placeholder="service_xxxxxxx"
            className="bg-muted font-mono"
          />
        </div>

        <div>
          <label className="font-body text-sm text-muted-foreground block mb-2">
            Template ID *
          </label>
          <Input
            value={localSettings.templateId}
            onChange={(e) => setLocalSettings({ ...localSettings, templateId: e.target.value })}
            placeholder="template_xxxxxxx"
            className="bg-muted font-mono"
          />
        </div>

        <div>
          <label className="font-body text-sm text-muted-foreground block mb-2">
            Public Key *
          </label>
          <div className="relative">
            <Input
              type={showKey ? "text" : "password"}
              value={localSettings.publicKey}
              onChange={(e) => setLocalSettings({ ...localSettings, publicKey: e.target.value })}
              placeholder="xxxxxxxxxxxxxx"
              className="bg-muted font-mono pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="font-body text-sm text-muted-foreground block mb-2">
            {editLanguage === "uk" ? "Email отримувача (для тестування)" : "Recipient Email (for testing)"}
          </label>
          <Input
            type="email"
            value={localSettings.recipientEmail}
            onChange={(e) => setLocalSettings({ ...localSettings, recipientEmail: e.target.value })}
            placeholder="your@email.com"
            className="bg-muted"
          />
          <p className="font-body text-xs text-muted-foreground mt-1">
            {editLanguage === "uk" 
              ? "Використовується для тестових листів та як отримувач форми" 
              : "Used for test emails and as form recipient"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Button variant="neonCyan" onClick={handleSave}>
          {editLanguage === "uk" ? "Зберегти налаштування" : "Save Settings"}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleTestEmail}
          disabled={isTesting}
        >
          {isTesting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              {editLanguage === "uk" ? "Надсилання..." : "Sending..."}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {editLanguage === "uk" ? "Надіслати тестовий лист" : "Send Test Email"}
            </span>
          )}
        </Button>
      </div>

      {/* Security Note */}
      <div className="bg-neon-magenta/10 border border-neon-magenta/30 rounded-lg p-4 mt-6">
        <h4 className="font-display font-bold text-neon-magenta mb-2">
          {editLanguage === "uk" ? "Про безпеку" : "About Security"}
        </h4>
        <p className="font-body text-sm text-muted-foreground">
          {editLanguage === "uk" 
            ? "EmailJS Public Key безпечний для використання на фронтенді. Ваші SMTP креденшали зберігаються на серверах EmailJS, а не в коді сайту." 
            : "EmailJS Public Key is safe for frontend use. Your SMTP credentials are stored on EmailJS servers, not in site code."}
        </p>
      </div>
    </div>
  );
};
