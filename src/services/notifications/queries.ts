import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Notification, NotificationCreateData } from "../../types";
import { NotificationsService } from "./notifications.service";

export const notificationKeys = {
	all: ["notifications"] as const,
	list: (contestId: string) => [...notificationKeys.all, "list", { contestId }] as const,
};

export function useNotifications(
	contestId: string | undefined,
	options: Omit<UseQueryOptions<Notification[], Error>, "queryKey" | "queryFn" | "enabled"> = {},
) {
	return useQuery({
		queryKey: notificationKeys.list(contestId ?? ""),
		queryFn: () => NotificationsService.getNotifications(contestId!),
		enabled: !!contestId,
		...options,
	});
}

export function useCreateNotification() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			contestId,
			...notificationData
		}: NotificationCreateData & { contestId: string }) =>
			NotificationsService.createNotification(contestId, notificationData),
		onSuccess: (_, { contestId }) => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.list(contestId),
			});
		},
	});
}
