import Axios from "axios";
import {
  destroySession,
  getSession,
  updateSessionToken,
} from "../services/auth/session";
import i18n from "../i18n";

export const apiUrl = process.env.REACT_APP_API_URL;

const axios = Axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  defaults: {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language || "ar",
    },
  },
});

export const SkipAuthHeader = [
  "/auth/login/",
  "/auth/registration/",
  "/auth/token/refresh/",
];

export async function tryRefreshTokens(refreshToken) {
  const { data } = await axios.post("/auth/token/refresh/", {
    refresh: refreshToken,
  });
  updateSessionToken(data.access);

  return data.access;
}

export const requestInterceptor = (config) => {
  config.headers["Accept-Language"] = i18n.language || "ar";

  if (SkipAuthHeader.includes(config.url)) {
    config.withCredentials = false;
    return config;
  }

  const { token } = getSession();
  config.withCredentials = true;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const errorInterceptor = async (error) => {
  const originalRequest = error.config;

  // Check if error is token-related (401 or 403 with token_not_valid code)
  const isTokenError =
    (error.response?.status === 401 || error.response?.status === 403) &&
    error.response?.data?.code === "token_not_valid";

  // If not a token error, reject normally
  if (!isTokenError) return Promise.reject(error);

  // If already retried, reject to prevent infinite loop
  if (originalRequest._retry) return Promise.reject(error);

  // If request is to auth endpoints, reject normally
  if (SkipAuthHeader.includes(originalRequest.url)) return Promise.reject(error);

  // If no refresh token, reject normally
  const { refreshToken } = getSession();
  if (!refreshToken) return Promise.reject(error);

  // Mark as retried to prevent infinite loop
  originalRequest._retry = true;

  // Try to refresh token and retry the original request
  try {
    const token = await tryRefreshTokens(refreshToken);
    originalRequest.headers["Authorization"] = `Bearer ${token}`;
    return axios.request(originalRequest);
  } catch (e) {
    destroySession();
    return Promise.reject(error);
  }
};

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(undefined, errorInterceptor);

export default axios;
