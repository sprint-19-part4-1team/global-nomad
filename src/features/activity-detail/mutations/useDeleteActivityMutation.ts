import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ROUTE_PATHS } from '@/features/activity-detail/constants/routePaths';
import { deleteMyActivity } from '@/shared/apis/feature/myActivities';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * 체험 삭제 mutation hook
 *
 * @description
 * - 체험을 삭제하고 메인 페이지로 이동합니다.
 * - 삭제 성공 시 다이얼로그를 닫고 메인 페이지('/')로 리다이렉트합니다.
 * - 삭제 실패 시 에러를 콘솔에 출력합니다.
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
 *   deleteMutation.mutate(activityId);
 * };
 *
 * // 로딩 상태 확인
 * if (deleteMutation.isPending) {
 *   return <LoadingSpinner />;
 * }
 * ```
 */
export const useDeleteActivity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (activityId: number) => deleteMyActivity(activityId),
    onSuccess: () => {
      overlayStore.pop();
      router.push(ROUTE_PATHS.MAIN);
      toast.info('체험이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      overlayStore.pop();
      toast.error('체험을 삭제하는 데 실패했습니다.');
      console.error('체험 삭제 실패:', error);
    },
  });
};
