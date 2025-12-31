import { FormEvent, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface AuthFormProps {
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

export default function AuthForm({ onSubmit, className, children }: AuthFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('felx-col flex w-full gap-20 **:last:mt-10', className)}>
      {children}
    </form>
  );
}
