import Axios from "axios";
import {getTokens, logout, saveTokensToLocalStorage} from "../services/auth/utils";

export const SkipAuthHeader = ["/token/", "/token/refresh/", "/signup/"];

export async function tryRefreshTokens(refreshToken) {
  const {data} = await axios.post("/token/refresh/", {
    refresh: refreshToken
  });

  return {token: data.access, refreshToken: data.refresh};
}

export const requestInterceptor = (config) => {
  if (SkipAuthHeader.includes(config.url)) return config;

  const {token} = getTokens();
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
}

export const errorInterceptor = async (error) => {
  // if not 401 error, reject normaly
  if (error.response.status !== 401) return Promise.reject(error);

  // if not in SkipAuthHeader, reject normaly
  if (SkipAuthHeader.includes(error.config.url)) return Promise.reject(error);

  // if no refresh token, reject normaly
  const {refreshToken} = getTokens();
  if (!refreshToken) return Promise.reject(error);

  // if refresh token, try to refresh token
  try {
    const {token, refreshToken: newRefreshToken} = await tryRefreshTokens(refreshToken);
    saveTokensToLocalStorage(token, newRefreshToken);
    error.config.headers["Authorization"] = `Bearer ${token}`;
    return axios.request(error.config);
  } catch (e) {
    logout();
    return Promise.reject(error);
  }
}

const apiUrl = process.env.REACT_APP_BASE_URL;

const axios = Axios.create({
  baseURL: apiUrl,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(undefined, errorInterceptor);

export default axios;