import Icons from '@/assets/icons';

interface ImageUploadButtonProps {
  /** 스크린리더를 위한 버튼 접근성 라벨 */
  ariaLabel: string;
  /** 이미지 업로드 트리거 클릭 핸들러 */
  onClick: () => void;
}

/**
 * ## ImageUploadButton
 *
 * @description
 * 이미지 업로드를 트리거하기 위한 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ImageUploadButton
 *   ariaLabel="배너 이미지 등록"
 *   onClick={handleClick}
 * />
 * ```
 */
export default function ImageUploadButton({ ariaLabel, onClick }: ImageUploadButtonProps) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      className='flex h-full w-full cursor-pointer items-center justify-center'
      onClick={onClick}>
      <Icons.Plus className='h-40 w-40 text-gray-400' />
    </button>
  );
}
