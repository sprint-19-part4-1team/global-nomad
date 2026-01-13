'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ActivityReservationBottomSheet from '@/features/activity-detail/components/reservation/ActivityReservationBottomSheet';
import ActivityReservationContent from '@/features/activity-detail/components/reservation/content/ActivityReservationContent';
import { createActivityReservation } from '@/shared/apis/feature/activities';
import Button from '@/shared/components/button/Button';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useUserStore } from '@/shared/stores/userStore';
import { CreateReservationBodyDto } from '@/shared/types/activities';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * 체험 예약 컴포넌트의 Props
 *
 * @property {string} activityId - 체험 ID
 * @property {number} userId - 체험을 작성한 유저 ID
 * @property {number} price - 1인당 체험 가격
 */
interface ActivityReservationProps {
  activityId: string;
  userId: number;
  price: number;
}

/**
 * 체험 상세 페이지의 체험 예약 컴포넌트
 *
 * 화면 크기에 따라 다른 UI로 체험 예약 기능을 제공합니다.
 * 모바일/태블릿에서는 하단 고정 바와 바텀시트를, 데스크톱에서는 오른쪽 고정 패널을 표시합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다.
 * - 반응형 UI: 화면 크기에 따라 다른 레이아웃 제공
 *   - 모바일/태블릿 (lg 미만): 하단 고정 바 + 바텀시트
 *   - 데스크톱 (lg 이상): 오른쪽 고정 예약 패널
 * - 예약 정보 관리: 선택한 날짜, 시간, 인원 정보 상태 관리
 * - 총 금액 계산: 인원 수에 따른 총 가격 자동 계산 및 표시
 * - 바텀시트 제어: overlayStore를 통한 바텀시트 열기/닫기
 * - 선택 상태 표시: 날짜 선택 전/후에 따라 다른 텍스트 표시
 * - 예약 실행: 선택된 정보로 예약 처리 및 성공 시 상태 초기화
 * - 데이터 조회 최적화: 각 컴포넌트가 자체적으로 데이터 조회하여 즉시 반영
 *
 * 모바일/태블릿에서는 하단 바에 총 금액과 인원 수를 표시하며,
 * "날짜 선택하기" 또는 선택된 날짜/시간을 표시합니다.
 *
 * 접근 제어
 * - 로그인하지 않은 사용자: 예약 UI 미표시
 * - 체험 작성자 본인: 예약 UI 미표시 (자신의 체험은 예약 불가)
 *
 * @param {ActivityReservationProps} props - 컴포넌트 props
 * @returns {JSX.Element | null} 렌더링된 체험 예약 UI 또는 null
 *
 * @example
 * ```tsx
 * <ActivityReservation
 *   activityId="123"
 *   userId={456}
 *   price={50000}
 * />
 * ```
 */
export default function ActivityReservation({
  activityId,
  userId,
  price,
}: ActivityReservationProps) {
  const loginUserId = useUserStore((s) => s.user?.id);

  // 모바일 하단 바에 표시할 예약 정보 (바텀시트에서 확인 시 저장)
  const [reservationInfo, setReservationInfo] = useState<{
    scheduleId: number;
    headCount: number;
    dateTime: string;
  } | null>(null);

  /** 예약 처리 핸들러 */
  const handleReservation = useCallback(
    async (data: CreateReservationBodyDto) => {
      try {
        await createActivityReservation(Number(activityId), data);
        toast.info('예약이 완료되었습니다!');

        // 예약 성공 시 상태 초기화
        setReservationInfo(null);
      } catch {
        toast.error('예약에 실패했습니다.');
      }
    },
    [activityId]
  );

  /** 바텀 시트 열기 핸들러 */
  const handleOpenBottomSheet = useCallback(() => {
    overlayStore.push(
      <ActivityReservationBottomSheet
        activityId={activityId}
        price={price}
        onConfirm={(info) => {
          setReservationInfo(info);
          overlayStore.pop();
        }}
      />
    );
  }, [activityId, price]);

  /** 모바일 예약 버튼 클릭 핸들러 */
  const handleMobileReservation = useCallback(() => {
    if (reservationInfo) {
      handleReservation({
        scheduleId: reservationInfo.scheduleId,
        headCount: reservationInfo.headCount,
      });
    } else {
      handleOpenBottomSheet();
    }
  }, [reservationInfo, handleReservation, handleOpenBottomSheet]);

  // 로그인하지 않았거나 체험 작성 유저와 로그인한 유저가 같은 경우
  if (loginUserId === undefined || userId === loginUserId) {
    return null;
  }

  const personNumber = reservationInfo?.headCount ?? 1;
  const totalPrice = price * personNumber;

  return (
    <>
      {/* 모바일/태블릿: 하단 고정 바 */}
      <div className='fixed right-0 bottom-0 left-0 z-10 flex flex-col gap-12 border-t border-gray-100 bg-white px-24 py-18 lg:hidden'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <span className='body-18 font-bold text-gray-950'>₩ {formatValue(totalPrice)}</span>
            <span className='body-16 font-medium text-gray-700'>/ {personNumber}명</span>
          </div>
          <button
            onClick={handleOpenBottomSheet}
            className='body-14 font-medium text-primary-500 underline'>
            {reservationInfo ? reservationInfo.dateTime : '날짜 선택하기'}
          </button>
        </div>
        <Button full onClick={handleMobileReservation} disabled={!reservationInfo}>
          예약하기
        </Button>
      </div>

      {/* 데스크톱: 오른쪽 고정 영역 */}
      <div className='mt-48 hidden lg:block'>
        <ActivityReservationContent
          activityId={activityId}
          price={price}
          onReservation={handleReservation}
        />
      </div>
    </>
  );
}
