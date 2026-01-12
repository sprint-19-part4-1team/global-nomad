import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteNotification } from '@/shared/apis/feature/myNotifications';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';
import { NotificationResponse } from '@/shared/types/myNotifications';

interface UseDeleteNotificationMutationParams {
  size?: number;
}

/**
 * 알림 삭제 mutation hook (Optimistic Update 적용)
 *
 * @param params.size - 알림 목록 조회 시 사용할 size (캐시 무효화용)
 * @returns mutate(notificationId) - 알림 삭제 실행 함수
 */
export const useDeleteNotificationMutation = (params?: UseDeleteNotificationMutationParams) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);
  const size = params?.size;
  const queryKey = QUERY_KEYS.MY_NOTIFICATIONS({ size }, userId);

  return useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<NotificationResponse>(queryKey);

      queryClient.setQueryData<NotificationResponse>(queryKey, (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          notifications: old.notifications.filter((n) => n.id !== notificationId),
          totalCount: old.totalCount - 1,
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error('알림 삭제에 실패했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
