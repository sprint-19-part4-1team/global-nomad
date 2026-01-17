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
 * 마이페이지 레이아웃 좌측에 고정되는 사이드바로,
 * 사용자 프로필 아바타와 주요 메뉴 링크를 제공합니다.
 *
 * 현재 URL 경로를 기준으로 활성 메뉴를 하이라이트 처리합니다.
 *
 * ---
 *
 * ### 주요 기능
 * - 사용자 프로필 아바타 표시
 * - 마이페이지 메뉴 목록 렌더링 (내 정보, 예약 내역, 체험 관리, 예약 현황)
 * - 현재 경로 기반 활성 메뉴 강조
 *
 * ### Props
 * - `className` (optional): 추가 스타일링을 위한 커스텀 클래스명
 *
 * ### 반응형 동작
 * - 모바일(sm 미만): 숨김 처리
 * - 태블릿 이상(sm~): 표시
 *
 * ### 구현 특징
 * - `MYPAGE_MENUS` 상수로 메뉴 정의를 분리하여 유지보수성 향상
 * - `usePathname` 훅으로 현재 경로 감지 및 활성 상태 처리
 * - `cn` 유틸리티로 조건부 클래스 병합
 * - 아이콘을 데이터로 관리하여 선언적 렌더링
 *
 * ### 상태 관리
 * - `useUserStore`를 통해 사용자 정보 조회 및 아바타 컴포넌트에 전달
 *
 * @example
 * ```tsx
 * <Sidemenu />
 * <Sidemenu className="custom-style" />
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
