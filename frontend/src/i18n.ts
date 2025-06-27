import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      home: "Home",
      signIn: "Sign In",
      logout: "Logout",
      dashboard: "Dashboard",
      language: "Language",
    },
  },
  ar: {
    translation: {
      home: "الرئيسية",
      signIn: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      language: "اللغة",
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
