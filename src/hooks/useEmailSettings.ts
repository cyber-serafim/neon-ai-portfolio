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

export const useEmailSettings = () => {
  const [settings, setSettings] = useState<EmailSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        console.error("Failed to parse email settings");
      }
    }
  }, []);

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
