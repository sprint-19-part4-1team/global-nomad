import type { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

/** 요일 헤더 배열 (일요일부터 토요일까지) */
export const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

/**
 * 달력 UI 스타일 상수
 *
 * @property MONTH_BTN - 월 이동 버튼 스타일
 * @property STATUS - 예약 상태 뱃지 스타일
 */
export const CALENDAR_STYLE = {
  MONTH_BTN: 'h-20 w-20 cursor-pointer sm:h-24 sm:w-24',
  STATUS:
    'flex h-16 items-center justify-between rounded-4 px-8 py-2 text-[10px] tracking-[-0.25px] whitespace-nowrap sm:h-21 sm:text-[14px] sm:tracking-[-0.35px]',
} as const;

/**
 * 예약 상태별 라벨 및 스타일 설정
 *
 * @description
 * FindReservationsByMonthResponseDto의 reservations 키를 기반으로 타입 추론
 *
 * @property completed - 완료 상태 (회색)
 * @property pending - 예약 대기 상태 (파랑)
 * @property confirmed - 승인 상태 (주황)
 */
export const RESERVATION_STATUS_CONFIG: Record<
  keyof FindReservationsByMonthResponseDto['reservations'],
  {
    label: string;
    style: string;
  }
> = {
  completed: {
    label: '완료',
    style: 'gap-3 bg-gray-50 text-gray-500',
  },
  pending: {
    label: '예약',
    style: 'gap-2 bg-primary-100 text-primary-500',
  },
  confirmed: {
    label: '승인',
    style: 'gap-2 bg-orange-100 text-orange-500',
  },
};
