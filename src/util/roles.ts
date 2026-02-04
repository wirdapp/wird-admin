import i18n from 'i18next';

export enum Role {
  CONTEST_OWNER = 0,
  SUPER_ADMIN = 1,
  ADMIN = 2,
  MEMBER = 3,
  READ_ONLY_MEMBER = 4,
  PENDING = 5,
  DEACTIVATED = 6,
}

export const isOwner = (role: Role | undefined): boolean =>
  role !== undefined && Role.CONTEST_OWNER === role;

export const isSuperAdmin = (role: Role | undefined): boolean =>
  role !== undefined && Role.SUPER_ADMIN === role;

export const isAtLeastSuperAdmin = (role: Role | undefined): boolean =>
  role !== undefined && (isSuperAdmin(role) || isOwner(role));

export const isAdmin = (role: Role | undefined): boolean =>
  role !== undefined && Role.ADMIN === role;

export const isAtLeastAdmin = (role: Role | undefined): boolean =>
  role !== undefined && (isAdmin(role) || isSuperAdmin(role) || isOwner(role));

export const isMember = (role: Role | undefined): boolean =>
  role !== undefined && Role.MEMBER === role;

export const isMemberReadOnly = (role: Role | undefined): boolean =>
  role !== undefined && Role.READ_ONLY_MEMBER === role;

export const isPending = (role: Role | undefined): boolean =>
  role !== undefined && Role.PENDING === role;

export const isDeactivated = (role: Role | undefined): boolean =>
  role !== undefined && Role.DEACTIVATED === role;

const VALID_LANGUAGES = ['ar', 'en'] as const;
type ValidLanguage = (typeof VALID_LANGUAGES)[number];

export const changeLanguage = (language: string): void => {
  if (VALID_LANGUAGES.includes(language as ValidLanguage)) {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  }
};
