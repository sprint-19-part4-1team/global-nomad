'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import { RESERVATION_STATUSES } from '@/features/mypage/common/constants/reservationStatus';
import ReservationFilterButton from '@/features/mypage/reservation-list/components/ReservationFilterButton';
import ReservationList from '@/features/mypage/reservation-list/components/ReservationList';
import ReviewModal from '@/features/mypage/reservation-list/components/ReviewModal';
import { RESERVATION_EMPTY_TEXT } from '@/features/mypage/reservation-list/constants/reservationEmptyText';
import { useCancelReservationMutation } from '@/features/mypage/reservation-list/mutations/useCancelReservationMutation';
import { useCreateReviewMutation } from '@/features/mypage/reservation-list/mutations/useCreateReviewMutation';
import { useMyReservationsQuery } from '@/features/mypage/reservation-list/queries/useMyReservationsQuery';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useUserStore } from '@/shared/stores/userStore';
import type {
  ReservationStatus,
  ReservationWithActivityResponseDto,
} from '@/shared/types/myReservations';

export default function MypageReservationList() {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);
  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMyReservationsQuery({ status: selectedStatus ?? undefined });
  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];
  const userId = useUserStore((s) => s.user?.id);
  const emptyText =
    selectedStatus === null ? '아직 예약한 체험이 없어요.' : RESERVATION_EMPTY_TEXT[selectedStatus];

  const handleStatusSelect = (status: ReservationStatus) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  const cancelReservationMutation = useCancelReservationMutation({
    userId,
    status: selectedStatus ?? undefined,
    size: 4,
    onClose: () => overlayStore.pop(),
  });

  const createReviewMutation = useCreateReviewMutation({
    userId,
    status: selectedStatus ?? undefined,
    size: 4,
    onClose: () => overlayStore.pop(),
  });

  const handleCancelReservation = (reservationId: number) => {
    if (cancelReservationMutation.isPending) {
      return;
    }

    cancelReservationMutation.mutate(reservationId, {
      onSuccess: () => overlayStore.pop(),
      onError: () => toast.error('예약 취소에 실패했습니다.'),
    });
  };

  const showCancelConfirm = (reservationId: number) => {
    overlayStore.push(
      <Dialog
        variant='confirm'
        message='정말 예약을 취소하시겠습니까?'
        cancelLabel='취소'
        confirmLabel='예약 취소'
        onCancel={() => overlayStore.pop()}
        isConfirm={cancelReservationMutation.isPending}
        onConfirm={() => handleCancelReservation(reservationId)}
      />
    );
  };

  const showReviewModal = (reservation: ReservationWithActivityResponseDto) => {
    overlayStore.push(
      <ReviewModal
        activityTitle={reservation.activity.title}
        date={reservation.date}
        startTime={reservation.startTime}
        endTime={reservation.endTime}
        headCount={reservation.headCount}
        onSubmit={async (content, rating) => {
          await createReviewMutation.mutateAsync({
            reservationId: reservation.id,
            content,
            rating,
          });
        }}
      />
    );
  };

  return (
    <>
      <MypageSectionHeader title='예약 내역' description='체험 예약을 변경/취소할 수 있습니다.' />

      {/* 필터 버튼 섹션 */}
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

      {/* 예약 내역 리스트 섹션 */}
      <section className='flex w-full flex-col gap-24'>
        <ReservationList
          isPending={isPending}
          isError={isError}
          onRetry={refetch}
          reservations={reservations}
          emptyText={emptyText}
          setCancelTarget={showCancelConfirm}
          setReviewTarget={showReviewModal}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </section>
    </>
  );
}
