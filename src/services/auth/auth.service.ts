import Cookies from "js-cookie";
import type { ChangePasswordFormData, LoginResponse, SignupFormData, User } from "../../types";
import axios from "../../util/axios";
import type { Session } from "./session";

interface UpdateUserInfoData {
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	profile_photo?: string | unknown[];
}

const LAST_EMAIL_RESEND_KEY = "wj3TrwBaUsM5Sc6dpPMlGhxoNA0n7plv2";

class AuthServiceClass {
	protected axios = axios;

	async doLogin(username: string, password: string): Promise<Session> {
		const res = await this.axios.post<LoginResponse>("/auth/login/", {
			username,
			password,
		});

		return {
			token: res.data.access,
			refreshToken: res.data.refresh,
			user: res.data.user,
		};
	}

	async signup(formData: SignupFormData, isCreator?: boolean): Promise<User> {
		const { data } = await this.axios.post<User>("/auth/registration/", formData, {
			params: {
				type: isCreator ? "creator" : undefined,
			},
		});

		return data;
	}

	async currentUserInfo(): Promise<User> {
		const { data } = await this.axios.get<User>("/auth/user/");
		return data;
	}

	async updateUserInfo(formData: UpdateUserInfoData | FormData): Promise<User> {
		const isFormData = formData instanceof FormData;
		const { data } = await this.axios.patch<User>("/auth/user/", formData, {
			headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
		});

		return data;
	}

	async changePassword(formData: ChangePasswordFormData): Promise<void> {
		await this.axios.post("/auth/password/change/", formData);
	}

	async resendVerificationEmail(email: string): Promise<void> {
		const lastEmailResend = Cookies.get(LAST_EMAIL_RESEND_KEY);
		if (lastEmailResend === email) {
			throw new Error("email-already-sent");
		}

		// 15 minutes
		Cookies.set(LAST_EMAIL_RESEND_KEY, email, { expires: 1 / 96 });
		await this.axios.post("/auth/registration/resend-email/", {
			email,
		});
	}
}

export const AuthService = new AuthServiceClass();
export { AuthServiceClass };
