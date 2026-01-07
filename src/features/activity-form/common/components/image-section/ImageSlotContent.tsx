import Icons from '@/assets/icons';
import ImagePreview from '@/shared/components/image-preview/ImagePreview';

interface ImageSlotContentProps {
  /** 표시할 이미지 값 (파일 또는 이미지 URL) */
  value: File | string | null;
  /** 이미지 삭제 버튼 클릭 시 호출되는 콜백 */
  onRemove?: () => void;
  /** Next.js Image sizes 속성 값 */
  sizes?: string;
}

/**
 * ## ImageSlotContent
 *
 * @description
 * - 이미지 업로드 슬롯 내부에 표시될 콘텐츠를 렌더링하는 컴포넌트입니다.
 * - 이미지가 존재하면 `ImagePreview`를 렌더링합니다.
 * - 이미지가 없는 경우 업로드를 나타내는 `+` 아이콘을 렌더링합니다.
 */
export default function ImageSlotContent({ value, onRemove, sizes }: ImageSlotContentProps) {
  if (!value) {
    return <Icons.Plus aria-hidden className='h-40 w-40 text-gray-400' />;
  }

  return (
    <ImagePreview
      className='rounded-16'
      src={typeof value === 'string' ? value : null}
      file={value instanceof File ? value : null}
      onRemove={onRemove}
      sizes={sizes}
    />
  );
}
