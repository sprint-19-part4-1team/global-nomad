'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import { RESERVATION_STATUSES } from '@/features/mypage/common/constants/reservationStatus';
import ReservationFilterButton from '@/features/mypage/reservation-list/components/ReservationFilterButton';
import ReservationList from '@/features/mypage/reservation-list/components/ReservationList';
import { RESERVATION_EMPTY_TEXT } from '@/features/mypage/reservation-list/constants/reservationEmptyText';
import { useMyReservationsQuery } from '@/features/mypage/reservation-list/queries/useMyReservationsQuery';
import { updateMyReservation } from '@/shared/apis/feature/myReservations';
import Button from '@/shared/components/button/Button';
import useBodyScrollLock from '@/shared/components/overlay/hooks/useBodyScrollLock';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
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
    mutationFn: async () => {
      if (cancelTarget === null) {
        throw new Error('취소 대상 예약이 없습니다.');
      }
      return updateMyReservation(cancelTarget, {
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
    cancelReservationMutation.mutate();
  };

  useBodyScrollLock(cancelTarget !== null);

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

      {/* 예약 내역 리스트 색션 */}
      <section className='flex w-full flex-col gap-24'>
        <ReservationList
          isPending={isPending}
          isError={isError}
          reservations={reservations}
          emptyText={emptyText}
          setCancelTarget={setCancelTarget}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </section>

      {cancelTarget !== null && (
        <>
          <Backdrop />
          <OverlaySurface variant='dialog' position='center' className='px-30 py-28'>
            <div className='flex flex-col items-center justify-center gap-24'>
              <div className='flex flex-col items-center gap-2'>
                <Icons.SurprisedEarth className='h-49 w-49 sm:h-88 sm:w-88' />
                <span className='body-16 font-bold text-gray-950 sm:body-18'>
                  예약을 취소하시겠어요?
                </span>
              </div>

              <div className='grid w-full grid-cols-2 gap-12 sm:px-24'>
                <Button
                  full
                  variant='secondary'
                  size='lg'
                  className='font-semibold'
                  onClick={handleCloseCancelModal}
                  disabled={cancelReservationMutation.isPending}>
                  닫기
                </Button>
                <Button
                  full
                  size='lg'
                  className='font-semibold'
                  onClick={handleCancelReservation}
                  disabled={cancelReservationMutation.isPending}>
                  {cancelReservationMutation.isPending ? '취소 중...' : '취소하기'}
                </Button>
              </div>
            </div>
          </OverlaySurface>
        </>
      )}
    </>
  );
}
