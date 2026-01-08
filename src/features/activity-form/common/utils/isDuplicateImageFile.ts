import { ImageValue } from '@/features/activity-form/common/types/image';
import { isSameFile } from '@/shared/utils/fileUpload';

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
export const isDuplicateImageFile = (currentValue: ImageValue, newFile: File): boolean => {
  if (!currentValue) {
    return false;
  }

  if (Array.isArray(currentValue)) {
    return currentValue.some((file) => file instanceof File && isSameFile(file, newFile));
  }

  return currentValue instanceof File && isSameFile(currentValue, newFile);
};
