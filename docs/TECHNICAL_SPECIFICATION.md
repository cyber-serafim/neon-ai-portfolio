# Технічне завдання
## Персональний веб-сайт IT-спеціаліста — Антон Падура

---

## 1. Загальні відомості

| Параметр | Значення |
|----------|----------|
| **Назва проекту** | Персональний веб-сайт IT-спеціаліста |
| **Замовник** | Антон Падура |
| **Тип додатку** | Single Page Application (SPA) |
| **Технологічний стек** | React 18, TypeScript, Vite, Tailwind CSS |
| **Цільова платформа** | Веб-браузери (десктоп + мобільні пристрої) |
| **Мови інтерфейсу** | Українська, Англійська |
| **URL продакшн** | https://padura.lovable.app |

---

## 2. Призначення системи

Система призначена для представлення професійного портфоліо IT-спеціаліста з 15+ роками досвіду в галузі інформаційної безпеки, системного адміністрування та IT-менеджменту.

### 2.1 Цільова аудиторія
- Потенційні роботодавці
- Бізнес-партнери
- Клієнти в сфері IT-безпеки та телекомунікацій

### 2.2 Ключові функції
1. Презентація професійного досвіду та навичок
2. Двомовний інтерфейс (UA/EN)
3. Форма зворотного зв'язку
4. Адміністративна панель для редагування контенту
5. Експорт/імпорт даних для резервного копіювання

---

## 3. Архітектура проекту

### 3.1 Архітектурні рішення

```
┌─────────────────────────────────────────────────────────────┐
│                    Клієнтський застосунок                    │
│                        (Client-Side)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   React Router  │  │  React Context  │  │   TanStack  │  │
│  │   (Навігація)   │  │    (Стан)       │  │    Query    │  │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘  │
│           │                    │                   │         │
│  ┌────────▼─────────────────────▼──────────────────▼──────┐  │
│  │                   Компоненти React                     │  │
│  │   (UI Components + Page Components + Admin Panel)      │  │
│  └────────────────────────────────────────────────────────┘  │
│           │                    │                   │         │
│  ┌────────▼────────┐  ┌────────▼────────┐  ┌──────▼──────┐  │
│  │   localStorage  │  │  sessionStorage │  │   EmailJS   │  │
│  │   (Контент)     │  │  (Авторизація)  │  │   (Email)   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Обмеження архітектури

> **ВАЖЛИВО:** Проект побудований як чисто клієнтський застосунок без серверної частини.

- Всі дані зберігаються в `localStorage` браузера
- Авторизація здійснюється через `sessionStorage` (не безпечно для production)
- Відправка листів через сторонній сервіс EmailJS

---

## 4. Структура каталогів

```
padura/
├── public/                      # Статичні файли
│   ├── padura_am.png           # Фото профілю
│   ├── opengraph-image.png     # OG-зображення для соц. мереж
│   ├── thumbnail.jpg           # Мініатюра
│   ├── robots.txt              # Налаштування для пошукових роботів
│   └── favicon.ico             # Іконка сайту
│
├── src/                         # Вихідний код
│   ├── components/             # React компоненти
│   │   ├── ui/                 # Базові UI компоненти (shadcn/ui)
│   │   ├── admin/              # Компоненти адмін панелі
│   │   ├── Navigation.tsx      # Навігаційна панель
│   │   ├── HeroSection.tsx     # Головна секція
│   │   ├── AboutSection.tsx    # Секція "Про мене"
│   │   ├── ExperienceSection.tsx # Секція досвіду
│   │   ├── EducationSection.tsx  # Секція освіти
│   │   ├── ContactSection.tsx    # Секція контактів
│   │   ├── Footer.tsx           # Підвал сайту
│   │   ├── LanguageSwitcher.tsx # Перемикач мов
│   │   ├── NavLink.tsx          # Посилання навігації
│   │   └── ProtectedRoute.tsx   # Захищений маршрут
│   │
│   ├── contexts/               # React контексти (глобальний стан)
│   │   ├── AuthContext.tsx     # Контекст авторизації
│   │   ├── ContentContext.tsx  # Контекст контенту сайту
│   │   └── LanguageContext.tsx # Контекст мови інтерфейсу
│   │
│   ├── hooks/                  # Кастомні хуки
│   │   ├── useTranslatedContent.ts # Хук перекладу контенту
│   │   ├── useEmailSettings.ts     # Хук налаштувань email
│   │   ├── use-toast.ts            # Хук сповіщень
│   │   └── use-mobile.tsx          # Хук визначення мобільних
│   │
│   ├── pages/                  # Сторінки застосунку
│   │   ├── Index.tsx           # Головна сторінка
│   │   ├── Login.tsx           # Сторінка авторизації
│   │   ├── Admin.tsx           # Адміністративна панель
│   │   └── NotFound.tsx        # Сторінка 404
│   │
│   ├── data/                   # Статичні дані
│   │   └── translations.ts     # Переклади контенту
│   │
│   ├── lib/                    # Утиліти
│   │   └── utils.ts            # Допоміжні функції
│   │
│   ├── App.tsx                 # Кореневий компонент
│   ├── App.css                 # Глобальні стилі компонента
│   ├── index.css               # Глобальні CSS стилі + Tailwind
│   ├── main.tsx                # Точка входу
│   └── vite-env.d.ts           # Типи Vite
│
├── docs/                        # Документація
│   └── TECHNICAL_SPECIFICATION.md # Технічне завдання
│
├── tailwind.config.ts          # Конфігурація Tailwind CSS
├── vite.config.ts              # Конфігурація Vite
├── tsconfig.json               # Конфігурація TypeScript
├── package.json                # Залежності проекту
└── index.html                  # HTML-шаблон
```

---

## 5. Технологічний стек

### 5.1 Основні технології

| Технологія | Версія | Призначення |
|------------|--------|-------------|
| **React** | 18.3.1 | UI-фреймворк |
| **TypeScript** | 5.x | Типізація коду |
| **Vite** | 5.x | Збірка та dev-сервер |
| **Tailwind CSS** | 3.x | CSS-фреймворк |
| **React Router DOM** | 6.30.1 | Маршрутизація |
| **TanStack Query** | 5.83.0 | Управління запитами |

### 5.2 UI-компоненти

| Бібліотека | Призначення |
|------------|-------------|
| **shadcn/ui** | Базові UI-компоненти |
| **Radix UI** | Примітиви компонентів |
| **Lucide React** | Іконки |
| **Sonner** | Toast-сповіщення |

### 5.3 Додаткові залежності

| Бібліотека | Версія | Призначення |
|------------|--------|-------------|
| **@emailjs/browser** | 4.4.1 | Відправка email |
| **react-hook-form** | 7.61.1 | Управління формами |
| **zod** | 3.25.76 | Валідація даних |
| **date-fns** | 3.6.0 | Робота з датами |
| **recharts** | 2.15.4 | Графіки |
| **framer-motion** | — | Анімації (рекомендовано) |

---

## 6. Детальний опис компонентів

### 6.1 Контексти (Context API)

#### 6.1.1 AuthContext (`src/contexts/AuthContext.tsx`)

**Призначення:** Управління авторизацією адміністратора.

```typescript
interface AuthContextType {
  isAuthenticated: boolean;    // Статус авторизації
  login: (username: string, password: string) => boolean;  // Вхід
  logout: () => void;          // Вихід
}
```

**Особливості:**
- Авторизація зберігається в `sessionStorage`
- Облікові дані зашиті в коді (⚠️ НЕ безпечно для production)
- При закритті браузера сесія автоматично завершується

#### 6.1.2 ContentContext (`src/contexts/ContentContext.tsx`)

**Призначення:** Централізоване управління контентом сайту.

```typescript
interface BilingualContent {
  uk: SiteContent;  // Український контент
  en: SiteContent;  // Англійський контент
}

interface SiteContent {
  hero: HeroContent;           // Головна секція
  about: AboutContent;         // Про мене
  experiences: Experience[];   // Досвід роботи
  education: Education[];      // Освіта
  certificates: Certificate[]; // Сертифікати
  languages: Language[];       // Мови
  contact: ContactInfo;        // Контактна інформація
}
```

**Особливості:**
- Дані зберігаються в `localStorage` під ключем `site_content_bilingual`
- Підтримка міграції зі старого односмовного формату
- Функціональні оновлення стану для запобігання втраті даних

#### 6.1.3 LanguageContext (`src/contexts/LanguageContext.tsx`)

**Призначення:** Управління мовою інтерфейсу.

```typescript
type Language = "uk" | "en";

interface LanguageContextType {
  language: Language;                    // Поточна мова
  setLanguage: (lang: Language) => void; // Зміна мови
  t: Translations;                       // Об'єкт перекладів
}
```

**Особливості:**
- Мова зберігається в `localStorage` під ключем `site_language`
- Переклади UI-елементів (навігація, форми, кнопки)
- За замовчуванням — українська мова

---

### 6.2 Кастомні хуки

#### 6.2.1 useTranslatedContent (`src/hooks/useTranslatedContent.ts`)

**Призначення:** Отримання контенту для поточної мови.

```typescript
export const useTranslatedContent = (): SiteContent => {
  // Логіка визначення кастомного vs дефолтного контенту
  // Повертає контент для активної мови
}
```

**Алгоритм:**
1. Отримує поточну мову з `LanguageContext`
2. Порівнює збережений контент із дефолтним
3. Якщо контент модифіковано — повертає збережений
4. Інакше — повертає дефолтні переклади

---

### 6.3 Сторінки

#### 6.3.1 Index (`src/pages/Index.tsx`)

**Призначення:** Головна публічна сторінка.

**Структура:**
```jsx
<main>
  <Navigation />        // Верхня навігація
  <HeroSection />       // Привітальна секція
  <AboutSection />      // Про мене
  <ExperienceSection /> // Досвід роботи
  <EducationSection />  // Освіта та сертифікати
  <ContactSection />    // Форма зв'язку
  <Footer />            // Підвал
</main>
```

#### 6.3.2 Login (`src/pages/Login.tsx`)

**Призначення:** Форма авторизації адміністратора.

**URL:** `/login`

#### 6.3.3 Admin (`src/pages/Admin.tsx`)

**Призначення:** Адміністративна панель редагування контенту.

**URL:** `/admin` (захищений маршрут)

**Можливості:**
- Редагування всіх секцій сайту
- Перемикач мови редагування (UA/EN)
- Попередній перегляд змін
- Експорт/імпорт контенту (JSON)
- Налаштування EmailJS

#### 6.3.4 NotFound (`src/pages/NotFound.tsx`)

**Призначення:** Сторінка помилки 404.

**URL:** `*` (всі невідомі маршрути)

---

### 6.4 Компоненти секцій

| Компонент | Файл | Опис |
|-----------|------|------|
| **Navigation** | `Navigation.tsx` | Фіксована навігація з перемикачем мов |
| **HeroSection** | `HeroSection.tsx` | Ім'я, посада, статистика, CTA-кнопки |
| **AboutSection** | `AboutSection.tsx` | Фото, опис, персональні дані, навички |
| **ExperienceSection** | `ExperienceSection.tsx` | Хронологія досвіду роботи |
| **EducationSection** | `EducationSection.tsx` | Освіта, сертифікати, мови |
| **ContactSection** | `ContactSection.tsx` | Контактні дані + форма зворотного зв'язку |
| **Footer** | `Footer.tsx` | Копірайт, посилання |

---

## 7. Дизайн-система

### 7.1 Тема оформлення: Cyberpunk Dark

**Філософія:** Футуристичний кіберпанк-стиль із неоновими акцентами.

### 7.2 Кольорова палітра

```css
/* Основні кольори */
--background: 230 25% 5%;        /* Темний фон */
--foreground: 180 100% 95%;      /* Світлий текст */

/* Неонові акценти */
--neon-cyan: 180 100% 50%;       /* Блакитний неон (primary) */
--neon-magenta: 300 100% 50%;    /* Пурпурний неон (secondary) */
--neon-purple: 270 100% 60%;     /* Фіолетовий (accent) */
--neon-green: 150 100% 50%;      /* Зелений */
--neon-blue: 220 100% 60%;       /* Синій */

/* Світіння */
--glow-cyan: 0 0 20px hsl(180 100% 50% / 0.5), ...;
--glow-magenta: 0 0 20px hsl(300 100% 50% / 0.5), ...;
```

### 7.3 Типографіка

| Призначення | Шрифт | Використання |
|-------------|-------|--------------|
| **Display** | Orbitron | Заголовки, логотип |
| **Body** | Rajdhani | Основний текст |

```css
--font-display: 'Orbitron', sans-serif;
--font-body: 'Rajdhani', sans-serif;
```

### 7.4 CSS-класи компонентів

| Клас | Опис |
|------|------|
| `.neon-text-cyan` | Текст із блакитним неоновим світінням |
| `.neon-text-magenta` | Текст із пурпурним неоновим світінням |
| `.neon-border-cyan` | Рамка із блакитним світінням |
| `.neon-border-magenta` | Рамка із пурпурним світінням |
| `.glass-card` | Скляний ефект картки (blur + напівпрозорість) |
| `.cyber-grid` | Фонова сітка в стилі кіберпанк |
| `.text-gradient-neon` | Градієнтний текст cyan→magenta |

### 7.5 Анімації

| Назва | Опис |
|-------|------|
| `animate-pulse-neon` | Пульсуючий неоновий ефект |
| `animate-float` | Плаваючий ефект |
| `animate-glitch` | Ефект глітчу |
| `animate-fade-in` | Поява з прозорості |
| `animate-glow-pulse` | Пульсуюче світіння |

---

## 8. Маршрутизація

### 8.1 Таблиця маршрутів

| Шлях | Компонент | Захист | Опис |
|------|-----------|--------|------|
| `/` | `Index` | ❌ | Публічна головна сторінка |
| `/login` | `Login` | ❌ | Вхід адміністратора |
| `/admin` | `Admin` | ✅ | Панель адміністратора |
| `*` | `NotFound` | ❌ | Сторінка 404 |

### 8.2 Захищені маршрути

Реалізовано через компонент `ProtectedRoute`:

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
```

Логіка: якщо `isAuthenticated === false`, перенаправлення на `/login`.

---

## 9. Управління даними

### 9.1 localStorage

| Ключ | Тип даних | Опис |
|------|-----------|------|
| `site_content_bilingual` | `BilingualContent` | Контент сайту (UK+EN) |
| `site_language` | `"uk" \| "en"` | Обрана мова |
| `emailjs_settings` | `EmailSettings` | Налаштування EmailJS |

### 9.2 sessionStorage

| Ключ | Тип даних | Опис |
|------|-----------|------|
| `admin_auth` | `"true"` | Статус авторизації |

### 9.3 Структура контенту (SiteContent)

```typescript
interface SiteContent {
  hero: {
    name: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  about: {
    description: string;
    personalInfo: { label: string; value: string }[];
    skills: string[];
    profilePhoto?: string;
  };
  experiences: {
    company: string;
    period: string;
    title: string;
    responsibilities: string[];
    link?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    period: string;
  }[];
  certificates: {
    name: string;
    year: string;
  }[];
  languages: {
    name: string;
    level: string;
    percentage: number;
  }[];
  contact: {
    phone: string;
    email: string;
    location: string;
    collaborationTitle: string;
    collaborationText: string;
  };
}
```

---

## 10. Форма зворотного зв'язку

### 10.1 Інтеграція з EmailJS

**Бібліотека:** `@emailjs/browser`

**Налаштування (зберігаються в localStorage):**
- `serviceId` — ID сервісу EmailJS
- `templateId` — ID шаблону листа
- `publicKey` — Публічний ключ

### 10.2 Поля форми

| Поле | Тип | Валідація |
|------|-----|-----------|
| `name` | text | Обов'язкове |
| `email` | email | Обов'язкове, формат email |
| `message` | textarea | Обов'язкове |

---

## 11. Адміністративна панель

### 11.1 Функціональність

| Секція | Можливості |
|--------|------------|
| **Hero** | Редагування імені, посади, опису, статистики |
| **About** | Опис, персональна інформація, навички |
| **Experience** | Додавання/видалення місць роботи |
| **Education** | Додавання/видалення освіти |
| **Certificates** | Додавання/видалення сертифікатів |
| **Languages** | Редагування мов та рівнів |
| **Contact** | Контактні дані, текст співпраці |
| **Email Settings** | Налаштування EmailJS |
| **Export & Deploy** | Бекап/відновлення, інструкції деплою |

### 11.2 Особливості

- **Перемикач мов** — редагування UA та EN версій окремо
- **Попередній перегляд** — модальне вікно з превью змін
- **Збереження** — зберігає обидві мовні версії одночасно
- **Скидання** — відновлення до дефолтних значень
- **Експорт** — завантаження JSON-бекапу
- **Імпорт** — відновлення з JSON-файлу

---

## 12. SEO та Open Graph

### 12.1 Meta-теги (index.html)

```html
<title>Антон Падура | IT Security Specialist</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="/opengraph-image.png">
```

### 12.2 Статичні файли

| Файл | Розмір | Призначення |
|------|--------|-------------|
| `opengraph-image.png` | 1200x630 | Зображення для соц. мереж |
| `thumbnail.jpg` | 400x300 | Мініатюра |
| `robots.txt` | — | Інструкції для пошукових роботів |

---

## 13. Розгортання (Deployment)

### 13.1 Команди збірки

```bash
# Встановлення залежностей
npm install

# Запуск dev-сервера
npm run dev

# Продакшн-збірка
npm run build

# Перегляд продакшн-збірки
npm run preview
```

### 13.2 Варіанти хостингу

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
# (не потрібні для клієнтської версії)
```

#### Vercel
```bash
# Framework preset
Vite

# Build command
npm run build

# Output directory
dist
```

#### VPS (nginx)
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/padura/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 14. Безпека

### 14.1 Поточні обмеження (⚠️)

| Проблема | Опис | Рекомендація |
|----------|------|--------------|
| Облікові дані в коді | Логін/пароль зашиті в `AuthContext.tsx` | Перенести на бекенд |
| localStorage | Дані можна модифікувати через DevTools | Використати серверну БД |
| Відсутність HTTPS | Залежить від хостингу | Налаштувати SSL |

### 14.2 Рекомендації для продакшн

1. **Авторизація** — використати OAuth2 або JWT через бекенд
2. **Дані** — перенести контент у базу даних
3. **API** — створити захищені ендпоінти для редагування
4. **CORS** — налаштувати політики доступу

---

## 15. Тестування

### 15.1 Рекомендовані тести

| Тип | Інструмент | Область |
|-----|------------|---------|
| Unit | Vitest | Хуки, утиліти |
| Component | React Testing Library | Компоненти |
| E2E | Playwright/Cypress | Форми, навігація |

### 15.2 Критичні сценарії

1. Перемикання мов — контент змінюється коректно
2. Авторизація — захист `/admin` працює
3. Форма контактів — валідація + відправка
4. Експорт/імпорт — дані зберігаються коректно

---

## 16. Подальший розвиток

### 16.1 Рекомендовані покращення

- [ ] Серверна авторизація (Supabase Auth)
- [ ] База даних для контенту (PostgreSQL)
- [ ] Редактор зображень у адмін панелі
- [ ] Мультимовний URL (i18n routing)
- [ ] Аналітика (Google Analytics / Plausible)
- [ ] PWA підтримка (Service Worker)
- [ ] Dark/Light theme toggle
- [ ] Анімації Framer Motion

---

## 17. Контакти та підтримка

| Параметр | Значення |
|----------|----------|
| **Автор проекту** | Антон Падура |
| **Email** | anton.padura@proton.me |
| **Телефон** | +380958777997 |
| **Локація** | Київ, Україна |

---

## Додаток А: Повний список залежностей

```json
{
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-*": "latest",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.25.76"
  }
}
```

---

**Дата створення документа:** 14 січня 2026  
**Версія документа:** 1.0
