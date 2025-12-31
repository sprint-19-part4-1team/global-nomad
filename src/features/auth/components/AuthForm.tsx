import { FormEvent, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface AuthFormProps {
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

/**
 * 인증 관련 폼을 위한 공통 컴포넌트
 *
 * @description
 * - 기본 submit 이벤트를 방지하고 전달받은 onSubmit 콜백을 실행
 * - 자식 요소들 사이에 20px 간격, 마지막 요소(버튼) 위에는 추가로 10px 간격 적용
 *
 * @param {AuthFormProps} props - 컴포넌트 props
 * @param {() => void} props.onSubmit - 폼 제출 시 실행될 콜백 함수
 * @param {string} [props.className] - 추가 스타일을 위한 선택적 className
 * @param {ReactNode} props.children - 폼 내부에 렌더링될 자식 요소들 (input, button 등)
 *
 * @example
 * ```tsx
 * <AuthForm onSubmit={handleLogin}>
 *   <Input type="email" />
 *   <Input type="password" />
 *   <Button type="submit">로그인</Button>
 * </AuthForm>
 * ```
 */
export default function AuthForm({ onSubmit, className, children }: AuthFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full flex-col gap-20 **:last:mt-10', className)}>
      {children}
    </form>
  );
}
