import Link from 'next/link';
import Logos from '@/assets/logo';

interface LogoProps {
  variant?: 'login' | 'header';
}

/**
 * 서비스 로고를 렌더링하는 공통 컴포넌트
 *
 * variant 값에 따라 로그인 화면용 로고와
 * 헤더 네비게이션용 로고를 분기해서 표시한다.
 *
 * 반응형 기준:
 * - 모바일(sm 이하): 심플한 로고 표시
 * - PC(md 이상): 풀 로고 표시
 *
 * 모든 로고는 홈(`/`)으로 이동하는 링크를 포함한다.
 *
 * @param props.variant
 * - `login`: 로그인 / 회원가입 화면에서 사용하는 로고
 * - `header`: 헤더 네비게이션에서 사용하는 로고 (기본값)
 *
 * @example
 * ```tsx
 *
 * defalut 는 header
 * <Logo />
 *
 * <Logo variant="login" />
 * <Logo variant="header" />
 * ```
 */

const LOGO_VARIANTS = {
  login: {
    DesktopComponent: Logos.LogoLogin,
    desktopClassName:
      'hidden w-255 sm:block text-[#1F1F22] transition transition-color duration-500 hover:text-primary-600',
    MobileComponent: Logos.Logo,
    mobileClassName: 'block w-144 sm:hidden',
  },
  header: {
    DesktopComponent: Logos.LogoNav,
    desktopClassName:
      'hidden w-174 sm:block text-[#1F1F22] transition transition-color duration-500 hover:text-primary-600',
    MobileComponent: Logos.Logo,
    mobileClassName: 'block w-28 sm:hidden',
  },
} as const;

export default function Logo({ variant = 'header' }: LogoProps) {
  const { DesktopComponent, desktopClassName, MobileComponent, mobileClassName } =
    LOGO_VARIANTS[variant];

  return (
    <h1>
      <Link href='/' title='홈으로 이동'>
        <DesktopComponent className={desktopClassName} />
        <MobileComponent className={mobileClassName} />
      </Link>
    </h1>
  );
}
