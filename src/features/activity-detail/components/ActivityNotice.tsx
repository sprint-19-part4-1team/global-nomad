'use client';

import { useUserStore } from '@/shared/stores/userStore';

/**
 * 체험 상세 페이지 안내 메시지 컴포넌트의 Props
 * @property {number} userId - 체험을 작성한 사용자의 ID
 */
interface ActivityNoticeProps {
  userId: number;
}

/** 표시할 안내 메시지 */
const MESSAGE = {
  GUEST: '체험 예약은 로그인한 유저만 가능합니다.',
  ADMIN: '체험 승인/대기 중일 때는 체험을 수정 및 삭제할 수 없습니다.',
} as const;

/**
 * 체험 상세 페이지에서 사용자 상태에 따른 안내 메시지를 표시하는 컴포넌트
 *
 * @description
 * - 비로그인 사용자(게스트): 로그인 필요 안내
 * - 체험 작성자(관리자): 체험 수정/삭제 제한 안내
 * - 로그인했지만 작성자가 아닌 경우: 렌더링하지 않음
 *
 * @param {ActivityNoticeProps} props - 컴포넌트 props
 * @returns {JSX.Element} 사용자 상태에 따른 안내 메시지 또는 null
 *
 * @example
 * ```tsx
 * <ActivityNotice userId={123} />
 * ```
 */
export default function ActivityNotice({ userId }: ActivityNoticeProps) {
  const loginUserId = useUserStore((s) => s.user?.id);

  // 로그인한 유저가 체험 작성 유저가 아닌 경우 렌더링하지 않음
  if (loginUserId !== undefined && userId !== loginUserId) {
    return null;
  }

  const isGuest = loginUserId === undefined;
  const message = isGuest ? MESSAGE.GUEST : MESSAGE.ADMIN;

  return (
    <div className='mt-20 flex flex-col gap-4 rounded-7 bg-gray-25 p-12 sm:mt-32 sm:p-16'>
      <span className='body-13 font-bold text-gray-700 sm:body-14'>확인해주세요!</span>
      <span className='body-12 font-medium text-gray-500 sm:body-14'>・{message}</span>
    </div>
  );
}
