import ImageUploadField from '@/features/activity-form/common/components/image-section/ImageUploadField';
import { useImageUploadForm } from '@/features/activity-form/common/hooks/useImageUploadForm';

interface ImageSectionProps {
  /**
   * useImageUploadForm의 리턴 타입
   *
   * - bannerImage: 배너 이미지 파일 또는 URL
   * - introImages: 소개 이미지 파일 또는 URL 배열
   * - handleBannerChange: 배너 이미지 변경 핸들러
   * - handleBannerRemove: 배너 이미지 삭제 핸들러
   * - handleIntroImagesChange: 소개 이미지 변경 핸들러
   * - handleIntroImageRemove: 소개 이미지 개별 삭제 핸들러
   */
  imageInfo: ReturnType<typeof useImageUploadForm>;
}

/**
 * ## ImageSection
 *
 * @description
 * - 체험(Activity) 생성/수정 폼에서 이미지 업로드 영역을 담당하는 섹션 컴포넌트입니다.
 * - 배너 이미지(1장)와 소개 이미지(최대 4장)를 업로드할 수 있습니다.
 * - 이미지 상태 관리는 `useImageUploadForm` 훅에서 처리합니다.
 */
export default function ImageSection({ imageInfo }: ImageSectionProps) {
  const {
    bannerImage,
    handleBannerChange,
    handleBannerRemove,
    introImages,
    handleIntroImagesChange,
    handleIntroImageRemove,
  } = imageInfo;

  return (
    <>
      <ImageUploadField
        id='banner-image'
        label='배너 이미지'
        maxCount={1}
        value={bannerImage}
        onChange={handleBannerChange}
        onRemove={handleBannerRemove}
      />
      <ImageUploadField
        id='intro-image'
        label='소개 이미지'
        maxCount={4}
        helperText='* 최소 1장 등록'
        value={introImages}
        onChange={handleIntroImagesChange}
        onRemove={handleIntroImageRemove}
      />
    </>
  );
}
