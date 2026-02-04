import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationsApi } from './api';

export const notificationKeys = {
  all: ['notifications'],
  list: (contestId) => [...notificationKeys.all, 'list', { contestId }],
};

export function useNotifications(contestId, options = {}) {
  return useQuery({
    queryKey: notificationKeys.list(contestId),
    queryFn: () => NotificationsApi.getNotifications(contestId),
    enabled: !!contestId,
    ...options,
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, title, body }) =>
      NotificationsApi.createNotification(contestId, { title, body }),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list(contestId) });
    },
  });
}
