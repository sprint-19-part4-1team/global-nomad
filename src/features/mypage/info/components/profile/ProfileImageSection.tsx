'use client';

import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import { ProfileImageState } from '@/features/mypage/info/hooks/useProfileForm';
import Button from '@/shared/components/button/Button';
import ImagePreview from '@/shared/components/image-preview/ImagePreview';
import Label from '@/shared/components/label/Label';
import { MAX_PROFILE_IMAGE_SIZE } from '@/shared/constants';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isSameFile, validateImageFile } from '@/shared/utils/fileUpload';

interface ProfileImageSectionProps {
  user: UserServiceResponseDto;
  previewImage: string | File | null;
  onSelect: (file: File) => void;
  onReset: () => void;
  imageState: ProfileImageState;
}

/**
 * ## ProfileImageSection
 *
 * @description
 * 마이페이지 > 내 정보 페이지에서 사용하는 프로필 이미지 수정 섹션 컴포넌트입니다.
 *
 * @param user - 현재 로그인한 사용자 정보
 * @param profileImg - 사용자가 새로 선택한 프로필 이미지 파일
 * @param onSelect - 프로필 이미지 파일 선택 시 호출되는 콜백 함수
 * @param onReset - 기본 이미지로 변경 버튼 클릭 시 호출되는 콜백 함수
 * @param ProfileImageState - 프로필 이미지 변경 상태
 */
export default function ProfileImageSection({
  user,
  previewImage,
  onSelect,
  onReset,
  imageState,
}: ProfileImageSectionProps) {
  const { fileInputRef, open, handleChange } = useFileInput((file) => {
    if (!validateImageFile(file, MAX_PROFILE_IMAGE_SIZE)) {
      return;
    }

    if (imageState.type === 'upload' && isSameFile(imageState.file, file)) {
      toast.info('이미 선택한 이미지입니다.');
      return;
    }

    onSelect(file);
  });

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
        className='relative mx-6 my-8 h-120 w-120'
        onClick={open}>
        <ImagePreview
          className='rounded-full'
          src={typeof previewImage === 'string' ? previewImage : null}
          file={previewImage instanceof File ? previewImage : null}
          fallback={
            <span role='img' aria-label={`${user.nickname}님의 프로필`}>
              <Icons.Avatar />
            </span>
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
        disabled={previewImage === null}
        onClick={onReset}>
        기본 이미지로 변경
      </Button>
    </div>
  );
}
