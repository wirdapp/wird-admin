import Axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import i18n from "../i18n";
import { destroySession, getSession, updateSessionToken } from "../services/auth/session";

export const apiUrl = import.meta.env.VITE_API_URL;

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

interface TokenRefreshResponse {
	access: string;
}

interface ApiErrorResponse {
	code?: string;
	detail?: string;
}

const axios = Axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": i18n.language || "ar",
	},
});

export const SkipAuthHeader = [
	"/auth/login/",
	"/auth/registration/",
	"/auth/token/refresh/",
	"/auth/social/google/",
];

export async function tryRefreshTokens(refreshToken: string): Promise<string> {
	const { data } = await axios.post<TokenRefreshResponse>("/auth/token/refresh/", {
		refresh: refreshToken,
	});
	updateSessionToken(data.access);

	return data.access;
}

export const requestInterceptor = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	config.headers["Accept-Language"] = i18n.language || "ar";

	if (config.url && SkipAuthHeader.includes(config.url)) {
		config.withCredentials = false;
		return config;
	}

	const session = getSession();
	const token = session?.token;
	config.withCredentials = true;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
};

function redirectToLogin(): void {
	const currentPath = window.location.pathname;
	window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
}

export const errorInterceptor = async (error: AxiosError<ApiErrorResponse>): Promise<never> => {
	const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

	if (!originalRequest) {
		return Promise.reject(error);
	}

	const isTokenError =
		(error.response?.status === 401 || error.response?.status === 403) &&
		error.response?.data?.code === "token_not_valid";

	if (!isTokenError) return Promise.reject(error);

	if (originalRequest._retry) {
		destroySession();
		redirectToLogin();
		return Promise.reject(error);
	}

	if (originalRequest.url && SkipAuthHeader.includes(originalRequest.url)) {
		return Promise.reject(error);
	}

	const session = getSession();
	const refreshToken = session?.refreshToken;
	if (!refreshToken) {
		destroySession();
		redirectToLogin();
		return Promise.reject(error);
	}

	originalRequest._retry = true;

	try {
		const token = await tryRefreshTokens(refreshToken);
		originalRequest.headers.Authorization = `Bearer ${token}`;
		return axios.request(originalRequest) as never;
	} catch {
		destroySession();
		redirectToLogin();
		return Promise.reject(error);
	}
};

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(undefined, errorInterceptor);

export default axios;
