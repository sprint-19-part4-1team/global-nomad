import { Metadata } from 'next';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';

const ERROR_FAVICON_PATH = '/favicons/error.svg';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  icons: {
    icon: ERROR_FAVICON_PATH,
  },
};

/**
 * @description
 * - 존재하지 않는 경로에 접근했을 때 표시되는 404 페이지입니다.
 * - 메인 페이지로 이동할 수 있는 링크를 제공.
 */
export default function NotFound() {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <Icons.SadEarth className='h-300 w-300' aria-hidden='true' />
        <div className='flex flex-col items-center justify-center gap-20'>
          <span className='heading-20 font-medium'>404 | 페이지를 찾을 수 없습니다.</span>
          <Button href={'/'}>홈으로 이동</Button>
        </div>
      </div>
    </>
  );
}
