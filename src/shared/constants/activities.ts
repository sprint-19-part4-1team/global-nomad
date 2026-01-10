/** 체험 카테고리 */
export const ACTIVITY_CATEGORIES = [
  { value: '문화 · 예술', label: '🎨 문화 · 예술' },
  { value: '식음료', label: '🍜 식음료' },
  { value: '투어', label: '🏙️ 투어' },
  { value: '관광', label: '🚍 관광' },
  { value: '웰빙', label: '🌿 웰빙' },
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number]['value'];

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
