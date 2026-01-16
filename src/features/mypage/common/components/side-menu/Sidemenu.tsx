'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Icons from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/cn';

const MYPAGE_MENUS = [
  {
    href: '/mypage/info',
    title: '내 정보로 이동',
    label: '내 정보',
    icon: Icons.User,
  },
  {
    href: '/mypage/reservation-list',
    title: '예약 내역으로 이동',
    label: '예약 내역',
    icon: Icons.ReservationStatus,
  },
  {
    href: '/mypage/activity',
    title: '내 체험 관리로 이동',
    label: '내 체험 관리',
    icon: Icons.Setting,
  },
  {
    href: '/mypage/reservation-status',
    title: '예약 현황으로 이동',
    label: '예약 현황',
    icon: Icons.ReservationList,
  },
] as const;

const mypageLinkClass = cn(
  'flex items-center gap-8',
  'text-gray-600 hover:text-primary-600',
  'transition-colors duration-500',
  'mt-12 md:mt-14',
  'px-20 py-15',
  'rounded-16',
  'font-medium'
);

const activeLinkClass = 'bg-primary-100 text-primary-500';

/**
 * ## 마이페이지 사이드 메뉴 컴포넌트
 *
 * 마이페이지 레이아웃의 좌측에 위치하는 사이드바로,
 * 사용자 아바타와 마이페이지 관련 주요 메뉴 링크를 세로 목록으로 렌더링합니다.
 *
 * 현재 URL 경로(`usePathname`)를 기준으로
 * 활성화된 메뉴에 강조 스타일을 적용합니다.
 *
 * ---
 *
 * ### 주요 역할
 * - 사용자 프로필 아바타 표시
 * - 마이페이지 내 고정 메뉴 목록 렌더링
 * - 현재 경로와 일치하는 메뉴 활성화 처리
 *
 * ### UI / 노출 조건
 * - 모바일에서는 숨김 처리 (`sm` 이상에서만 노출)
 * - 카드 형태의 사이드바 UI
 *
 * ### 구현 포인트
 * - 메뉴 정의를 `MYPAGE_MENUS` 상수로 분리해 확장성과 가독성 확보
 * - `usePathname`를 활용한 현재 경로 기반 active 스타일 처리
 * - `cn` 유틸로 기본/활성 클래스 조건부 병합
 * - 아이콘 컴포넌트를 데이터로 관리해 map 렌더링 단순화
 *
 * ### 상태 의존성
 * - `useUserStore`를 통해 사용자 정보 조회
 * - 사용자 정보는 아바타 컴포넌트에 전달
 *
 * @example
 * ```tsx
 * <Sidemenu />
 * ```
 */

type SidemenuProps = {
  className?: string;
};

export default function Sidemenu({ className }: SidemenuProps) {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  return (
    <aside
      className={`hidden h-358 w-178 overflow-hidden rounded-12 px-14 py-24 shadow-card sm:block sm:py-16 md:h-450 md:w-290 ${className}`}
      aria-label='마이페이지 사이드 메뉴'>
      <Avatar user={user} size='md' className='mx-auto'>
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
      <ul className='mt-10 md:mt-24'>
        {MYPAGE_MENUS.map(({ href, title, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              title={title}
              className={cn(mypageLinkClass, pathname === href && activeLinkClass)}>
              <Icon className='w-24' />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
