import { useAddressForm } from '@/features/activity-form/common/hooks/useAddressForm';
import { useBasicInfoForm } from '@/features/activity-form/common/hooks/useBasicInfoForm';
import { useImageUploadForm } from '@/features/activity-form/common/hooks/useImageUploadForm';
import { useScheduleForm } from '@/features/activity-form/common/hooks/useScheduleForm';
import type { ActivityWithSubImagesAndSchedulesDto } from '@/shared/types/activities';

/**
 * ## useActivityForm
 *
 * @description
 * - 체험(Activity) 등록/수정 폼에서 사용하는 모든 하위 폼 로직을
 *   하나로 조합한 상위 폼 훅입니다.
 * - 기본 정보, 주소, 이미지, 일정 폼 훅을 내부에서 각각 호출하여
 *   하나의 폼 상태 및 제출 payload를 제공합니다.
 *
 * @param initialData - 수정 화면에서 사용될 초기 체험 데이터
 *
 * @returns
 * - 각 하위 폼 훅에서 제공하는 상태 및 핸들러
 * - `isAllValid`: 모든 폼 섹션의 유효성 여부
 * - `getActivityRequest`: 체험 등록/수정 API에 전달할 최종 데이터 생성 함수
 */
export const useActivityForm = (initialData?: ActivityWithSubImagesAndSchedulesDto) => {
  const basicInfo = useBasicInfoForm(initialData);
  const addressInfo = useAddressForm(initialData);
  const imageInfo = useImageUploadForm(initialData);
  const scheduleInfo = useScheduleForm(initialData?.schedules);

  const isAllValid =
    basicInfo.isBasicFormValid
    && addressInfo.isAddressValid
    && imageInfo.isImageValid
    && scheduleInfo.isScheduleValid;

  const getActivityRequest = () => {
    return {
      title: basicInfo.formData.title,
      category: basicInfo.formData.category,
      description: basicInfo.formData.description,
      price: Number(basicInfo.formData.price),
      address: addressInfo.getFullAddressForSubmit(),
      schedules: scheduleInfo.scheduleDates,
      bannerImageUrl: imageInfo.bannerImage,
      subImageUrls: imageInfo.introImages,
    };
  };

  return {
    basicInfo,
    addressInfo,
    imageInfo,
    scheduleInfo,
    getActivityRequest,
    isAllValid,
  };
};
