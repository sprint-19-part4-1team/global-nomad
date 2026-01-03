'use client';

import Icons from '@/assets/icons';

/**
 * ## AuthBackButton
 *
 * @description
 * - 약관 페이지에서 사용되는 뒤로가기 버튼입니다.
 * - 새 창으로 열린 약관 페이지를 닫는 역할을 합니다.
 */
export default function AuthBackButton() {
  const handleBack = () => {
    window.close();
  };

  return (
    <button
      title='약관 페이지 닫기'
      className='flex w-fit cursor-pointer items-center gap-4 body-14 font-semibold text-gray-600 transition-colors duration-500 hover:text-gray-950'
      onClick={handleBack}>
      <Icons.ArrowLeft width={20} height={20} />
      회원가입으로 돌아가기
    </button>
  );
}
