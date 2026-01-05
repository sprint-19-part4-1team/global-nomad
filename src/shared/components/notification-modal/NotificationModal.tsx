'use client';

import { NotificationItem, type Notification } from '@/shared/components/notification-modal';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';

interface NotificationModalProps {
  notifications: Notification[];
  onDeleteAll: () => Promise<void>;
  onDeleteOne: (id: number) => Promise<void>;
}
/**
 * 알림 리스트를 표시하는 모달 컴포넌트입니다.
 *
 * @remarks
 * - 전달받은 알림 목록을 기반으로 알림 개수와 리스트를 렌더링합니다.
 * - 알림이 존재할 경우 열 수 있으며 전체 삭제 버튼을 노출합니다.
 * - 알림 리스트 영역은 최대 높이를 가지며, 초과 시 스크롤로 처리됩니다.
 * - 모바일 환경에서는 좌우 여백을 24px로 유지하여 화면 가장자리에 붙지 않도록 합니다.
 *
 * 본 컴포넌트는 UI 렌더링에 집중하며,
 * 알림 데이터의 상태 관리 및 실제 삭제 로직은 상위 컴포넌트에서 책임집니다.
 *
 * @param notifications - 렌더링할 알림 목록
 * @param onDeleteAll - 전체 알림 삭제 처리 함수
 * @param onDeleteOne - 개별 알림 삭제 처리 함수
 * @returns 알림 리스트를 포함한 모달 UI 요소
 *
 * @example
 * ```tsx
 * <NotificationModal
      notifications={notifications}
      onDeleteAll={onDeleteAll}
      onDeleteOne={onDeleteOne}
    />
 * ```
    */
export default function NotificationModal({
  notifications,
  onDeleteAll,
  onDeleteOne,
}: NotificationModalProps) {
  return (
    <OverlayPortal>
      <div className='mt-8 max-h-360 w-236 rounded-12 pt-16 pb-8 shadow-[0_2px_12px_0_oklch(0_0_0_/_12%)] max-sm:mx-24 max-sm:w-[calc(100%-48px)]'>
        <div className='flex items-center justify-between border-b border-gray-50 px-16 pb-12'>
          {/* TODO: 추후 api response의 totalCount로 변경 예정 */}
          <div className='body-16 font-bold'>알림 {notifications.length}개</div>
          {notifications.length > 0 && (
            <button
              type='button'
              className='cursor-pointer body-13 font-semibold text-red-500'
              onClick={onDeleteAll}>
              전체삭제
            </button>
          )}
        </div>
        <div className='scrollbar-hidden max-h-200 divide-y divide-gray-50 overflow-x-hidden overflow-y-auto'>
          {notifications.map((item) => (
            <NotificationItem key={item.id} {...item} onDelete={onDeleteOne} />
          ))}
        </div>
      </div>
    </OverlayPortal>
  );
}
