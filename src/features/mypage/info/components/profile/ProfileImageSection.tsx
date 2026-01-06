'use client';

import { ChangeEvent, useRef } from 'react';
import Icons from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import Button from '@/shared/components/button/Button';
import ImagePreview from '@/shared/components/image-preview/ImagePreview';
import Label from '@/shared/components/label/Label';
import { UserServiceResponseDto } from '@/shared/types/user';

interface ProfileImageFormProps {
  user: UserServiceResponseDto | undefined;
  profileImg: File | null;
  /** 프로필 이미지 파일 상태를 업데이트하는 setter 함수 */
  setProfileImg: (file: File | null) => void;
}

/**
 * ## ProfileImageSection
 *
 * @description
 * 마이페이지 > 내 정보 페이지에서 사용하는 프로필 이미지 수정 섹션 컴포넌트입니다.
 *
 * @param user - 현재 로그인한 사용자 정보
 * @param profileImg - 사용자가 새로 선택한 프로필 이미지 파일
 * @param setProfileImg - 프로필 이미지 파일 상태를 업데이트하는 setter 함수
 */
export default function ProfileImageSection({
  user,
  profileImg,
  setProfileImg,
}: ProfileImageFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(file);
    }
  };

  const resetProfileImg = () => {
    setProfileImg(null);
  };

  return (
    <div className='flex flex-col'>
      <Label htmlFor='profileImg' variant='authForm'>
        프로필 이미지
      </Label>
      <input
        ref={fileInputRef}
        id='profileImg'
        name='profileImg'
        type='file'
        accept='image/*'
        className='sr-only'
        onChange={handleChange}
      />
      <button
        type='button'
        aria-label='프로필 이미지 수정'
        className='relative mx-6 my-8 h-120 w-120 cursor-pointer'
        onClick={handleClick}>
        <ImagePreview
          src={user?.profileImageUrl}
          className='rounded-full'
          file={profileImg}
          fallback={
            <Avatar user={user} size='lg'>
              <AvatarFallback />
              <AvatarImage />
            </Avatar>
          }
        />
        <span className='absolute right-2 bottom-2 flex h-32 w-32 items-center justify-center rounded-full bg-gray-300'>
          <Icons.Edit className='h-24 w-24 text-white' />
        </span>
      </button>
      <Button
        type='button'
        variant='secondary'
        size='sm'
        disabled={user?.profileImageUrl === null && profileImg === null}
        onClick={resetProfileImg}>
        기본 이미지로 변경
      </Button>
    </div>
  );
}
