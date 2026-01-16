'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ActivityForm from '@/features/activity-form/common/components/activity-form/ActivityForm';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import { usePreventNavigation } from '@/features/activity-form/common/hooks/usePreventNavigation';
import { useCreateActivityMutation } from '@/features/activity-form/new/mutations/useCreateActivityMutation';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * ## CreateActivityForm
 *
 * @description
 * - 체험(Activity) 등록 페이지에서 사용하는 폼 컨테이너 컴포넌트입니다.
 * - `useActivityForm` 훅을 사용하여 체험 등록에 필요한 폼 상태를 관리하고,
 *   입력된 데이터를 기반으로 체험 생성 API를 호출합니다.
 */
export default function CreateActivityForm() {
  const router = useRouter();
  const formState = useActivityForm();
  const { currentFormData, isAllValid, isDirty } = formState;

  usePreventNavigation(isDirty);

  const { mutate, isPending } = useCreateActivityMutation();

  const handleSubmit = () => {
    const reqbody = currentFormData;

    mutate(reqbody, {
      onSuccess: (data) => {
        overlayStore.push(
          <Dialog
            variant='alert'
            message='체험 등록이 완료되었습니다.'
            onClose={() => {
              router.push(`/activity/${data.id}`);
              overlayStore.pop();
            }}
          />
        );
      },
      onError: (error) => {
        console.error('체험 등록 실패:', error);
        const serverErrorMessage = error.message;
        toast.error(serverErrorMessage ?? '등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      },
    });
  };

  return (
    <ActivityForm
      formState={formState}
      submitButtonText='체험 등록하기'
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      isDisabled={!isAllValid}
    />
  );
}
