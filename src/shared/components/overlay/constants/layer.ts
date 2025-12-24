/**
 * ## UI 레이어(z-index) 규칙
 *
 * - overlay 계열 컴포넌트에서 사용하는 z-index 토큰
 * - 숫자값을 직접 쓰지 않고 의미 기반으로 관리
 *
 * 사용 원칙:
 * 1. backdrop < overlaySurface 순서를 항상 유지
 * 2. 같은 레이어 레벨에서는 z-index를 새로 추가하지 않음
 * 3. 새로운 overlay 계열이 필요하면 이 파일에만 추가
 */
export const LAYER = {
  /**
   * Modal / BottomSheet / Dialog 뒤의 dimmed 배경
   * - 화면의 다른 UI와의 상호작용을 차단하는 역할
   */
  backdrop: 'z-10',
  /**
   * Modal / Dialog / BottomSheet의 실제 콘텐츠 영역
   * - Backdrop 위에 위치하는 떠 있는 표면(Surface)
   */
  overlaySurface: 'z-20',
} as const;
