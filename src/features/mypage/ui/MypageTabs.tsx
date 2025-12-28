'use client';

import { usePathname } from 'next/navigation';
import { TabsLink, TabsNav } from '@/shared/components/tabs';

export default function MypageTabs() {
  const pathname = usePathname();

  return (
    <TabsNav ariaLabel='마이페이지 섹션' className='sm:hidden'>
      <TabsLink href='/mypage/info' isActive={pathname === '/mypage/info'}>
        내 정보
      </TabsLink>
      <TabsLink href='/mypage/reservation-list' isActive={pathname === '/mypage/reservation-list'}>
        예약 내역
      </TabsLink>
      <TabsLink href=' /mypage/activity' isActive={pathname === '/mypage/activity'}>
        내 체험 관리
      </TabsLink>
      <TabsLink
        href='/mypage/reservation-status'
        isActive={pathname === '/mypage/reservation-status'}>
        예약 현황
      </TabsLink>
    </TabsNav>
  );
}
