import { KeyboardEvent, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface ImageActionSlotProps {
  /** 스크린리더를 위한 버튼 접근성 라벨 */
  ariaLabel: string;
  /** 슬롯 내부에 렌더링될 콘텐츠 */
  children: ReactNode;
  /** 추가로 적용할 클래스 이름 */
  className?: string;
  /** 슬롯 클릭 시 실행될 핸들러 */
  onClick: () => void;
}

/**
 * ## ImageActionSlot
 *
 * @description
 * - 이미지 업로드/변경을 위한 클릭 가능한 슬롯 컴포넌트입니다.
 * - 내부에 이미지 프리뷰 또는 업로드 아이콘 등의 콘텐츠를 렌더링합니다.
 */
export default function ImageActionSlot({
  ariaLabel,
  children,
  className,
  onClick,
}: ImageActionSlotProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative flex h-full w-full cursor-pointer items-center justify-center',
        className
      )}>
      {children}
    </div>
  );
}
