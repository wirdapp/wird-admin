import i18n from "i18next";

export const Role = Object.freeze({
  CONTEST_OWNER: 0,
  SUPER_ADMIN: 1,
  ADMIN: 2,
  MEMBER: 3,
  READ_ONLY_MEMBER: 4,
  PENDING: 5,
  DEACTIVATED: 6,
});

export const isSuperAdmin = (user) => {
  return Role.SUPER_ADMIN === user?.role;
};

const VALID_LANGUAGES = ["ar", "en"];

export const changeLanguage = (language) => {
  if (VALID_LANGUAGES.includes(language)) {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
    // document.documentElement.setAttribute("lang", newLang);
    // setLanguage({ lang: newLang });
  }
};
