'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useChangePasswordForm } from '@/features/mypage/info/hooks/useChangePasswordForm';
import { logout } from '@/shared/apis/feature/auth';
import { updateMyInfo } from '@/shared/apis/feature/users';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import { openAlert } from '@/shared/components/overlay/store/overlayActions';
import { useUserStore } from '@/shared/stores/userStore';

interface ChangePasswordFormProps {
  userEmail: string;
}

/**
 * ## ChangePasswordForm
 *
 * @description
 * - 마이페이지 내 정보 수정에서 사용하는 비밀번호 변경 폼입니다.
 *
 * @param userEmail - 로그인한 유저 이메일
 */
export default function ChangePasswordForm({ userEmail }: ChangePasswordFormProps) {
  const { values, errors, isValid, handleChange, handleBlur } = useChangePasswordForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const clearSession = useUserStore((state) => state.clearSession);

  const handleLogout = async () => {
    try {
      await logout();
      clearSession('user');
      router.replace('/login');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateMyInfo({ newPassword: values.newPassword });
      openAlert({
        message: (
          <div className='text-center'>
            성공적으로 변경되었습니다!
            <br />
            다시 로그인 해주세요.
          </div>
        ),
        onClose: handleLogout,
      });
    } catch (error) {
      console.error('비밀번호 변경 실패: ', error);
      toast.error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='mt-20 flex flex-col items-center gap-24 sm:mt-32' onSubmit={handleSubmit}>
      {/* 접근성용 username input */}
      <input
        type='text'
        name='username'
        autoComplete='username'
        value={userEmail}
        readOnly
        className='sr-only'
      />
      {/* 실제 비밀번호 폼 */}
      <Input
        variant='authForm'
        label='새 비밀번호'
        name='newPassword'
        type='password'
        autoComplete='new-password'
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='새 비밀번호를 입력해 주세요.'
        errorMessage={errors.newPassword}
      />
      <Input
        variant='authForm'
        label='새 비밀번호 확인'
        name='confirmPassword'
        type='password'
        autoComplete='new-password'
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='새 비밀번호를 한 번 더 입력해 주세요.'
        errorMessage={errors.confirmPassword}
      />
      <Button type='submit' disabled={!isValid} isLoading={isSubmitting} className='w-160'>
        변경하기
      </Button>
    </form>
  );
}
