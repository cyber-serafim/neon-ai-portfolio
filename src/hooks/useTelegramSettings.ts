import { useState } from "react";

// Production webhook URL - works in all browsers
const PRODUCTION_WEBHOOK_URL = "https://hook.eu1.make.com/ofaqamzyilw26rnhs4q1u6afeikuuimg";

export interface TelegramSettings {
  webhookUrl: string;
  isEnabled: boolean;
}

const STORAGE_KEY = "telegram_settings";

const defaultSettings: TelegramSettings = {
  webhookUrl: PRODUCTION_WEBHOOK_URL,
  isEnabled: true, // Enabled by default with production URL
};

// Get initial settings synchronously
const getInitialSettings = (): TelegramSettings => {
  if (typeof window === "undefined") return defaultSettings;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.error("Failed to parse telegram settings");
    }
  }
  return defaultSettings;
};

export const useTelegramSettings = () => {
  const [settings, setSettings] = useState<TelegramSettings>(getInitialSettings);

  const updateSettings = (newSettings: TelegramSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  const isConfigured = Boolean(settings.webhookUrl && settings.isEnabled);

  return { settings, updateSettings, isConfigured };
};

// Helper function to send message via Make.com webhook
export const sendTelegramMessage = async (
  webhookUrl: string,
  data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }
): Promise<void> => {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors", // Make.com handles CORS
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.origin,
    }),
  });

  // With no-cors we can't read response, but if no error thrown, assume success
  return;
};
