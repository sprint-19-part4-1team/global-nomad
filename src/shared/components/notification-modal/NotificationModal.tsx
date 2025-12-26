'use client';

import { mockNotifications } from '@/shared/components/notification-modal/__mocks__/notifications';
import NotificationItem from '@/shared/components/notification-modal/NotificationItem';

/**
 * 알림 리스트를 표시하는 모달 컴포넌트
 *
 * - 알림 개수 표시
 * - 전체 삭제 버튼 제공
 * - 알림 리스트 스크롤 영역 제공
 * - 모바일은 양쪽 마진 24px 적용
 */
export default function NotificationModal() {
  const notifications = mockNotifications;

  /**
   * 전체 알림 삭제 함수 (추후 API 연동 예정)
   */
  const handleDeleteAll = () => {
    // eslint-disable-next-line no-console
    console.log('전체 삭제되었습니다!');
  };
  /**
   * 단일 알림 삭제
   * @param id 삭제할 알림의 id
   */
  const handleDeleteOne = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(`개별 삭제 되었습니다. id: ${id}`);
  };

  return (
    <div className='mt-8 max-h-360 w-236 rounded-12 pt-16 pb-8 shadow-[0_2px_12px_0_oklch(0_0_0_/_12%)] max-sm:mx-24 max-sm:w-[calc(100%-48px)]'>
      <div className='flex items-center justify-between px-16 pb-12'>
        {/* api response에 totalCount가 있어서 그걸로 변경 예정 */}
        <div className='body-16 font-bold'>알림 {notifications.length}개</div>
        {notifications.length > 0 && (
          <button
            type='button'
            aria-label='알림 전체 삭제'
            className='cursor-pointer body-13 font-semibold text-red-500'
            onClick={handleDeleteAll}>
            전체삭제
          </button>
        )}
      </div>
      <div className='max-h-200 overflow-x-hidden overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        {notifications.map((item) => (
          <NotificationItem key={item.id} {...item} onDelete={() => handleDeleteOne(item.id)} />
        ))}
      </div>
    </div>
  );
}
