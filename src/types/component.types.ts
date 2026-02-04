import { ReactNode } from 'react';
import { Person, Contest, ContestRaw, Role, AllNotification, ContestPerson } from './api.types';

// ============================================================================
// DASHBOARD CONTEXT TYPES
// ============================================================================

/** User enriched with contest role from current contest */
export interface EnrichedUser extends Person {
  role?: Role;
  email_verified?: boolean;
}

/** Dashboard context value provided by DashboardDataProvider */
export interface DashboardContextValue {
  currentUser: EnrichedUser | null;
  contests: ContestRaw[];
  currentContest: Contest | null;
  notifications: AllNotification[];
}

// ============================================================================
// COMMON PROP PATTERNS
// ============================================================================

/** Props for components that accept children */
export interface ChildrenProps {
  children: ReactNode;
}

/** Common props for modal components */
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

/** Props for components that receive a student/member */
export interface StudentProps {
  student: ContestPerson;
}

/** Props for components that receive a member with onChange callback */
export interface MemberProps {
  student: ContestPerson;
  onChange?: (result?: { id: string }) => void;
}

// ============================================================================
// FORM TYPES
// ============================================================================

/** Login form values */
export interface LoginFormValues {
  username: string;
  password: string;
}

/** Signup form values */
export interface SignupFormValues {
  username: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

/** Change password form values */
export interface ChangePasswordFormValues {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

/** Contest form values (for create/edit) */
export interface ContestFormValues {
  name: string;
  description?: string;
  country?: string;
  daterange: [moment: unknown, moment: unknown];
  show_standings?: boolean;
  readonly_mode?: boolean;
}

/** Add user form values */
export interface AddUserFormValues {
  username: string;
  role: Role;
}

/** Group form values */
export interface GroupFormValues {
  name: string;
}

// ============================================================================
// CALLBACK TYPES
// ============================================================================

/** Generic callback with optional result */
export type OnChangeCallback<T = void> = (result?: T) => void;

/** Callback for operations that may return an ID */
export type OnChangeWithIdCallback = OnChangeCallback<{ id: string }>;
