'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ActivityForm from '@/features/activity-form/common/components/activity-form/ActivityForm';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import { useUpdateActivityMutation } from '@/features/activity-form/edit/mutations/useUpdateActivityMutation';
import { useActivityDetailQuery } from '@/features/activity-form/edit/queries/useActivityDetailQuery';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

interface EditActivityFormProps {
  activityId: number;
}

// TODO: 구현 완료 후 tsDoc 추가 예정
export default function EditActivityForm({ activityId }: EditActivityFormProps) {
  // TODO: 체험 수정 폼에 기존과 다른 변경사항이 있다면 이탈 안내 모달 보여주기
  const router = useRouter();

  const { data: activity } = useActivityDetailQuery(activityId);

  const formState = useActivityForm(activity);
  const { getChangedValues, isEditDirty, isAllValid } = formState;

  const { mutate, isPending } = useUpdateActivityMutation(activityId);

  const handleSubmit = () => {
    const payload = getChangedValues();

    mutate(payload, {
      onSuccess: () => {
        overlayStore.push(
          <Dialog
            variant='alert'
            message='체험 수정이 완료되었습니다.'
            onClose={() => {
              overlayStore.pop();
              router.push(`/activity/${activityId}`);
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
      isDisabled={!isEditDirty || !isAllValid}
    />
  );
}
