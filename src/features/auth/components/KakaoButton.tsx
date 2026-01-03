import Icons from '@/assets/icons';

type KakaoAuthMode = 'signin' | 'signup';

type KakaoButtonProps = {
  mode: KakaoAuthMode;
  label?: string;
};

export default function KakaoButton({ mode, label }: KakaoButtonProps) {
  return (
    <button
      type='button'
      className='w-full cursor-pointer rounded-16 bg-kakao px-40 py-12'
      onClick={() => {
        window.location.href = `/api/oauth/kakao/authorize?mode=${mode}`;
      }}>
      <div className='flex items-center justify-center gap-8'>
        <Icons.Kakao className='h-20 w-20' />
        <span className='body-16 font-semibold text-op-85'>
          {label ?? (mode === 'signup' ? '카카오로 회원가입' : '카카오로 로그인')}
        </span>
      </div>
    </button>
  );
}
