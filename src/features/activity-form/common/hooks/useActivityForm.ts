'use client';

import { useMemo, useRef } from 'react';
import { useAddressForm } from '@/features/activity-form/common/hooks/useAddressForm';
import { useBasicInfoForm } from '@/features/activity-form/common/hooks/useBasicInfoForm';
import { useImageUploadForm } from '@/features/activity-form/common/hooks/useImageUploadForm';
import { useScheduleForm } from '@/features/activity-form/common/hooks/useScheduleForm';
import { UpdateActivityFormPayload } from '@/features/activity-form/common/types/activityFormType';
import {
  getBasicFieldsDiff,
  getScheduleDiff,
  getSubImageDiff,
} from '@/features/activity-form/common/utils/activityFormUtils';
import type { ActivityCategory } from '@/shared/constants';
import type { ActivityWithSubImagesAndSchedulesDto } from '@/shared/types/activities';

/** 가본 필드 */
const BASIC_FIELDS = ['title', 'category', 'description', 'price', 'address'] as const;

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
 */
export const useActivityForm = (initialData?: ActivityWithSubImagesAndSchedulesDto) => {
  const isComposingRef = useRef(false);
  const basicInfo = useBasicInfoForm(initialData);
  const addressInfo = useAddressForm(initialData);
  const imageInfo = useImageUploadForm(initialData);
  const scheduleInfo = useScheduleForm(initialData?.schedules);

  /** 폼이 유효한지 검증 */
  const isAllValid =
    basicInfo.isBasicFormValid
    && addressInfo.isAddressValid
    && imageInfo.isImageValid
    && scheduleInfo.isScheduleValid;

  /** 사용자가 현재 입력한 값을 서버 타입에 맞게 변경 */
  const currentFormData = useMemo(
    () => ({
      title: basicInfo.formData.title,
      category: basicInfo.formData.category as ActivityCategory,
      description: basicInfo.formData.description,
      price: Number(basicInfo.formData.price),
      address: addressInfo.getFullAddressForSubmit(),
      schedules: scheduleInfo.scheduleDates,
      bannerImageUrl: imageInfo.bannerImage instanceof File ? imageInfo.bannerImage : null,
      subImageUrls: imageInfo.introImages as File[],
    }),
    [
      basicInfo.formData.title,
      basicInfo.formData.category,
      basicInfo.formData.description,
      basicInfo.formData.price,
      addressInfo,
      scheduleInfo.scheduleDates,
      imageInfo.bannerImage,
      imageInfo.introImages,
    ]
  );

  /** 사용자가 입력한 값이 기존과 달라진게 있는지 검증 */
  const changedValues = useMemo(() => {
    if (!initialData) {
      return {
        ...currentFormData,
        bannerImageUrl: currentFormData.bannerImageUrl ?? undefined,
        subImageUrlsToAdd: currentFormData.subImageUrls,
      };
    }

    const reqbody = currentFormData;

    // 기본 필드 바뀐거 있는지 검증
    const basicDiff = getBasicFieldsDiff(BASIC_FIELDS, reqbody, initialData);

    // 소개 이미지 검증
    const { subImageIdsToRemove, subImageUrlsToAdd } = getSubImageDiff(
      reqbody.subImageUrls,
      initialData.subImages
    );

    // 스케줄 검증
    const { scheduleIdsToRemove, schedulesToAdd } = getScheduleDiff(
      reqbody.schedules,
      initialData.schedules
    );

    const changedValues: UpdateActivityFormPayload = {
      ...basicDiff,
    };

    // 배너 이미지 검증 및 추가
    if (reqbody.bannerImageUrl instanceof File) {
      changedValues.bannerImageUrl = reqbody.bannerImageUrl;
    }

    if (subImageIdsToRemove.length > 0) {
      changedValues.subImageIdsToRemove = subImageIdsToRemove;
    }
    if (subImageUrlsToAdd.length > 0) {
      changedValues.subImageUrlsToAdd = subImageUrlsToAdd;
    }

    if (scheduleIdsToRemove.length > 0) {
      changedValues.scheduleIdsToRemove = scheduleIdsToRemove;
    }
    if (schedulesToAdd.length > 0) {
      changedValues.schedulesToAdd = schedulesToAdd;
    }

    return changedValues;
  }, [initialData, currentFormData]);

  /** 등록 폼에 변경사항이 있는지 확인 */
  const isCreateDirty = useMemo(() => {
    const d = currentFormData;
    return (
      !!d.title
      || !!d.category
      || !!d.description
      || d.price > 0
      || !!d.address
      || d.schedules.length > 0
      || !!d.bannerImageUrl
      || d.subImageUrls.length > 0
    );
  }, [currentFormData]);

  /** 수정 폼에 변경사항이 있는지 확인 */
  const isEditDirty = Object.keys(changedValues).length > 0;

  const isDirty = isComposingRef.current || (initialData ? isEditDirty : isCreateDirty);

  return {
    isComposingRef,
    basicInfo,
    addressInfo,
    imageInfo,
    scheduleInfo,
    currentFormData,
    changedValues,
    isAllValid,
    isDirty,
  };
};
