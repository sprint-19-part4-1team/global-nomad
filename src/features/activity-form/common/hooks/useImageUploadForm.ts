'use client';

import { useState } from 'react';
import { ImageValue } from '@/features/activity-form/common/types/image';
import { SubImagesType } from '@/shared/types/activities';

interface ImageInitialData {
  bannerImageUrl?: string;
  subImages?: SubImagesType[];
}

/**
 * ## useImageUploadForm
 *
 * @description
 * 체험(Activity) 이미지 업로드 폼의 상태를 관리하는 커스텀 훅입니다.
 *
 * - 대표 이미지(bannerImage)와 소개 이미지(introImages)를 분리하여 관리합니다.
 * - 이미지 추가 / 제거 로직을 각각의 핸들러로 제공합니다.
 * - 이미지 업로드 최소 조건 충족 여부를 계산합니다.
 *
 * @param initialData - 수정 시 사용할 기존 이미지 데이터 (배너 URL, 소개 이미지 URL 배열)
 *
 * @returns
 * - `bannerImage` : 대표 이미지 파일
 * - `introImages` : 소개 이미지 목록
 * - `handleBannerChange` : 대표 이미지 변경 핸들러
 * - `handleBannerRemove` : 대표 이미지 제거 핸들러
 * - `handleIntroImagesChange` : 소개 이미지 목록 변경 핸들러
 * - `handleIntroImageRemove` : 특정 소개 이미지 제거 핸들러
 * - `isImageValid` : 이미지 업로드 최소 조건 충족 여부
 */
export const useImageUploadForm = (initialData?: ImageInitialData) => {
  const [bannerImage, setBannerImage] = useState<File | string | null>(
    initialData?.bannerImageUrl ?? null
  );
  const [introImages, setIntroImages] = useState<(File | string)[]>(
    () => initialData?.subImages?.map((img) => img.imageUrl) ?? []
  );

  const handleBannerChange = (value: ImageValue) => {
    if (value instanceof File || value === null) {
      setBannerImage(value);
    }
  };

  const handleBannerRemove = () => {
    setBannerImage(null);
  };

  const handleIntroImagesChange = (value: ImageValue) => {
    if (Array.isArray(value)) {
      setIntroImages(value);
    }
  };

  const handleIntroImageRemove = (index?: number) => {
    if (index === undefined) {
      return;
    }
    setIntroImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isImageValid = bannerImage !== null && introImages.length >= 1;

  return {
    bannerImage,
    introImages,
    handleBannerChange,
    handleBannerRemove,
    handleIntroImagesChange,
    handleIntroImageRemove,
    isImageValid,
  };
};
