'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Icons from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import { User } from '@/shared/types/user.type';
import { cn } from '@/shared/utils/cn';

interface SidemenuProps {
  user: User;
}

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
 * 마이페이지 사이드 메뉴 컴포넌트
 *
 * 사용자 프로필 아바타와 마이페이지 내 주요 메뉴 링크들을 세로 목록으로 렌더링합니다.
 * 현재 URL 경로(`usePathname`)를 기준으로 활성화된 메뉴에 스타일을 적용합니다.
 *
 * ### 주요 기능
 * - 사용자 아바타 표시
 * - 마이페이지 관련 메뉴 리스트 렌더링
 * - 현재 경로와 일치하는 메뉴에 active 스타일 적용
 *
 * ### 사용 대상
 * - 마이페이지 레이아웃의 좌측 사이드바
 * - 태블릿(md) 이상 화면에서만 노출 (모바일에서는 숨김)
 *
 * ### 구현 포인트
 * - 메뉴 정의를 `mypageMenus` 배열로 분리해 확장성 확보
 * - `cn` 유틸을 사용해 기본/활성 클래스 조건부 병합
 * - 아이콘 컴포넌트를 데이터로 전달해 map 렌더링 단순화
 *
 * @param {SidemenuProps} props
 * @param {User} props.user - 아바타에 표시할 사용자 정보
 *
 * @example
 * ```tsx
 * <Sidemenu user={user} />
 * ```
 */

export default function Sidemenu({ user }: SidemenuProps) {
  const pathname = usePathname();
  return (
    <aside
      className='hidden w-178 overflow-hidden rounded-12 px-14 py-24 shadow-card sm:block sm:py-16 md:w-290'
      aria-label='마이페이지 사이드 메뉴'>
      <Avatar user={user} size='md' className='mx-auto h-70 md:h-120 md:w-120'>
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
