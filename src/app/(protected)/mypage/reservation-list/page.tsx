'use client';

import { useState } from 'react';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import { RESERVATION_STATUSES } from '@/features/mypage/common/constants/reservationStatus';
import ReservationCard from '@/features/mypage/reservation-list/components/reservation-card/ReservationCard';
import ReservationFilterButton from '@/features/mypage/reservation-list/components/ReservationFilterButton';
import { RESERVATION_EMPTY_TEXT } from '@/features/mypage/reservation-list/constants/reservationEmptyText';
import { useMyReservationsQuery } from '@/features/mypage/reservation-list/queries/useMyReservationsQuery';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import { ReservationStatus } from '@/shared/types/myReservations';

export default function MypageReservationList() {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);

  const handleStatusSelect = (status: ReservationStatus) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyReservationsQuery({ status: selectedStatus ?? undefined });

  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];
  const emptyText =
    selectedStatus === null ? '아직 예약한 체험이 없어요.' : RESERVATION_EMPTY_TEXT[selectedStatus];

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
      <section className='flex w-full flex-col gap-24'>
        {isPending && <MypageListSkeleton variant='reservation' />}

        {isError && <p>예약 내역을 불러오지 못했습니다.</p>}

        {!isPending && !isError && reservations.length === 0 && (
          <EmptyState
            type='experience'
            mainText={emptyText}
            button={{ href: '/', text: '체험 둘러보기' }}
          />
        )}

        {!isPending && !isError && reservations.length > 0 && (
          <>
            {reservations.map((r) => (
              <ReservationCard
                key={r.id}
                status={r.status}
                title={r.activity.title}
                date={r.date}
                startTime={r.startTime}
                endTime={r.endTime}
                totalPrice={r.totalPrice}
                headCount={r.headCount}
                imageUrl={r.activity.bannerImageUrl}
                reviewSubmitted={r.reviewSubmitted}
              />
            ))}

            {hasNextPage && (
              <button type='button' disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? '불러오는 중...' : '더보기'}
              </button>
            )}
          </>
        )}
      </section>
    </>
  );
}
