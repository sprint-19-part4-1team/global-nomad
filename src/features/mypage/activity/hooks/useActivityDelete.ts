import { toast } from 'react-toastify';
import { deleteMyActivity } from '@/shared/apis/feature/myActivities';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * 활동 삭제 기능을 제공하는 커스텀 훅
 *
 * @description
 * - 활동 삭제 API 호출 로직을 캡슐화
 * - 삭제 확인 다이얼로그를 overlay로 표시하는 헬퍼 함수 제공
 * - 삭제 성공/실패 시 토스트 알림 및 overlay 정리 처리
 * - UI 렌더링은 컴포넌트에 위임하고, 삭제 플로우 제어만 담당
 *
 * @param onDelete - 삭제 성공 후 실행할 콜백 함수 (목록 갱신 등)
 *
 * @returns deleteActivity
 *  - 다이얼로그 없이 바로 삭제를 수행하는 함수
 *
 * @returns showDeleteConfirm
 *  - 삭제 확인 다이얼로그를 overlay에 표시하는 함수
 *  - 다이얼로그 렌더링 함수(renderDialog)를 인자로 받음
 *
 * @example
 * ```tsx
 * function MyComponent({ activityId, onRefresh }) {
 *   const { showDeleteConfirm } = useActivityDelete(onRefresh);
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         showDeleteConfirm(activityId, (onConfirm) => (
 *           <Dialog onConfirm={onConfirm} />
 *         ))
 *       }
 *     >
 *       삭제하기
 *     </button>
 *   );
 * }
 * ```
 */
export const useActivityDelete = (onDelete: () => void) => {
  const deleteActivity = async (id: number) => {
    try {
      await deleteMyActivity(id);

      onDelete();
      overlayStore.pop();
      toast.success('삭제에 성공했습니다.');
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      toast.error('삭제에 실패했습니다.');
    }
  };

  const showDeleteConfirm = (
    id: number,
    renderDialog: (onConfirm: () => void) => React.ReactElement
  ) => {
    const dialog = renderDialog(() => deleteActivity(id));
    overlayStore.push(dialog);
  };

  return { deleteActivity, showDeleteConfirm };
};
