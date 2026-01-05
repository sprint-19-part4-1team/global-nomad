import Icons from '@/assets/icons';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Icons.SadEarth className='h-500 w-500' />
      <span className='heading-20 font-medium'>404 | 페이지를 찾을 수 없습니다.</span>
    </div>
  );
}
