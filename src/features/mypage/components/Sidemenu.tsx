'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Icons from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import { User } from '@/shared/types/user.type';
import { cn } from '@/shared/utils/cn';

interface MypageInActionsProps {
  user: User;
}

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

export default function Sidemenu({ user }: MypageInActionsProps) {
  const pathname = usePathname();
  return (
    <aside className='w-178 overflow-hidden rounded-12 px-14 py-24 shadow-card sm:py-16 md:w-290'>
      <Avatar user={user} size='md' className='h:70 mx-auto h-70 md:h-120 md:w-120'>
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
      <ul className='mt-10 md:mt-24'>
        <li>
          <Link
            href='/mypage/info'
            title='내 정보로 이동'
            className={cn(mypageLinkClass, pathname === '/mypage/info' && activeLinkClass)}>
            <Icons.User className='w-24' /> 내 정보
          </Link>
        </li>
        <li>
          <Link
            href='/mypage/reservation-list'
            title='예약 내역으로 이동'
            className={cn(
              mypageLinkClass,
              pathname === '/mypage/reservation-list' && activeLinkClass
            )}>
            <Icons.ReservationStatus className='w-24' /> 예약 내역
          </Link>
        </li>
        <li>
          <Link
            href='/mypage/activity'
            title='내 체험 관리로 이동'
            className={cn(mypageLinkClass, pathname === '/mypage/activity' && activeLinkClass)}>
            <Icons.Setting className='w-24' /> 내 체험 관리
          </Link>
        </li>
        <li>
          <Link
            href='/mypage/reservation-status'
            title='예약 현황으로 이동'
            className={cn(
              mypageLinkClass,
              pathname === '/mypage/reservation-status' && activeLinkClass
            )}>
            <Icons.ReservationList className='w-24' /> 예약 현황
          </Link>
        </li>
      </ul>
    </aside>
  );
}
