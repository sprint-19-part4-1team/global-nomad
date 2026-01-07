'use client';

import Input from '@/shared/components/input/Input';
import { UserServiceResponseDto } from '@/shared/types/user';

interface ProfileInfoSectionProps {
  user: UserServiceResponseDto | undefined;
  nickname: string;
  onChange: (nickname: string) => void;
  onBlur: (nickname: string) => void;
  errorMessage: string;
}

/**
 * ## ProfileInfoSection
 *
 * @description
 * - 마이페이지 > 내 정보 수정 화면에서 사용하는 프로필 기본 정보 입력 섹션 컴포넌트입니다.
 * - 이메일(읽기 전용)과 닉네임 입력 필드를 렌더링합니다.
 * - 닉네임 입력과 관련된 상태 및 유효성 검증 로직은 상위 컴포넌트(폼 / 훅)로 위임합니다.
 *
 * @param user
 * - 현재 로그인한 사용자 정보
 * - 이메일 값을 표시하기 위해 사용됩니다.
 *
 * @param nickname
 * - 현재 닉네임 입력값
 *
 * @param onChange
 * - 닉네임 입력값 변경 시 호출되는 콜백 함수
 *
 * @param onBlur
 * - 닉네임 input blur 시 호출되는 콜백 함수
 *
 * @param errorMessage
 * - 닉네임 유효성 검사 에러 메시지
 */
export default function ProfileInfoSection({
  user,
  nickname,
  onChange,
  onBlur,
  errorMessage,
}: ProfileInfoSectionProps) {
  return (
    <div className='flex w-full flex-col gap-24'>
      <Input
        variant='authForm'
        disabled={true}
        label='이메일'
        name='email'
        type='email'
        readOnly
        value={undefined}
        defaultValue={user?.email}
      />
      <Input
        variant='authForm'
        label='닉네임'
        name='nickname'
        type='text'
        autoComplete='nickname'
        value={nickname}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        errorMessage={errorMessage}
        placeholder='닉네임을 입력해 주세요.'
      />
    </div>
  );
}
