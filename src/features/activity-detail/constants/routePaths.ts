/** 체험 상세 페이지에서 사용하는 경로 모음 상수 */
export const ROUTE_PATHS = {
  /** 마이페이지 > 예약 현황 페이지 */
  RESERVATION_STATUS: '/mypage/reservation-status',

  /**
   * 체험 수정 페이지
   * @param id 체험 ID
   * @returns 체험 수정 페이지 경로
   *
   * 예: /activity/3/edit
   */
  ACTIVITY_EDIT: (id: number) => `/activity/${id}/edit`,
};
