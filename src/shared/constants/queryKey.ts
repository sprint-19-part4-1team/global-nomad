/**
 * ## QUERY_KEYS
 *
 * @description
 * 리액트 쿼리의 쿼리키 관리를 위한 상수 파일입니다.
 * 쿼리키는 하드 코딩하지 않고, 쿼리키 상수로 관리합니다.
 */
export const QUERY_KEYS = {
  /** 내 정보 조회 */
  MY_INFO: ['myInfo'],
  /** 체험 상세 조회 */
  ACTIVITY_DETAIL: (activityId: number) => ['activityDetail', activityId],
} as const;
