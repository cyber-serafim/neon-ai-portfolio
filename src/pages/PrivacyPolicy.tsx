import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    uk: {
      title: "Політика конфіденційності",
      backToHome: "На головну",
      lastUpdated: "Останнє оновлення: Січень 2025",
      sections: [
        {
          title: "1. Загальні положення",
          content: `Ця Політика конфіденційності описує, як ми збираємо, використовуємо та захищаємо вашу персональну інформацію, коли ви використовуєте наш веб-сайт. Ми поважаємо вашу приватність та зобов'язуємося захищати ваші персональні дані відповідно до чинного законодавства України та міжнародних стандартів.`
        },
        {
          title: "2. Які дані ми збираємо",
          content: `Ми можемо збирати наступну інформацію:
• Ім'я та прізвище
• Контактні дані, включаючи адресу електронної пошти та номер телефону
• Повідомлення, які ви надсилаєте через контактну форму
• Технічні дані про ваш візит (IP-адреса, тип браузера, час відвідування)`
        },
        {
          title: "3. Як ми використовуємо ваші дані",
          content: `Ми використовуємо зібрану інформацію для:
• Відповіді на ваші запити та повідомлення
• Покращення нашого веб-сайту та послуг
• Надсилання інформації, яку ви запросили
• Забезпечення безпеки та запобігання шахрайству`
        },
        {
          title: "4. Захист ваших даних",
          content: `Ми вживаємо відповідних технічних та організаційних заходів для захисту вашої персональної інформації від несанкціонованого доступу, втрати або знищення. Доступ до ваших даних мають лише уповноважені особи, які зобов'язані зберігати конфіденційність.`
        },
        {
          title: "5. Ваші права",
          content: `Відповідно до законодавства про захист персональних даних, ви маєте право:
• Отримати доступ до своїх персональних даних
• Вимагати виправлення неточних даних
• Вимагати видалення ваших даних
• Відкликати згоду на обробку даних
• Подати скаргу до контролюючого органу`
        },
        {
          title: "6. Файли cookie",
          content: `Наш веб-сайт може використовувати файли cookie для покращення вашого досвіду користування. Ви можете налаштувати свій браузер для відхилення всіх або деяких файлів cookie.`
        },
        {
          title: "7. Контактна інформація",
          content: `Якщо у вас є запитання щодо цієї Політики конфіденційності або обробки ваших персональних даних, будь ласка, зв'яжіться з нами через контактну форму на сайті.`
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      backToHome: "Back to Home",
      lastUpdated: "Last updated: January 2025",
      sections: [
        {
          title: "1. General Provisions",
          content: `This Privacy Policy describes how we collect, use, and protect your personal information when you use our website. We respect your privacy and are committed to protecting your personal data in accordance with applicable Ukrainian law and international standards.`
        },
        {
          title: "2. What Data We Collect",
          content: `We may collect the following information:
• First and last name
• Contact details, including email address and phone number
• Messages you send through the contact form
• Technical data about your visit (IP address, browser type, visit time)`
        },
        {
          title: "3. How We Use Your Data",
          content: `We use the collected information to:
• Respond to your inquiries and messages
• Improve our website and services
• Send information you have requested
• Ensure security and prevent fraud`
        },
        {
          title: "4. Protecting Your Data",
          content: `We take appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or destruction. Only authorized persons who are obligated to maintain confidentiality have access to your data.`
        },
        {
          title: "5. Your Rights",
          content: `Under data protection legislation, you have the right to:
• Access your personal data
• Request correction of inaccurate data
• Request deletion of your data
• Withdraw consent to data processing
• Lodge a complaint with a supervisory authority`
        },
        {
          title: "6. Cookies",
          content: `Our website may use cookies to improve your browsing experience. You can configure your browser to reject all or some cookies.`
        },
        {
          title: "7. Contact Information",
          content: `If you have any questions about this Privacy Policy or the processing of your personal data, please contact us through the contact form on the website.`
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neon-magenta/5 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-body">{t.backToHome}</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 neon-text-cyan">
            {t.title}
          </h1>
          <p className="font-body text-muted-foreground mb-12">
            {t.lastUpdated}
          </p>

          {/* Sections */}
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <section 
                key={index}
                className="p-6 rounded-lg bg-card/50 border border-border/30 backdrop-blur-sm"
              >
                <h2 className="font-display text-xl font-semibold mb-4 text-neon-magenta">
                  {section.title}
                </h2>
                <p className="font-body text-foreground/80 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
