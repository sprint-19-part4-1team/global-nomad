'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import ReservationCard from '@/features/mypage/reservation-list/components/reservation-card/ReservationCard';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import type { GetMyReservationsResponse } from '@/shared/types/myReservations';

interface ReservationListProps {
  isPending: boolean;
  isError: boolean;
  reservations: GetMyReservationsResponse['reservations'];
  emptyText: string;
  setCancelTarget: (id: number) => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function ReservationList({
  isPending,
  isError,
  reservations,
  emptyText,
  setCancelTarget,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ReservationListProps) {
  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error('네트워크 연결이 끊어졌습니다. 다시 시도해주세요.', {
      toastId: 'my-reservations-network-error',
    });
  }, [isError]);

  return (
    <>
      {isPending && <MypageListSkeleton variant='reservation' />}

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
              onCancel={() => setCancelTarget(r.id)}
            />
          ))}

          {hasNextPage && (
            <button type='button' disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? '불러오는 중...' : '더보기'}
            </button>
          )}
        </>
      )}
    </>
  );
}
