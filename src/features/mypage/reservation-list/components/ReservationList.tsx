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

/**
 * @description
 * - 마이페이지 예약 내역 목록을 렌더링하는 컴포넌트입니다.
 * - 로딩, 에러, 빈 상태, 목록 상태를 하나의 흐름으로 처리합니다.
 * - 네트워크 에러 발생 시 토스트 메시지를 표시합니다.
 *
 * @param isPending - 예약 목록 조회 로딩 여부
 * @param isError - 예약 목록 조회 에러 여부
 * @param reservations - 예약 내역 목록 데이터
 * @param emptyText - 예약 내역이 없을 때 표시할 문구
 * @param setCancelTarget - 예약 취소 모달을 열기 위한 예약 ID 설정 함수
 * @param hasNextPage - 추가 페이지 존재 여부
 * @param isFetchingNextPage - 추가 페이지 조회 중 여부
 * @param fetchNextPage - 다음 페이지를 불러오는 함수
 */
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
