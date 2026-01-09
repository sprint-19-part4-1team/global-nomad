import { createTimeRange } from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/utils/createTimeRange';

/**
 * ## START_HOURS
 *
 * @description
 * - 체험 시작 가능 시간 목록 (06:00 ~ 21:00, 1시간 단위)
 */
export const START_HOURS = createTimeRange(6, 21);

/**
 * ## DURATION_OPTIONS
 *
 * @description
 * - 체험 소요 시간 선택 옵션 목록입니다.
 * - 단위는 분(minute)이며, UI 표시용 label과 실제 값(value)을 함께 정의합니다.
 */
export const DURATION_OPTIONS = [
  { label: '1시간', value: 60 },
  { label: '2시간', value: 120 },
] as const;
