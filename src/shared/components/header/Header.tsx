import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import Logo from '@/shared/components/logo/Logo';
import { User } from '@/shared/types/user';

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
 * @param props.nickname - 헤더에 표시할 사용자 닉네임
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
 *   nickname={user.nickname}
 * />
 * ```
 */

export default function Header({
  user,
  nickname,
  isLoggedIn = false,
}: {
  user?: User;
  nickname?: string;
  isLoggedIn?: boolean;
}) {
  return (
    <>
      <header className='fixed top-0 z-5 mx-auto flex h-48 w-full max-w-1520 items-center justify-between px-24 py-4 sm:h-80 sm:px-10 sm:py-16'>
        <Logo />
        {isLoggedIn && user ? (
          <div className='flex items-center'>
            <div className='w-24px relative pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
              알림
            </div>
            <Link href={'/mypage/info'} className='ml-20 flex items-center'>
              <Avatar user={user}>
                <AvatarImage />
                <AvatarFallback />
              </Avatar>
              <span className='trainstion transition-color ml-10 body-14 font-medium text-gray-950 duration-500 hover:text-primary-600'>
                {nickname}
              </span>
            </Link>
          </div>
        ) : (
          <div className='flex'>
            <Link
              href='/login'
              title='로그인으로 이동'
              className='w-60px trainstion transition-color block py-11 body-14 font-medium text-gray-950 duration-500 hover:text-primary-600 md:py-12'>
              로그인
            </Link>
            <Link
              href='/signup'
              title='회원가입으로 이동'
              className='w-60px trainstion transition-color ml-12 block py-11 body-14 font-medium text-gray-950 duration-500 hover:text-primary-600 md:py-12'>
              회원가입
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
