import { ComponentProps } from 'react';

/**
 * ## ButtonBase
 *
 * @description
 * - Button 컴포넌트에서 action 역할을 담당하는 base 컴포넌트입니다.
 * - 디자인, 상태 분기, 비즈니스 로직 없이
 *   HTML `<button>` 요소의 역할만 그대로 위임합니다.
 * - 외부에서 직접 사용하지 않고, Button 내부 구현 전용으로 사용됩니다.
 *
 * @param props
 * - HTML `<button>` 요소가 지원하는 모든 기본 props
 */
export default function ButtonBase(props: ComponentProps<'button'>) {
  return <button {...props} />;
}
