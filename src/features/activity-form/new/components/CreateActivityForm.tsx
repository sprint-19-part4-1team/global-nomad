'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ActivityForm from '@/features/activity-form/common/components/activity-form/ActivityForm';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import { useCreateActivityMutation } from '@/features/activity-form/new/mutations/useCreateActivityMutation';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

// TODO: 구현 완료 후 tsDoc 추가 예정
export default function CreateActivityForm() {
  // TODO: 체험 등록 폼에 내용이 있다면 이탈 안내 모달 보여주기
  const router = useRouter();
  const formState = useActivityForm();
  const { getActivityRequest } = formState;

  const { mutate, isPending } = useCreateActivityMutation();

  const handleSubmit = async () => {
    const reqbody = getActivityRequest();

    mutate(reqbody, {
      onSuccess: (data) => {
        overlayStore.push(
          <Dialog
            variant='alert'
            message='체험 등록이 완료되었습니다.'
            onClose={() => {
              overlayStore.pop();
              router.push(`/activity/${data.id}`);
            }}
          />
        );
      },
      onError: () => {
        toast.error('등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      },
    });
  };

  return (
    <ActivityForm
      formState={formState}
      submitButtonText='체험 등록하기'
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
