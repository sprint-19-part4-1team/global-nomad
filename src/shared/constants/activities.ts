/** 카테고리 */
export const ACTIVITY_CATEGORIES = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
] as const;
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

/** 조회 방식 */
export const ACTIVITY_LIST_METHODS = ['offset', 'cursor'] as const;
export type ActivityListMethod = (typeof ACTIVITY_LIST_METHODS)[number];

/** 정렬 */
export const ACTIVITY_SORT_OPTIONS = [
  'most_reviewed',
  'price_asc',
  'price_desc',
  'latest',
] as const;
export type ActivitySortOption = (typeof ACTIVITY_SORT_OPTIONS)[number];
