import { toast } from 'react-toastify';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * 활동 삭제 기능을 제공하는 커스텀 훅
 *
 * @description
 * - 활동 삭제 API 호출 로직을 캡슐화
 * - 삭제 확인 다이얼로그 표시는 컴포넌트에서 처리
 * - 삭제 성공/실패 시 토스트 알림 처리
 * - UI 컴포넌트와 비즈니스 로직 분리를 위해 사용
 *
 * @param onDelete - 삭제 성공 후 실행할 콜백 함수 (목록 새로고침 등)
 * @returns deleteActivity - 실제 삭제를 수행하는 함수
 * @returns showDeleteConfirm - 삭제 확인 함수 (렌더링 함수를 받음)
 *
 * @example
 * ```tsx
 * function MyComponent({ activityId, onRefresh }) {
 *   const { showDeleteConfirm } = useActivityDelete(onRefresh);
 *
 *   return (
 *     <button onClick={() => showDeleteConfirm(activityId, (onConfirm) => (
 *       <Dialog onConfirm={onConfirm} />
 *     ))}>
 *       삭제하기
 *     </button>
 *   );
 * }
 * ```
 */
export function useActivityDelete(onDelete: () => void) {
  const deleteActivity = async (id: number) => {
    try {
      const response = await fetch(`/api/my-activities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

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
}
