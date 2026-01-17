'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import ReservationCard from '@/features/mypage/reservation-list/components/reservation-card/ReservationCard';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import type { GetMyReservationsResponse } from '@/shared/types/myReservations';

interface ReservationListProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  reservations: GetMyReservationsResponse['reservations'];
  emptyText: string;
  setCancelTarget: (id: number) => void;
  setReviewTarget: (reservation: GetMyReservationsResponse['reservations'][number]) => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/**
 * @description
 * - 마이페이지 예약 내역 목록을 렌더링하는 컴포넌트입니다.
 * - 로딩, 에러, 빈 상태, 목록 상태를 하나의 흐름으로 처리합니다.
 * - 네트워크 에러 발생 시 토스트 메시지를 표시합니다.
 *
 * @param isPending - 예약 목록 조회 로딩 여부
 * @param isError - 예약 목록 조회 에러 여부
 * @param onRetry - 예약 목록 재조회 함수
 * @param reservations - 예약 내역 목록 데이터
 * @param emptyText - 예약 내역이 없을 때 표시할 문구
 * @param setCancelTarget - 예약 취소 모달을 열기 위한 예약 ID 설정 함수
 * @param setReviewTarget - 후기 작성 모달을 열기 위한 예약 정보 설정 함수
 * @param hasNextPage - 추가 페이지 존재 여부
 * @param isFetchingNextPage - 추가 페이지 조회 중 여부
 * @param fetchNextPage - 다음 페이지를 불러오는 함수
 */
export default function ReservationList({
  isPending,
  isError,
  onRetry,
  reservations,
  emptyText,
  setCancelTarget,
  setReviewTarget,
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

  const observerRef = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <>
      {isError && (
        <EmptyState
          type='error'
          mainText='예약 내역을 불러오지 못했어요.'
          button={{ text: '다시 시도하기', onClick: onRetry }}
        />
      )}
      {isPending && !isError && <MypageListSkeleton variant='reservation' />}

      {!isPending && !isError && reservations.length === 0 && (
        <EmptyState
          type='experience'
          mainText={emptyText}
          button={{ href: '/', text: '체험 둘러보기' }}
        />
      )}

      {!isPending && !isError && reservations.length > 0 && (
        <>
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onCancel={() => setCancelTarget(reservation.id)}
              onWriteReview={() => setReviewTarget(reservation)}
            />
          ))}

          {hasNextPage && (
            <>
              <div ref={observerRef} aria-hidden='true' />
              {isFetchingNextPage && <MypageListSkeleton variant='reservation' count={2} />}
            </>
          )}
        </>
      )}
    </>
  );
}
