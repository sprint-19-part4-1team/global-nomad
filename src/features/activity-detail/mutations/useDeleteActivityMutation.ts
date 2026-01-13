import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyActivity } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 체험 삭제 mutation hook
 *
 * @description
 * - 체험을 삭제하고 관련 쿼리를 무효화합니다.
 * - 삭제 성공 시 내 체험 리스트 쿼리를 무효화하여 UI에 즉시 반영합니다.
 * - onSuccess/onError 콜백은 컴포넌트에서 처리하도록 hook은 단순히 mutation 기능만 제공합니다.
 *
 * @returns React Query mutation 객체
 * @returns mutate - 체험 삭제를 실행하는 함수 (activityId를 인자로 받음)
 * @returns isPending - 삭제 진행 중 여부
 * @returns error - 삭제 실패 시 에러 객체
 *
 * @example
 * ```tsx
 * const deleteMutation = useDeleteActivity();
 *
 * const handleDelete = () => {
 *   deleteMutation.mutate(activityId, {
 *     onSuccess: () => {
 *       // 성공 처리
 *     },
 *     onError: (error) => {
 *       // 에러 처리
 *     },
 *     onSettled: () => {
 *       // 완료 후 공통 처리
 *     }
 *   });
 * };
 * ```
 */
export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity(activityId),
    onSuccess: () => {
      // 내 체험 리스트 쿼리 무효화하여 삭제된 체험이 목록에서 즉시 제거되도록 처리
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_ACTIVITIES(undefined, userId),
      });
    },
  });
};
