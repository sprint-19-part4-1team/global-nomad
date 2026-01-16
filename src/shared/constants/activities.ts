/** 체험 카테고리 */
export const ACTIVITY_CATEGORIES = [
  { value: '문화 · 예술', label: '🎨 문화 · 예술' },
  { value: '식음료', label: '🍜 식음료' },
  { value: '스포츠', label: '⚽️ 스포츠' },
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

/** 메인 모든 체험 정렬 */
export const SORT_LABELS: Record<string, string> = {
  latest: '최신순',
  most_reviewed: '리뷰 많은순',
  price_desc: '가격 높은순',
  price_asc: '가격 낮은순',
} as const;

/** 체험 등록/수정 폼 검증 규칙 */
export const ACTIVITY_FORM = {
  /** 최대 타이틀 길이 */
  TITLE_MAX_LENGTH: 20,
  /** 최소 금액 */
  PRICE_MIN_AMOUNT: 1000,
  /** 최대 금액 */
  PRICE_MAX_AMOUNT: 999_999,
};
