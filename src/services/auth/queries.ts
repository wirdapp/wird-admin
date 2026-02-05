import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChangePasswordFormData, User } from "../../types";
import { AuthService } from "./auth.service";
import { updateSessionUserDetails } from "./session";

export const authKeys = {
	all: ["auth"] as const,
	currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export function useCurrentUser(
	options: Omit<UseQueryOptions<User, Error>, "queryKey" | "queryFn"> = {},
) {
	return useQuery({
		queryKey: authKeys.currentUser(),
		queryFn: () => AuthService.currentUserInfo(),
		...options,
	});
}

export function useUpdateUserInfo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (formData: FormData) => AuthService.updateUserInfo(formData),
		onSuccess: (data) => {
			updateSessionUserDetails(data);
			queryClient.setQueryData(authKeys.currentUser(), data);
		},
	});
}

export function useChangePassword() {
	return useMutation({
		mutationFn: (formData: ChangePasswordFormData) => AuthService.changePassword(formData),
	});
}

export function useRequestPasswordReset() {
	return useMutation({
		mutationFn: ({ username, email }: { username: string; email: string }) =>
			AuthService.requestPasswordReset(username, email),
	});
}

export function useConfirmPasswordReset() {
	return useMutation({
		mutationFn: (data: { new_password1: string; new_password2: string; token: string; uid: string }) =>
			AuthService.confirmPasswordReset(data),
	});
}

export function useRequestUsernameEmail() {
	return useMutation({
		mutationFn: (email: string) => AuthService.requestUsernameEmail(email),
	});
}

export function useVerifyEmail() {
	return useMutation({
		mutationFn: (key: string) => AuthService.verifyEmail(key),
	});
}
