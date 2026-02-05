import { useState, useEffect } from "react";
import { Send, ExternalLink, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTelegramSettings, TelegramSettings, sendTelegramMessage } from "@/hooks/useTelegramSettings";
import { useToast } from "@/hooks/use-toast";

interface TelegramSettingsEditorProps {
  editLanguage: "uk" | "en";
}

export const TelegramSettingsEditor = ({ editLanguage }: TelegramSettingsEditorProps) => {
  const { settings, updateSettings, isConfigured } = useTelegramSettings();
  const { toast } = useToast();
  const [localSettings, setLocalSettings] = useState<TelegramSettings>(settings);
  const [isTesting, setIsTesting] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
    toast({
      title: editLanguage === "uk" ? "Збережено!" : "Saved!",
      description: editLanguage === "uk" 
        ? "Налаштування Telegram збережено." 
        : "Telegram settings saved.",
    });
  };

  const handleTestMessage = async () => {
    if (!localSettings.webhookUrl) {
      toast({
        title: editLanguage === "uk" ? "Помилка" : "Error",
        description: editLanguage === "uk" 
          ? "Введіть URL вебхука Make.com" 
          : "Enter Make.com webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    
    try {
      await sendTelegramMessage(localSettings.webhookUrl, {
        name: "Тест / Test",
        email: "test@example.com",
        phone: "+380000000000",
        message: editLanguage === "uk" 
          ? "Це тестове повідомлення з адмін-панелі сайту." 
          : "This is a test message from the site admin panel.",
      });

      toast({
        title: editLanguage === "uk" ? "Запит надіслано!" : "Request Sent!",
        description: editLanguage === "uk" 
          ? "Перевірте ваш Telegram. Повідомлення має надійти протягом кількох секунд." 
          : "Check your Telegram. Message should arrive within seconds.",
      });
    } catch (error: any) {
      console.error("Webhook error:", error);
      toast({
        title: editLanguage === "uk" ? "Помилка" : "Error",
        description: editLanguage === "uk" 
          ? "Не вдалося надіслати запит. Перевірте URL вебхука." 
          : "Failed to send request. Check webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {editLanguage === "uk" ? "Налаштування Telegram" : "Telegram Settings"}
      </h2>

      {/* Status indicator */}
      <div className={`flex items-center gap-2 p-3 rounded-lg ${isConfigured ? "bg-neon-green/10 border border-neon-green/30" : "bg-neon-yellow/10 border border-neon-yellow/30"}`}>
        {isConfigured ? (
          <>
            <CheckCircle className="w-5 h-5 text-neon-green" />
            <span className="font-body text-sm text-neon-green">
              {editLanguage === "uk" ? "Telegram налаштовано" : "Telegram configured"}
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-neon-yellow" />
            <span className="font-body text-sm text-neon-yellow">
              {editLanguage === "uk" ? "Telegram не налаштовано" : "Telegram not configured"}
            </span>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-xl p-6 border border-neon-cyan/30">
        <h3 className="font-display text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
          <Send className="w-5 h-5" />
          {editLanguage === "uk" ? "Інструкція з налаштування Make.com" : "Make.com Setup Instructions"}
        </h3>
        <ol className="font-body text-sm text-muted-foreground space-y-3 list-decimal list-inside mb-4">
          <li>
            {editLanguage === "uk" ? "Зареєструйтесь на " : "Sign up at "}
            <a 
              href="https://www.make.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline inline-flex items-center gap-1"
            >
              make.com <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Створіть новий сценарій (Scenario)" 
              : "Create a new Scenario"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Додайте модуль 'Webhooks' → 'Custom webhook' як тригер" 
              : "Add 'Webhooks' → 'Custom webhook' module as trigger"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Додайте модуль 'Telegram Bot' → 'Send a Message'" 
              : "Add 'Telegram Bot' → 'Send a Message' module"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Налаштуйте шаблон повідомлення з полями: name, email, phone, message" 
              : "Configure message template with fields: name, email, phone, message"}
          </li>
          <li>
            {editLanguage === "uk" 
              ? "Скопіюйте URL вебхука та вставте нижче" 
              : "Copy webhook URL and paste below"}
          </li>
        </ol>
        
        <div className="bg-muted/50 rounded-lg p-4 mt-4">
          <h4 className="font-body text-sm font-semibold text-foreground mb-2">
            {editLanguage === "uk" ? "Доступні поля для шаблону:" : "Available fields for template:"}
          </h4>
          <code className="font-mono text-xs text-neon-cyan block">
            name - {editLanguage === "uk" ? "ім'я відправника" : "sender name"}<br/>
            email - {editLanguage === "uk" ? "email відправника" : "sender email"}<br/>
            phone - {editLanguage === "uk" ? "телефон відправника" : "sender phone"}<br/>
            message - {editLanguage === "uk" ? "текст повідомлення" : "message text"}<br/>
            timestamp - {editLanguage === "uk" ? "час відправки" : "send time"}<br/>
            source - {editLanguage === "uk" ? "URL сайту" : "website URL"}
          </code>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <label className="font-body text-sm text-foreground block">
              {editLanguage === "uk" ? "Увімкнути Telegram сповіщення" : "Enable Telegram notifications"}
            </label>
            <p className="font-body text-xs text-muted-foreground mt-1">
              {editLanguage === "uk" 
                ? "Використовувати Telegram замість Email для форми контактів" 
                : "Use Telegram instead of Email for contact form"}
            </p>
          </div>
          <Switch
            checked={localSettings.isEnabled}
            onCheckedChange={(checked) => setLocalSettings({ ...localSettings, isEnabled: checked })}
          />
        </div>

        <div>
          <label className="font-body text-sm text-muted-foreground block mb-2">
            Make.com Webhook URL *
          </label>
          <div className="relative">
            <Input
              type={showUrl ? "text" : "password"}
              value={localSettings.webhookUrl}
              onChange={(e) => setLocalSettings({ ...localSettings, webhookUrl: e.target.value })}
              placeholder="https://hook.eu2.make.com/xxxxxxxxxxxxxxx"
              className="bg-muted font-mono pr-10"
            />
            <button
              type="button"
              onClick={() => setShowUrl(!showUrl)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Button variant="neonCyan" onClick={handleSave}>
          {editLanguage === "uk" ? "Зберегти налаштування" : "Save Settings"}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleTestMessage}
          disabled={isTesting || !localSettings.webhookUrl}
        >
          {isTesting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              {editLanguage === "uk" ? "Надсилання..." : "Sending..."}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {editLanguage === "uk" ? "Надіслати тестове повідомлення" : "Send Test Message"}
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
            ? "Токен вашого Telegram бота зберігається на серверах Make.com. В коді сайту зберігається лише URL вебхука, який без токена не дає доступу до бота." 
            : "Your Telegram bot token is stored on Make.com servers. Only the webhook URL is stored in the site code, which doesn't grant bot access without the token."}
        </p>
      </div>
    </div>
  );
};
