import Link from 'next/link';

export default function GuestActions() {
  return (
    <div className='flex'>
      <Link
        href='/login'
        title='로그인으로 이동'
        className='transition-color block w-60 py-11 body-14 font-medium text-gray-950 transition duration-500 hover:text-primary-600 md:py-12'>
        로그인
      </Link>
      <Link
        href='/signup'
        title='회원가입으로 이동'
        className='transition-color ml-12 block w-60 py-11 body-14 font-medium text-gray-950 transition duration-500 hover:text-primary-600 md:py-12'>
        회원가입
      </Link>
    </div>
  );
}
