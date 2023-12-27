import * as AuthApi from "./api";
import Cookies from "js-cookie";

const SESSION_COOKIE_KEY = "wird-session";

export function isLogged() {
  return !!getSession();
}

export function destroySession() {
  Cookies.remove(SESSION_COOKIE_KEY, {path: '/'});
}

export function saveSession(session) {
  Cookies.set(SESSION_COOKIE_KEY, JSON.stringify(session), {path: '/'});
}

export function getSession() {
  return JSON.parse(Cookies.get(SESSION_COOKIE_KEY) ?? "null");
}

export function updateSessionToken(token) {
  const session = getSession();
  session.token = token;
  saveSession(session);
}

export function updateSessionUserDetails(user) {
  const session = getSession();
  session.user = user;
  saveSession(session);
}

export async function getUser() {
  if (!isLogged()) return null;
  let {user} = getSession();
  if (!user) {
    try {
      user = await AuthApi.currentUserInfo();
      updateSessionUserDetails(user);
    } catch (e) {
      destroySession();
      return null;
    }
  }
  return user;
}

export const login = async (username, password) => {
  const session = await AuthApi.doLogin(username, password);
  saveSession(session);
}

