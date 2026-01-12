import { useMutation } from '@tanstack/react-query';
import { useUploadImageMutation } from '@/features/activity-form/common/mutations/useUploadImageMutation';
import { UpdateActivityFormPayload } from '@/features/activity-form/common/types/activityFormType';
import { updateMyActivity } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { UpdateMyActivityBodyDto } from '@/shared/types/myActivities';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export const useUpdateActivityMutation = (activityId: number) => {
  const queryClient = getQueryClient();
  const userId = useUserStore((s) => s.user?.id);
  const { mutateAsync: uploadImage } = useUploadImageMutation();

  return useMutation({
    mutationFn: async (payload: UpdateActivityFormPayload) => {
      let bannerImageUrl: string | undefined = undefined;

      if (payload.bannerImageUrl instanceof File) {
        bannerImageUrl = await uploadImage(payload.bannerImageUrl);
      } else {
        bannerImageUrl = payload.bannerImageUrl;
      }

      let subImageUrlsToAdd: string[] | undefined = undefined;
      if (payload.subImageUrlsToAdd && payload.subImageUrlsToAdd.length > 0) {
        subImageUrlsToAdd = await Promise.all(
          payload.subImageUrlsToAdd.map((file) => (file instanceof File ? uploadImage(file) : file))
        );
      }
      const updateData: UpdateMyActivityBodyDto = {
        ...payload,
        bannerImageUrl,
        subImageUrlsToAdd,
      };

      return updateMyActivity(activityId, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACTIVITY_DETAIL(activityId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES({}, userId) });
    },
  });
};
