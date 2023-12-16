import * as AuthApi from "./api";

export function isLogged() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
}

export function saveTokensToLocalStorage(token, refreshToken) {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
}

export function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export async function getUser() {
  if (!isLogged()) return null;
  let user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    try {
      user = await AuthApi.currentUserInfo();
      saveUserToLocalStorage(user);
    } catch (e) {
      logout();
      return null;
    }
  }
  return user;
}

export const login = async (username, password) => {
  const {token, refreshToken} = await AuthApi.getTokens(username, password);
  saveTokensToLocalStorage(token, refreshToken);
  const currentUserInfo = await AuthApi.currentUserInfo();
  saveUserToLocalStorage(currentUserInfo);
}