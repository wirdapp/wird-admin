import Cookies from 'js-cookie';
import type { User } from '../../types';

const SESSION_COOKIE_KEY = 'wird-session';

export interface Session {
  token: string;
  refreshToken: string;
  user?: User;
}

export function isLogged(): boolean {
  return !!getSession();
}

export function destroySession(): void {
  Cookies.remove(SESSION_COOKIE_KEY, { path: '/' });
}

export function saveSession(session: Session): void {
  Cookies.set(SESSION_COOKIE_KEY, JSON.stringify(session), { path: '/' });
}

export function getSession(): Session | null {
  const sessionStr = Cookies.get(SESSION_COOKIE_KEY);
  return sessionStr ? JSON.parse(sessionStr) : null;
}

export function updateSessionToken(token: string): void {
  const session = getSession();
  if (session) {
    session.token = token;
    saveSession(session);
  }
}

export function updateSessionUserDetails(user: User): void {
  const session = getSession();
  if (session) {
    session.user = user;
    saveSession(session);
  }
}

export async function getUser(): Promise<User | null> {
  if (!isLogged()) return null;
  const session = getSession();
  let user = session?.user;
  if (!user) {
    try {
      // Import dynamically to avoid circular dependency
      const { AuthService } = await import('./auth.service');
      user = await AuthService.currentUserInfo();
      updateSessionUserDetails(user);
    } catch (e) {
      destroySession();
      return null;
    }
  }
  return user;
}

export const login = async (username: string, password: string): Promise<void> => {
  // Import dynamically to avoid circular dependency
  const { AuthService } = await import('./auth.service');
  const session = await AuthService.doLogin(username, password);
  saveSession(session);
};
