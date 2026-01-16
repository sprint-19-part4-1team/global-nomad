import { useMutation } from '@tanstack/react-query';
import { useUploadImageMutation } from '@/features/activity-form/common/mutations/useUploadImageMutation';
import { UpdateActivityFormPayload } from '@/features/activity-form/common/types/activityFormType';
import { updateMyActivity } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { UpdateMyActivityBodyDto } from '@/shared/types/myActivities';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export const useUpdateActivityMutation = (activityId: number) => {
  const queryClient = getQueryClient();
  const { mutateAsync: uploadImage } = useUploadImageMutation();

  return useMutation({
    mutationFn: async (payload: UpdateActivityFormPayload) => {
      const bannerImageUrl = payload.bannerImageUrl
        ? await uploadImage(payload.bannerImageUrl)
        : undefined;

      const subImageUrlsToAdd = payload.subImageUrlsToAdd
        ? await Promise.all(payload.subImageUrlsToAdd.map((file) => uploadImage(file)))
        : undefined;

      const updateData: UpdateMyActivityBodyDto = {
        ...payload,
        bannerImageUrl,
        subImageUrlsToAdd,
      };

      return updateMyActivity(activityId, updateData);
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['activities'],
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.ACTIVITY_DETAIL(data.id),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.MY_ACTIVITIES(),
          exact: false,
        }),
      ]);
    },
  });
};
