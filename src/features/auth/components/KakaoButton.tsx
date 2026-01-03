import Icons from '@/assets/icons';

export default function KakaoButton() {
  return (
    <button type='button' className='w-full cursor-pointer rounded-16 bg-kakao px-40 py-12'>
      <div className='flex items-center justify-center gap-8'>
        <Icons.Kakao className='h-20 w-20' />
        <span className='body-16 font-semibold text-op-85'>카카오로 시작하기</span>
      </div>
    </button>
  );
}
