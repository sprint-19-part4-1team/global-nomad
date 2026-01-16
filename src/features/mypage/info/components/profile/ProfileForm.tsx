'use client';

import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import ProfileImageSection from '@/features/mypage/info/components/profile/ProfileImageSection';
import ProfileInfoSection from '@/features/mypage/info/components/profile/ProfileInfoSection';
import ProfileFormSkeleton from '@/features/mypage/info/components/skeleton/ProfileFormSkeleton';
import { useProfileForm } from '@/features/mypage/info/hooks/useProfileForm';
import {
  useCreateProfileImageUrlMutation,
  useUpdateMyInfoMutation,
} from '@/features/mypage/info/mutations/useProfileMutations';
import { useMyInfoQuery } from '@/features/mypage/info/queries/useMyInfoQuery';
import Button from '@/shared/components/button/Button';
import { UserServiceResponseDto } from '@/shared/types/user';

interface ProfileFormInnerProps {
  user: UserServiceResponseDto;
}

/**
 * ## ProfileFormInner
 *
 * @description
 * - 마이페이지 > 내 정보 수정 화면에서 사용하는 프로필 수정 폼의 내부 컴포넌트입니다.
 * - `ProfileForm` 내부에서만 사용되며, 외부로 export되지 않습니다.
 * - 프로필 수정에 필요한 상태 및 로직은 `useProfileForm` 훅에 위임합니다.
 *
 * @param user
 * - 현재 로그인한 사용자 정보
 */
function ProfileFormInner({ user }: ProfileFormInnerProps) {
  const {
    nickname,
    nicknameError,
    imageState,
    previewImage,
    handleImageSelect,
    handleImageReset,
    canSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useProfileForm(user);

  const { mutateAsync: createMutateAsync, isPending: createIsPending } =
    useCreateProfileImageUrlMutation();
  const { mutateAsync: updateMutateAsync, isPending: updateIsPending } = useUpdateMyInfoMutation();
  const isLoading = createIsPending || updateIsPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let profileImageUrl: string | null | undefined;

      if (imageState.type === 'upload') {
        const res = await createMutateAsync(imageState.file);
        profileImageUrl = res.profileImageUrl;
      }

      if (imageState.type === 'remove') {
        profileImageUrl = null;
      }

      await updateMutateAsync({
        nickname,
        profileImageUrl,
      });

      resetForm({
        ...user,
        nickname,
        profileImageUrl:
          imageState.type === 'remove' ? null : (profileImageUrl ?? user.profileImageUrl),
      });

      toast.success('정보 수정이 완료되었습니다!');
    } catch (error) {
      console.error('정보 수정 실패: ', error);
      toast.error('정보 수정에 실패했습니다');
    }
  };

  return (
    <form className='mt-24 sm:mt-32' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-24 sm:gap-32 md:flex-row'>
        <ProfileImageSection
          previewImage={previewImage}
          user={user}
          onSelect={handleImageSelect}
          onReset={handleImageReset}
          imageState={imageState}
        />
        <ProfileInfoSection
          user={user}
          nickname={nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={nicknameError}
        />
      </div>
      <Button
        type='submit'
        className='mx-auto mt-24 w-160'
        isLoading={isLoading}
        disabled={!canSubmit}>
        수정하기
      </Button>
    </form>
  );
}

/**
 * ## ProfileForm
 *
 * @description
 * - 마이페이지 > 내 정보 수정 화면에서 사용하는 프로필 수정 폼의 엔트리 컴포넌트입니다.
 * - 사용자 정보를 조회하고, 로딩 상태에 따라 스켈레톤 또는 실제 폼을 렌더링합니다.
 */
export default function ProfileForm() {
  const { data: user, isPending } = useMyInfoQuery();

  if (isPending || !user) {
    return <ProfileFormSkeleton />;
  }

  return <ProfileFormInner user={user} />;
}
