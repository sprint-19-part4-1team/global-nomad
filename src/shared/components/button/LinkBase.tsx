import Link, { LinkProps } from 'next/link';

/**
 * ## LinkBase
 *
 * @description
 * - Button 컴포넌트에서 navigation 역할을 담당하는 base 컴포넌트입니다.
 * - 디자인/variant 로직 없이 Next.js `Link`의 역할만 그대로 위임합니다.
 * - 외부에서 직접 사용하지 않고, Button 내부 구현 전용으로 사용됩니다.
 *
 * @param props
 * - Next.js `Link` 컴포넌트의 모든 기본 props
 */
export default function LinkBase(props: LinkProps) {
  return <Link {...props} />;
}
