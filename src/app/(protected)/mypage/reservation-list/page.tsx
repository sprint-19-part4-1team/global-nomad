'use client';

import { useState } from 'react';
import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';
import ReservationCard from '@/features/mypage/reservation-list/components/ReservationCard';
import ReservationFilterButton from '@/features/mypage/reservation-list/components/ReservationFilterButton';
import { RESERVATION_STATUSES } from '@/features/mypage/reservation-list/constants/common';
import { ReservationStatus } from '@/shared/types/myReservations';

export default function MypageReservationList() {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);

  const handleStatusSelect = (status: ReservationStatus) => {
    setSelectedStatus(status);
  };

  // TODO: 마이페이지 예약 내역 리스트 페이지 구현
  return (
    <>
      <MypageSectionHeader title='예약 내역' description='체험 예약을 변경/취소할 수 있습니다.' />
      <section className='my-24 scrollbar-hidden flex w-full gap-8 overflow-x-auto sm:my-32'>
        {RESERVATION_STATUSES.map((status) => (
          <ReservationFilterButton
            key={status}
            status={status}
            isActive={selectedStatus === status}
            onSelect={handleStatusSelect}
          />
        ))}
      </section>
      <section className='flex h-full w-full flex-col gap-24'>
        {/* TODO: 예약 내역 카드 표시 */}
        <ReservationCard
          status={ReservationStatus.Pending}
          title='함께'
          date='2023-02-14'
          startTime='11:00'
          endTime='12:30'
          totalPrice={10000}
          headCount={10}
          imageUrl='/og-default.png'
        />
        <ReservationCard
          status={ReservationStatus.Canceled}
          title='함께 배우면'
          date='2023-02-14'
          startTime='11:00'
          endTime='12:31'
          totalPrice={20000}
          headCount={20}
          imageUrl='/og-default.png'
        />
        <ReservationCard
          status={ReservationStatus.Declined}
          title='함께 배우면 즐거운'
          date='2023-02-14'
          startTime='11:00'
          endTime='12:32'
          totalPrice={30000}
          headCount={30}
          imageUrl='/og-default.png'
        />
        <ReservationCard
          status={ReservationStatus.Confirmed}
          title='함께 배우면 즐거운 스트릿'
          date='2023-02-14'
          startTime='11:00'
          endTime='12:33'
          totalPrice={40000}
          headCount={40}
          imageUrl='/og-default.png'
        />
        <ReservationCard
          status={ReservationStatus.Completed}
          title='함께 배우면 즐거운 스트릿 댄스'
          date='2023-02-14'
          startTime='11:00'
          endTime='12:34'
          totalPrice={50000}
          headCount={50}
          imageUrl='/og-default.png'
        />
      </section>
    </>
  );
}
