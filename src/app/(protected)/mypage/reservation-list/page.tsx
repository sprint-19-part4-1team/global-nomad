'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import { RESERVATION_STATUSES } from '@/features/mypage/common/constants/reservationStatus';
import CancelReservationModal from '@/features/mypage/reservation-list/components/CancelReservationModal';
import ReservationFilterButton from '@/features/mypage/reservation-list/components/ReservationFilterButton';
import ReservationList from '@/features/mypage/reservation-list/components/ReservationList';
import { RESERVATION_EMPTY_TEXT } from '@/features/mypage/reservation-list/constants/reservationEmptyText';
import { useMyReservationsQuery } from '@/features/mypage/reservation-list/queries/useMyReservationsQuery';
import { updateMyReservation } from '@/shared/apis/feature/myReservations';
import { ReservationStatus } from '@/shared/types/myReservations';

export default function MypageReservationList() {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMyReservationsQuery({ status: selectedStatus ?? undefined });

  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];

  const emptyText =
    selectedStatus === null ? '아직 예약한 체험이 없어요.' : RESERVATION_EMPTY_TEXT[selectedStatus];

  const handleStatusSelect = (status: ReservationStatus) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  const handleCloseCancelModal = () => {
    setCancelTarget(null);
  };

  const cancelReservationMutation = useMutation({
    mutationFn: async (reservationId: number) => {
      return updateMyReservation(reservationId, {
        status: ReservationStatus.Canceled,
      });
    },
    onSuccess: async () => {
      toast.success('예약이 취소되었습니다.');
      handleCloseCancelModal();
      await refetch();
    },
    onError: () => {
      toast.error('예약 취소에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const handleCancelReservation = () => {
    if (cancelReservationMutation.isPending) {
      return;
    }
    if (cancelTarget === null) {
      toast.error('취소 대상 예약이 없습니다.');
      return;
    }

    cancelReservationMutation.mutate(cancelTarget);
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
          reservations={reservations}
          emptyText={emptyText}
          setCancelTarget={setCancelTarget}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </section>

      {/* 취소 모달 */}
      {cancelTarget !== null && (
        <CancelReservationModal
          isPending={cancelReservationMutation.isPending}
          onClose={handleCloseCancelModal}
          onConfirm={handleCancelReservation}
        />
      )}
    </>
  );
}
