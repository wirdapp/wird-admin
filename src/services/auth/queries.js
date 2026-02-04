import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as AuthApi from './api';
import { updateSessionUserDetails } from './session';

export const authKeys = {
  all: ['auth'],
  currentUser: () => [...authKeys.all, 'currentUser'],
};

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: AuthApi.currentUserInfo,
    ...options,
  });
}

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.updateUserInfo,
    onSuccess: (data) => {
      updateSessionUserDetails(data);
      queryClient.setQueryData(authKeys.currentUser(), data);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: AuthApi.changePassword,
  });
}
