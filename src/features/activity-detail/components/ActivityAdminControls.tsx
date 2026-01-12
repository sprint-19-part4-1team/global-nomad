'use client';

import Link from 'next/link';
import Icons from '@/assets/icons';
import { ROUTE_PATHS } from '@/features/activity-detail/constants/routePaths';
import Button from '@/shared/components/button/Button';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 체험 작성자 전용 영역 컴포넌트의 Props
 * @property {number} activityId - 체험ID
 * @property {number} userId - 체험을 작성한 유저ID
 */
interface ActivityAdminControlsProps {
  activityId: number;
  userId: number;
}

/**
 * 체험 작성자 전용 영역 컴포넌트
 *
 * @description
 * - 로그인한 유저와 체험의 작성자(userId)가 동일한 경우에만 렌더링됩니다.
 * - 체험 예약 현황 확인 링크와 체험 수정/삭제 버튼을 제공합니다.
 * - 체험 승인/대기 상태에서의 제한 사항 안내 문구를 함께 표시합니다.
 *
 * @example
 * ```tsx
 * <ActivityAdminControls userId={activity.userId} />
 * ```
 */
export default function ActivityAdminControls({ activityId, userId }: ActivityAdminControlsProps) {
  const loginUserId = useUserStore((s) => s.user?.id);

  // 체험 관리자와 로그인 사용자가 다를 경우 렌더링하지 않음
  if (userId !== loginUserId) {
    return null;
  }

  return (
    <div className='mt-8 flex flex-col gap-20 sm:gap-32'>
      <Link
        href={ROUTE_PATHS.RESERVATION_STATUS}
        className='flex w-fit items-center gap-4 body-14 font-semibold text-primary-500 sm:body-16'>
        <span>예약 현황 확인</span>
        <Icons.ArrowRight aria-hidden='true' className='h-24 w-24' />
      </Link>

      <div className='flex items-center justify-between gap-12'>
        <Button
          variant='secondary'
          size='lg'
          href={ROUTE_PATHS.ACTIVITY_EDIT(activityId)}
          className='flex-1'>
          체험 수정하기
        </Button>
        <Button
          variant='negative'
          size='lg'
          onClick={() => {
            // TODO: API 연동 후 실제 체험 삭제 로직 구현
            console.log('체험 삭제하기');
          }}
          className='flex-1'>
          체험 삭제하기
        </Button>
      </div>

      <div className='flex flex-col gap-4 rounded-7 bg-gray-25 p-12 sm:p-16'>
        <span className='body-13 font-bold text-gray-700 sm:body-14'>확인해주세요!</span>
        <span className='body-12 font-medium text-gray-500 sm:body-14'>
          ・체험 승인/대기 중일 때는 체험을 수정 및 삭제할 수 없습니다.
        </span>
      </div>
    </div>
  );
}
