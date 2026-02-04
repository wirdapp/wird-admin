import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AuthService } from './auth.service';
import { updateSessionUserDetails } from './session';
import type { User, ChangePasswordFormData } from '../../types';

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

export function useCurrentUser(
  options: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn'> = {}
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
    mutationFn: (formData: ChangePasswordFormData) =>
      AuthService.changePassword(formData),
  });
}
