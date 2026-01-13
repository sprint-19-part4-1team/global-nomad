import { useMutation } from '@tanstack/react-query';
import { useUploadImageMutation } from '@/features/activity-form/common/mutations/useUploadImageMutation';
import { CreateActivityFormPayload } from '@/features/activity-form/common/types/activityFormType';
import { createActivity } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants';
import { getQueryClient } from '@/shared/utils/getQueryClient';

/**
 * ## useCreateActivityMutation
 *
 * @description
 * - 체험(Activity) 등록을 위한 mutation 훅입니다.
 * - 폼에서 전달받은 요청 데이터를 기반으로 이미지 업로드를 선행한 뒤,
 *   업로드된 이미지 URL을 포함하여 체험 생성 API를 호출합니다.
 * - 체험 생성 성공 시, 체험 상세, 체험 리스트 캐시를 무효화 합니다.
 *
 * @returns
 * - `mutate(reqBody)` / `mutateAsync(reqBody)` 형태의 mutation 함수
 * - 성공 시 생성된 체험(Activity) 데이터 반환
 */
export const useCreateActivityMutation = () => {
  const queryClient = getQueryClient();
  const { mutateAsync: uploadImage } = useUploadImageMutation();

  return useMutation({
    mutationFn: async (reqbody: CreateActivityFormPayload) => {
      const { bannerImageUrl: bannerFile, subImageUrls: subImageFiles } = reqbody;

      if (!(bannerFile instanceof File)) {
        throw new Error('유효하지 않은 배너 이미지 파일입니다.');
      }
      const bannerPromise = uploadImage(bannerFile);

      const subImagesPromises = subImageFiles.map((file) => {
        if (!(file instanceof File)) {
          throw new Error('유효하지 않은 소개 이미지 파일입니다.');
        }
        return uploadImage(file);
      });

      const [bannerImageUrl, ...subImageUrls] = await Promise.all([
        bannerPromise,
        ...subImagesPromises,
      ]);

      const finalData = {
        ...reqbody,
        bannerImageUrl,
        subImageUrls,
      };

      return createActivity(finalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITIES({ method: 'offset' }),
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_ACTIVITIES(),
        exact: false,
      });
    },
  });
};
