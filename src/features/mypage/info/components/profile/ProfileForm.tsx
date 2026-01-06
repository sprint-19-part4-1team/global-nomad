'use client';

import { FormEvent } from 'react';
import ProfileImageSection from '@/features/mypage/info/components/profile/ProfileImageSection';
import ProfileInfoSection from '@/features/mypage/info/components/profile/ProfileInfoSection';
import ProfileFormSkeleton from '@/features/mypage/info/components/skeleton/ProfileFormSkeleton';
import { useProfileForm } from '@/features/mypage/info/hooks/useProfileForm';
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
    profileImg,
    setProfileImg,
    canSubmit,
    handleChange,
    handleBlur,
  } = useProfileForm(user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 수정, 프로필 이미지 API 연결하기 (mutation 사용)
    console.log('nickname: ', nickname, 'profileImg: ', profileImg);
    console.log('폼 제출');
  };

  return (
    <form className='mt-24 sm:mt-32' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-24 sm:gap-32 md:flex-row'>
        <ProfileImageSection user={user} profileImg={profileImg} setProfileImg={setProfileImg} />
        <ProfileInfoSection
          user={user}
          nickname={nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={nicknameError}
        />
      </div>
      <Button type='submit' className='mx-auto mt-24 w-160' disabled={!canSubmit}>
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

  return <ProfileFormInner key={user.id} user={user} />;
}
