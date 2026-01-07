import { ReactNode } from 'react';

interface ImageItemProps {
  /** 이미지 또는 업로드 버튼 등 내부에 렌더링될 콘텐츠 */
  children: ReactNode;
}

/**
 * ## ImageItem
 *
 * @description
 * - 이미지 프리뷰 및 업로드 버튼을 감싸는 레이아웃 컴포넌트입니다.
 */
export default function ImageItem({ children }: ImageItemProps) {
  return (
    <div className='aspect-square w-full rounded-16 border border-gray-100 sm:h-128 sm:w-128'>
      {children}
    </div>
  );
}
