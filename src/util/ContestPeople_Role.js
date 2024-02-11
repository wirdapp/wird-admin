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
export const isOwner = (role) => {
  return Role.CONTEST_OWNER === role;
};

export const isSuperAdmin = (role) => {
  return Role.SUPER_ADMIN === role;
};

export const isAtLeastSuperAdmin = (role) => {
  return isSuperAdmin(role) || isOwner(role);
};

export const isAdmin = (role) => {
  return Role.ADMIN === role;
};

export const isAtLeastAdmin = (role) => {
  return isAdmin(role) || isSuperAdmin(role) || isOwner(role);
};

export const isMember = (role) => {
  return Role.MEMBER === role;
};
export const isMemberReadOnly = (role) => {
  return Role.READ_ONLY_MEMBER === role;
};

export const isPending = (role) => {
  return Role.PENDING === role;
};

export const isDeactivated = (role) => {
  return Role.DEACTIVATED === role;
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
