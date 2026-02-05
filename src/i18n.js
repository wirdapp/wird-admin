import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translations from "./data/translations";

// Arabic is default language if no value in the local storage OR someone inserted non-desired value
const VALID_LANGUAGES = ["ar", "en"];

// Support ?locale= querystring from wird.app URLs
const urlParams = new URLSearchParams(window.location.search);
const queryLocale = urlParams.get("locale");

let selectedLanguage = queryLocale || localStorage.getItem("lang");
if (!selectedLanguage || !VALID_LANGUAGES.includes(selectedLanguage)) selectedLanguage = "ar";

i18n
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		fallbackLng: "ar",
		interpolation: {
			escapeValue: false, // React already safes from xss
		},
		lng: selectedLanguage,
		resources: translations,
		detection: {
			lookupQuerystring: "locale",
			lookupLocalStorage: "lang",
		},
	});

export default i18n;
