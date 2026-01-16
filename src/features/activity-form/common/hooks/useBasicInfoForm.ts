'use client';

import { useState } from 'react';
import type { BasicInfo } from '@/features/activity-form/common/types/activityFormType';
import { VALIDATION_MESSAGES } from '@/shared/constants';
import type { BasicInfoDataServer } from '@/shared/types/activities';
import {
  isRequired,
  validateMaxPrice,
  validateMaxTitle,
  validateMinPrice,
} from '@/shared/utils/validators';

type FormErrors = Partial<Record<keyof BasicInfo, string>>;

/**
 * ## useBasicInfoForm
 *
 * @description
 * - 체험(Activity) 기본 정보 입력 폼의 상태와 유효성 검사를 관리하는 커스텀 훅입니다.
 * - 제목, 카테고리, 가격, 설명 필드의 값을 관리합니다.
 * - 필드 단위 유효성 검사(`validateField`)를 제공합니다.
 * - 수정 페이지의 경우 `initialData`를 통해 초기값을 설정할 수 있습니다.
 *
 * @param initialData - 체험 수정 시 사용할 초기 데이터
 *
 * @returns
 * - `formData` : 기본 정보 폼 상태
 * - `updateFormData` : 특정 필드 값 변경 함수
 * - `validateField` : 특정 필드 유효성 검사 함수
 * - `isValid` : 모든 필드가 유효한지 여부
 * - `errors` : 필드별 에러 메시지 객체
 */
export const useBasicInfoForm = (initialData?: BasicInfoDataServer) => {
  const [formData, setFormData] = useState<BasicInfo>({
    title: initialData?.title ?? '',
    category: initialData?.category ?? '',
    price: initialData?.price?.toString() ?? '',
    description: initialData?.description ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = (field: keyof BasicInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  /** 빈 값 검증 유효성 검사 */
  const validateField = (field: keyof BasicInfo) => {
    let error = '';

    switch (field) {
      case 'title':
        error =
          isRequired(formData.title, VALIDATION_MESSAGES.TITLE.REQUIRED)
          || validateMaxTitle(formData.title);
        break;

      case 'category':
        error = isRequired(formData.category, VALIDATION_MESSAGES.CATEGORY.REQUIRED);
        break;

      case 'price':
        error =
          isRequired(formData.price, VALIDATION_MESSAGES.PRICE.REQUIRED)
          || validateMinPrice(formData.price)
          || validateMaxPrice(formData.price);
        break;

      case 'description':
        error = isRequired(formData.description, VALIDATION_MESSAGES.DESCRIPTION.REQUIRED);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error || '',
    }));

    return !error;
  };

  const isBasicFormValid =
    Object.values(formData).every((v) => v.trim() !== '') && Object.values(errors).every((e) => !e);

  return {
    formData,
    updateFormData,
    isBasicFormValid,
    validateBasicFormField: validateField,
    basicFormErrors: errors,
  };
};
