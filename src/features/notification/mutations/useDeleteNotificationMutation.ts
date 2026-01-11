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
 *
 * @param params.size - 알림 목록 조회 시 사용할 size (캐시 무효화용)
 * @returns mutate(notificationId) - 알림 삭제 실행 함수
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
