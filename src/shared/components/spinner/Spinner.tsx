interface SpinnerProps {
  size?: number;
  borderWidth?: number;
}

/**
 * ## Spinner
 *
 * @description
 * - 간단한 비동기 처리 중 상태를 표시하기 위한 스피너 컴포넌트입니다.
 * - **부모 요소의 `color` 값을 상속**하여 자동으로 색상이 결정됩니다.
 * - 버튼 내부, 인라인 로딩 등 **짧은 대기 시간의 로딩 표현**에 적합합니다.
 * - 전체 페이지 로딩이나 대체 콘텐츠가 필요한 경우에는
 *   Spinner 대신 **Skeleton UI** 사용을 권장합니다.
 *
 * @param size - 스피너 크기 (기본값: 16px)
 * @param borderWidth - 스피너 두께 (기본값: 2px)
 */
export default function Spinner({ size = 16, borderWidth = 2 }: SpinnerProps) {
  return (
    <span
      className='inline-block animate-spin rounded-full border-current border-t-[rgba(255,255,255,0.2)]'
      style={{ width: size, height: size, borderWidth }}
      aria-hidden
    />
  );
}
