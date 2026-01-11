import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteNotification } from '@/shared/apis/feature/myNotifications';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

interface UseDeleteNotificationMutationParams {
  size?: number;
}

/**
 * 알림 삭제 mutation hook
 */
export const useDeleteNotificationMutation = (params?: UseDeleteNotificationMutationParams) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);
  const size = params?.size;

  return useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_NOTIFICATIONS({ size }, userId),
      });
    },

    onError: () => {
      toast.error('알림 삭제에 실패했습니다.');
    },
  });
};
