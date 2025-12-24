import { LAYER } from '@/shared/components/overlay/constants/layer';

/**
 * ## Backdrop (Dimmed Layer)
 *
 * - Modal / Dialog / BottomSheet 뒤에 깔리는 dimmed 배경
 * - 배경 콘텐츠와의 상호작용을 시각적·논리적으로 차단
 *
 * ## ⚠️ 주의:
 * - 단독으로 사용하지 않고 항상 `overlay` 계열 컴포넌트와 함께 사용
 * - 클릭 이벤트, 스크롤 락 등 행동 로직은 상위 컴포넌트에서 제어
 */
export default function Backdrop() {
  return <div className={`absolute h-dvh w-dvw bg-op-50 ${LAYER.backdrop}`} />;
}
