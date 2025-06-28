import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      home: "Student Dashboard",
      signIn: "Sign In",
      logout: "Logout",
      dashboard: "Dashboard",
      language: "Language",
      welcome: "Welcome to Student Dashboard",
    },
  },
  ar: {
    translation: {
      home: "لوحة الطالب",
      signIn: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      language: "اللغة",
      welcome: "مرحبًا بك في لوحة الطالب",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
