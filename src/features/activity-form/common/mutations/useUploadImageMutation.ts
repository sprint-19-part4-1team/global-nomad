import { useMutation } from '@tanstack/react-query';
import { createActivityImage } from '@/shared/apis/feature/activities';

/**
 * ## useUploadImageMutation
 *
 * @description
 * - 체험(Activity) 등록/수정 과정에서 이미지 파일을 서버로 업로드하고,
 *   업로드된 이미지의 URL을 반환하는 mutation 훅입니다.
 * - 배너 이미지 및 소개 이미지 업로드 시 공통으로 사용됩니다.
 *
 * @returns
 * - `mutate(image: File)` 형태의 mutation 함수
 * - 성공 시 업로드된 이미지의 URL(`string`)을 반환합니다.
 */
export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (image: File) => {
      const res = await createActivityImage(image);
      return res.activityImageUrl;
    },
  });
};
