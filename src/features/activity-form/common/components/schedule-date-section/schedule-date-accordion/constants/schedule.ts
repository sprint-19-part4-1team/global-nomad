import { createTimeRange } from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/utils/createTimeRange';

/**
 * ## START_HOURS
 *
 * @description
 * - 체험 시작 가능 시간 목록 (06:00 ~ 21:00, 1시간 단위)
 */
export const START_HOURS = createTimeRange(6, 21);
