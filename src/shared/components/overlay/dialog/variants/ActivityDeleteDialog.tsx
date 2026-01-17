import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ROUTE_PATHS } from '@/features/activity-detail/constants/routePaths';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useDeleteActivity } from '@/shared/mutations/useDeleteActivityMutation';

/**
 * 체험 삭제 확인 다이얼로그 컴포넌트의 Props
 * @property {number} activityId - 체험ID
 */
interface ActivityDeleteDialogProps {
  activityId: number;
}

/**
 * 체험 삭제 확인 다이얼로그 컴포넌트
 *
 * @description
 * - 체험 삭제를 확인하는 다이얼로그
 * - mutation 상태를 실시간으로 반영하여 삭제 진행 중에 버튼을 비활성화
 * - ActivityAdminControls에서 분리하여 독립적으로 상태 관리
 *
 * @param props - 컴포넌트 props
 * @param props.activityId - 삭제할 체험의 ID
 */
export default function ActivityDeleteDialog({ activityId }: ActivityDeleteDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const deleteMutation = useDeleteActivity();

  const handleConfirm = () => {
    deleteMutation.mutate(activityId, {
      onSuccess: () => {
        const isDetailPage = pathname.startsWith('/activity/');

        if (isDetailPage) {
          router.replace(ROUTE_PATHS.MAIN);
        }

        toast.info('체험이 성공적으로 삭제되었습니다.');
      },
      onError: (error) => {
        toast.error(error.message ?? '체험을 삭제하는 데 실패했습니다.');
        console.error('체험 삭제 실패:', error);
      },
      onSettled: () => {
        overlayStore.pop();
      },
    });
  };

  return (
    <Dialog
      variant='confirm'
      message='체험을 삭제하시겠습니까?'
      cancelLabel='취소하기'
      confirmLabel='삭제하기'
      onCancel={() => overlayStore.pop()}
      isConfirm={deleteMutation.isPending}
      onConfirm={handleConfirm}
    />
  );
}
