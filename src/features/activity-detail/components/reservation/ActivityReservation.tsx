'use client';

import { useState } from 'react';
import ActivityReservationBottomSheet from '@/features/activity-detail/components/reservation/ActivityReservationBottomSheet';
import ActivityReservationContent from '@/features/activity-detail/components/reservation/content/ActivityReservationContent';
import Button from '@/shared/components/button/Button';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { formatValue } from '@/shared/utils/formatValue';

// TODO: API 연동 후 삭제
const DUMMY_AVAILABLE = [
  {
    date: '2026-01-05',
    times: [
      {
        id: 45116,
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        id: 45117,
        startTime: '13:00',
        endTime: '14:00',
      },
      {
        id: 45118,
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
  {
    date: '2026-01-12',
    times: [
      {
        id: 45119,
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        id: 45120,
        startTime: '13:00',
        endTime: '14:00',
      },
      {
        id: 45121,
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
  {
    date: '2026-01-13',
    times: [
      {
        id: 45122,
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        id: 45123,
        startTime: '13:00',
        endTime: '14:00',
      },
      {
        id: 45124,
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
  {
    date: '2026-01-14',
    times: [
      {
        id: 45127,
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
  {
    date: '2026-01-15',
    times: [
      {
        id: 45132,
        startTime: '13:00',
        endTime: '14:00',
      },
      {
        id: 45133,
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
];

/**
 * 체험 예약 컴포넌트의 Props
 * @property {string} activityId - 체험 ID
 * @property {number} price - 1인당 체험 가격
 */
interface ActivityReservationProps {
  activityId: string;
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
 * - 예약 실행: 선택된 정보로 예약 처리 (현재 콘솔 로그, API 연동 예정)
 *
 * 모바일/태블릿에서는 하단 바에 총 금액과 인원 수를 표시하며,
 * "날짜 선택하기" 또는 선택된 날짜/시간을 표시합니다.
 *
 * @param {ActivityReservationProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 체험 예약 UI
 *
 * @example
 * ```tsx
 * <ActivityReservation
 *   activityId="123"
 *   price={50000}
 * />
 * ```
 */
export default function ActivityReservation({ activityId, price }: ActivityReservationProps) {
  const [reservationInfo, setReservationInfo] = useState<{
    scheduleId: number;
    headCount: number;
    dateTime: string;
  } | null>(null);

  const schedules = DUMMY_AVAILABLE;
  const personNumber = reservationInfo?.headCount ? reservationInfo.headCount : 1;
  const totalPrice = price * personNumber;

  const handleOpenBottomSheet = () => {
    overlayStore.push(
      <ActivityReservationBottomSheet
        price={price}
        schedules={schedules}
        onConfirm={(info) => {
          setReservationInfo(info);
          overlayStore.pop();
        }}
      />
    );
  };

  const handleReservation = () => {
    if (!reservationInfo) {
      return;
    }
    // TODO: API 연동시 코드 삭제
    console.log(activityId);
    console.log({
      scheduleId: reservationInfo.scheduleId,
      headCount: reservationInfo.headCount,
    });
  };

  return (
    <>
      {/* 모바일/태블릿: 하단 고정 바 + 바텀시트 */}
      <div className='fixed right-0 bottom-0 left-0 z-10 flex flex-col gap-12 border-t border-gray-100 bg-white px-24 py-18 lg:hidden'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <span className='body-18 font-bold text-gray-950'>₩ {formatValue(totalPrice)}</span>
            <span className='body-16 font-medium text-gray-700'>/ {personNumber}명</span>
          </div>
          <button
            onClick={handleOpenBottomSheet}
            className='body-14 font-medium text-primary-500 underline'>
            {reservationInfo ? reservationInfo.dateTime : <>날짜 선택하기</>}
          </button>
        </div>
        <Button
          full
          onClick={reservationInfo ? handleReservation : handleOpenBottomSheet}
          disabled={!reservationInfo && false}>
          예약하기
        </Button>
      </div>

      {/* 데스크톱: 오른쪽 고정 영역 */}
      <div className='hidden lg:block'>
        <ActivityReservationContent
          price={price}
          schedules={schedules}
          onReservation={handleReservation}
        />
      </div>
    </>
  );
}
