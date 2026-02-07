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
  // NOTE:
  // We use `mode: "no-cors"` so the request can be sent from any browser even if
  // the webhook doesn't provide CORS headers.
  // In `no-cors`, browsers only allow "simple" request headers, so JSON
  // (`Content-Type: application/json`) may be downgraded and Make may not parse it.
  // Sending as x-www-form-urlencoded keeps it "simple" and Make can map fields.

  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
    source: typeof window !== "undefined" ? window.location.origin : "",
  };

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue;
    body.set(key, String(value));
  }

  await fetch(webhookUrl, {
    method: "POST",
    mode: "no-cors",
    body,
  });

  // With no-cors we can't read response, but if no error thrown, assume success
  return;
};

