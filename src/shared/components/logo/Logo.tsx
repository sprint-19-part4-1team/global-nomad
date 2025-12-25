import Link from 'next/link';
import Logos from '@/assets/logo';

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
 * <Logo variant="login" />
 * <Logo variant="header" />
 * ```
 */

interface LogoProps {
  variant?: 'login' | 'header';
}

export default function Logo({ variant = 'header' }: LogoProps) {
  if (variant === 'login') {
    return (
      <>
        <Link href='/' title='홈으로 이동'>
          <Logos.LogoLogin className='hidden w-255 md:block' />
          <Logos.Logo className='block w-144 md:hidden' />
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href='/' title='홈으로 이동'>
        <Logos.LogoNav className='hidden w-174 md:block' />
        <Logos.Logo className='block w-28 md:hidden' />
      </Link>
    </>
  );
}
