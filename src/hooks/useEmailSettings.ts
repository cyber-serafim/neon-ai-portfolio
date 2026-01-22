import { useState, useEffect } from "react";

export interface EmailSettings {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recipientEmail: string;
}

const STORAGE_KEY = "email_settings";

const defaultSettings: EmailSettings = {
  serviceId: "",
  templateId: "",
  publicKey: "",
  recipientEmail: "",
};

// Get initial settings synchronously to avoid hydration mismatch
const getInitialSettings = (): EmailSettings => {
  if (typeof window === "undefined") return defaultSettings;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.error("Failed to parse email settings");
    }
  }
  return defaultSettings;
};

export const useEmailSettings = () => {
  const [settings, setSettings] = useState<EmailSettings>(getInitialSettings);

  const updateSettings = (newSettings: EmailSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  const isConfigured = Boolean(
    settings.serviceId && 
    settings.templateId && 
    settings.publicKey
  );

  return { settings, updateSettings, isConfigured };
};
