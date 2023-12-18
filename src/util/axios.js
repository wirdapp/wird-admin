import Axios from "axios";
import {destroySession, getSession, updateSessionToken} from "../services/auth/session";

const apiUrl = process.env.REACT_APP_BASE_URL;

const axios = Axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  defaults: {
    headers: {
      "Content-Type": "application/json",
    },
  }
});

export const SkipAuthHeader = ['/auth/login/', '/auth/registration/', "/auth/token/refresh/"];

export async function tryRefreshTokens(refreshToken) {
  const {data} = await axios.post("/auth/token/refresh/", {
    refresh: refreshToken
  });
  updateSessionToken(data.access);

  return data.access;
}

export const requestInterceptor = (config) => {
  if (SkipAuthHeader.includes(config.url)) {
    config.withCredentials = false;
    return config;
  }

  const {token} = getSession();
  config.withCredentials = true;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}

export const errorInterceptor = async (error) => {
  // if error is not about token invalid, reject normally
  if (error.response.data?.code !== 'token_not_valid') return Promise.reject(error);

  // if not in SkipAuthHeader, reject normally
  if (SkipAuthHeader.includes(error.config.url)) return Promise.reject(error);

  // if no refresh token, reject normally
  const {refreshToken} = getSession();
  if (!refreshToken) return Promise.reject(error);

  // if refresh token, try to refresh token
  try {
    const token = await tryRefreshTokens(refreshToken);
    error.config.headers["Authorization"] = `Bearer ${token}`;
    return axios.request(error.config);
  } catch (e) {
    destroySession();
    return Promise.reject(error);
  }
}


axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(undefined, errorInterceptor);

export default axios;