'use client';

import { usePathname } from 'next/navigation';
import { TabsLink, TabsNav } from '@/shared/components/tabs';

export const MYPAGE_TABS = [
  {
    label: '내 정보',
    href: '/mypage/info',
  },
  {
    label: '예약 내역',
    href: '/mypage/reservation-list',
  },
  {
    label: '내 체험 관리',
    href: '/mypage/activity',
  },
  {
    label: '예약 현황',
    href: '/mypage/reservation-status',
  },
] as const;

/**
 * ### MypageTabs
 *
 * @description
 * - 마이페이지 모바일 환경(sm 이하)에서 노출되는 탭 네비게이션 컴포넌트입니다.
 * - 탭 클릭 시 라우트 이동이 발생합니다.
 */
export default function MypageTabs() {
  const pathname = usePathname();

  return (
    <TabsNav ariaLabel='마이페이지 섹션' className='sm:hidden'>
      {MYPAGE_TABS.map(({ label, href }) => (
        <TabsLink key={href} href={href} isActive={pathname === href}>
          {label}
        </TabsLink>
      ))}
    </TabsNav>
  );
}
