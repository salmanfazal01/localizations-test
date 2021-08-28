import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import firebase from "./firebase";

const EN = "en";
const TRANSLATIONS = "translations";

const options = {
  // order and from where user language should be detected
  order: [
    "navigator",
    "querystring",
    "cookie",
    "localStorage",
    "htmlTag",
    "path",
    "subdomain",
  ],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      detection: options,
      lng: EN,
      fallbackLng: EN,
      ns: [TRANSLATIONS],
      defaultNS: TRANSLATIONS,
      debug: false,
      keySeparator: false,
      resources: {},
      interpolation: {
        escapeValue: false,
        format: (value, format) => {
          if (format === "uppercase") {
            return value.toUpperCase();
          }
          return value;
        },
      },
      react: {
        bindI18n: "languageChanged loaded",
        nsMode: "fallback",
      },
    },
    (err, t) => {
      if (err) {
        /* eslint-disable no-console */
        return console.log("Something went wrong loading", err);
      }
      return t(TRANSLATIONS);
    }
  )
  .then(() => {
    firebase
      .database()
      .ref("locales")
      .once("value")
      .then((snap) => {
        const snapshot = snap.val() || {};

        Object.keys(snapshot).map((_lang) => {
          i18n.addResourceBundle(_lang, "translations", snapshot[_lang]);
        });
      });
  });

export default i18n;
