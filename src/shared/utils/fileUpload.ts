import { toast } from 'react-toastify';
import { value } from '@/features/activity-form/common/components/image-section/ImageUploadField';
import { ALLOWED_IMAGE_TYPES } from '@/shared/constants';

/**
 * byte 단위 파일 크기를 MB 단위 정수로 변환합니다.
 *
 * @param bytes - 변환할 파일 크기 (byte)
 * @returns MB 단위 파일 크기 (정수)
 */
const formatFileSizeMB = (bytes: number): number => {
  return Math.floor(bytes / (1024 * 1024));
};

/**
 * ## validateImageFile
 *
 * @description
 * - 이미지 파일 업로드 전에 파일 유효성을 검사합니다.
 * - 파일 크기 제한과 MIME 타입 제한을 확인합니다.
 * - 유효하지 않은 경우 사용자에게 toast 메시지를 표시합니다.
 *
 * @param file - 업로드하려는 이미지 파일
 * @param maxSize - 허용 가능한 최대 파일 크기 (byte)
 */
export const validateImageFile = (file: File, maxSize: number): boolean => {
  if (file.size > maxSize) {
    const maxSizeMB = formatFileSizeMB(maxSize);

    toast.error(`이미지 파일은 ${maxSizeMB}MB 이하만 업로드할 수 있어요.`);
    return false;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    toast.error('jpg, png, webp 형식만 업로드할 수 있어요.');
    return false;
  }

  return true;
};

/**
 * ## isSameFile
 *
 * @description
 * - 두 개의 `File` 객체가 동일한 파일인지 비교합니다.
 * - 파일명, 파일 크기, MIME 타입, 마지막 수정 시간을 기준으로 판단합니다.
 * - 클라이언트 환경에서 중복 파일 업로드를 방지하기 위한 용도로 사용합니다.
 *
 * @param a - 비교할 첫 번째 파일
 * @param b - 비교할 두 번째 파일
 */
export const isSameFile = (a: File, b: File): boolean => {
  return (
    a.name === b.name && a.size === b.size && a.type === b.type && a.lastModified === b.lastModified
  );
};

/**
 * ## isDuplicateImageFile
 *
 * @description
 * - 현재 선택된 이미지(`currentValue`)와 새로 추가하려는 이미지(`newFile`)가
 *   동일한 파일인지 여부를 판단합니다.
 * - 단일 이미지(`File`)와 다중 이미지(`File[]`) 케이스를 모두 지원합니다.
 * - 내부적으로 {@link isSameFile}을 사용하여 파일명, 크기, MIME 타입, 마지막 수정 시간을 기준으로 비교합니다.
 * - 클라이언트 환경에서 중복 이미지 업로드를 방지하기 위한 유틸 함수입니다.
 *
 * @param currentValue - 현재 선택된 이미지 값
 *   - 단일 이미지: `File`
 *   - 다중 이미지: `File[]`
 *   - 초기 상태 또는 값 없음: `null | undefined`
 * @param newFile - 새로 추가하려는 이미지 파일
 */
export const isDuplicateImageFile = (currentValue: value, newFile: File): boolean => {
  if (!currentValue) {
    return false;
  }

  if (Array.isArray(currentValue)) {
    return currentValue.some((file) => file instanceof File && isSameFile(file, newFile));
  }

  return currentValue instanceof File && isSameFile(currentValue, newFile);
};
