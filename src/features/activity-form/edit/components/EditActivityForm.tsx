'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ActivityForm from '@/features/activity-form/common/components/activity-form/ActivityForm';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import { usePreventNavigation } from '@/features/activity-form/common/hooks/usePreventNavigation';
import { useUpdateActivityMutation } from '@/features/activity-form/edit/mutations/useUpdateActivityMutation';
import { useActivityDetailQuery } from '@/features/activity-form/edit/queries/useActivityDetailQuery';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

interface EditActivityFormProps {
  /** 수정할 체험(Activity)의 ID */
  activityId: number;
}

/**
 * ## EditActivityForm
 *
 * @description
 * - 체험(Activity) 수정 페이지에서 사용하는 폼 컨테이너 컴포넌트입니다.
 * - 체험 상세 데이터를 조회하여 `useActivityForm`의 초기값으로 전달하고,
 *   수정된 항목만 추출하여 수정 API를 호출합니다.
 */
export default function EditActivityForm({ activityId }: EditActivityFormProps) {
  const router = useRouter();

  const { data: activity } = useActivityDetailQuery(activityId);

  const formState = useActivityForm(activity);
  const { changedValues, isDirty, isAllValid } = formState;

  usePreventNavigation(isDirty);

  const { mutate, isPending } = useUpdateActivityMutation(activityId);

  const handleSubmit = () => {
    const payload = changedValues;

    mutate(payload, {
      onSuccess: () => {
        overlayStore.push(
          <Dialog
            variant='alert'
            message='체험 수정이 완료되었습니다.'
            onClose={() => {
              overlayStore.pop();
              router.push(`/activity/${activityId}`);
              router.refresh();
            }}
          />
        );
      },
      onError: (error) => {
        console.error('체험 수정 실패:', error);
        const serverErrorMessage = error.message;
        toast.error(serverErrorMessage ?? '수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      },
    });
  };

  return (
    <ActivityForm
      formState={formState}
      submitButtonText='체험 수정하기'
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      isDisabled={!isDirty || !isAllValid}
    />
  );
}
