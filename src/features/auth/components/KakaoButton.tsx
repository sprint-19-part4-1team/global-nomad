import Link from 'next/link';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

type KakaoAuthMode = 'signin' | 'signup';
type KakaoButtonProps = {
  mode: KakaoAuthMode;
  className?: string;
};

const KAKAO_AUTHORIZE_PATH = '/api/oauth/kakao/authorize';
const COPY_BY_MODE: Record<
  KakaoAuthMode,
  {
    separatorText: string;
    subText: string;
    linkText: string;
    linkHref: string;
  }
> = {
  signin: {
    separatorText: 'or',
    subText: '회원이 아니신가요?',
    linkText: '회원가입하기',
    linkHref: '/signup',
  },
  signup: {
    separatorText: 'SNS 계정으로 회원가입하기',
    subText: '회원이신가요?',
    linkText: '로그인하기',
    linkHref: '/login',
  },
};

/**
 * Kakao OAuth 인가 요청을 시작하는 버튼 컴포넌트.
 *
 * @description
 * - Kakao authorize 엔드포인트로 리다이렉트한다.
 * - `mode`에 따라 하단 안내 문구와 링크가 변경된다.
 *
 * @param props KakaoButtonProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <KakaoButton mode="signin" />
 * ```
 */
export default function KakaoButton({ mode, className }: KakaoButtonProps) {
  const { separatorText, subText, linkText, linkHref } = COPY_BY_MODE[mode];
  const lineStyle = 'h-1 flex-1 bg-gray-100';

  // const handleClick = () => {
  //   window.location.href = `${KAKAO_AUTHORIZE_PATH}?mode=${mode}`;
  // };

  return (
    <div>
      <div className='flex items-center gap-14 py-20 sm:py-30'>
        <div className={lineStyle} />
        <span className='shrink-0 body-16 font-semibold text-gray-700'>{separatorText}</span>
        <div className={lineStyle} />
      </div>
      <a
        href={`${KAKAO_AUTHORIZE_PATH}?mode=${mode}`}
        className={cn(
          'no-underline, block w-full cursor-pointer rounded-16 bg-kakao px-40 py-12 text-inherit',
          className
        )}>
        <div className='flex items-center justify-center gap-8'>
          <Icons.Kakao className='h-20 w-20' />
          <span className='body-14 font-semibold text-op-85 sm:body-16'>카카오로 시작하기</span>
        </div>
      </a>
      <p className='flex items-center justify-center gap-4 pt-24 body-14 font-medium text-gray-400 select-none sm:pt-30 sm:body-16'>
        {subText}
        <Link
          href={linkHref}
          className='cursor-pointer font-semibold underline decoration-2 underline-offset-2 transition-colors hover:text-gray-800'>
          {linkText}
        </Link>
      </p>
    </div>
  );
}
