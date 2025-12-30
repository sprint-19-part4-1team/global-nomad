import HeaderActions from '@/shared/components/header/HeaderAction';
import Logo from '@/shared/components/logo/Logo';
import { User } from '@/shared/types/user.type';

interface HeaderProps {
  user?: User;
  isLoggedIn?: boolean;
}

/**
 * 전역 헤더 컴포넌트
 *
 * 로고를 항상 노출하며,
 * 로그인 상태에 따라 사용자 액션 영역을 다르게 렌더링합니다.
 *
 * - 로그인 상태: 알림 영역 + 아바타 + 닉네임
 * - 비로그인 상태: 로그인 / 회원가입 링크
 *
 * fixed 포지션으로 상단에 고정되어 있으며,
 * 전체 레이아웃의 네비게이션 진입점 역할을 합니다.
 *
 * @param props - Header 컴포넌트 props
 * @param props.user - 로그인한 사용자 정보 (로그인 상태일 때만 전달)
 * @param props.isLoggedIn - 로그인 여부 (기본값: false)
 *
 * @example
 * ```tsx
 *
 * <Header />
 *
 * <Header
 *   isLoggedIn
 *   user={user}
 * />
 * ```
 */

export default function Header({ user, isLoggedIn = false }: HeaderProps) {
  return (
    <header className='w-full'>
      <div className='mx-auto flex h-48 w-full max-w-1520 items-center justify-between px-24 py-4 sm:h-80 sm:px-10 sm:py-16'>
        <Logo />
        <HeaderActions isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}
