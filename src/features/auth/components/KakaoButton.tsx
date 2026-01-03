import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

type KakaoAuthMode = 'signin' | 'signup';

type KakaoButtonProps = {
  mode: KakaoAuthMode;
  label?: string;
  className?: string;
};

const KAKAO_AUTHORIZE_PATH = '/api/oauth/kakao/authorize';

export default function KakaoButton({ mode, label, className }: KakaoButtonProps) {
  const buttonLabel = label ?? (mode === 'signup' ? '카카오로 회원가입' : '카카오로 로그인');

  const handleClick = () => {
    window.location.href = `${KAKAO_AUTHORIZE_PATH}?mode=${mode}`;
  };

  return (
    <button
      type='button'
      className={cn('w-full cursor-pointer rounded-16 bg-kakao px-40 py-12', className)}
      onClick={handleClick}>
      <div className='flex items-center justify-center gap-8'>
        <Icons.Kakao className='h-20 w-20' />
        <span className='body-16 font-semibold text-op-85'>{buttonLabel}</span>
      </div>
    </button>
  );
}
