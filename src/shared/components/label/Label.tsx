import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const labelVariants = cva('text-gray-950', {
  variants: {
    variant: {
      authForm: 'body-14 sm:body-16 text-left font-medium',
      form: 'body-14 sm:body-16 text-left font-bold',
      review: 'body-16 sm:body-18 text-center font-bold',
    },
  },
  defaultVariants: {
    variant: 'authForm',
  },
});

type LabelVariantsProps = VariantProps<typeof labelVariants>;

interface LabelProps extends LabelVariantsProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

/**
 * ## Label
 *
 * @description
 * - 폼 요소와 함께 사용되는 텍스트 라벨 컴포넌트입니다.
 * - `variant` 프리셋을 통해 타이포그래피 스타일을 간단하게 적용할 수 있습니다.
 *
 * ### variant presets
 * - `authForm` (기본값)
 *   - 로그인 / 회원가입 등 유저 관련 폼에서 사용되는 기본 라벨
 *   - `md` 사이즈, 좌측 정렬, medium weight
 *
 * - `form`
 *   - 체험 등록 폼에서 사용되는 라벨
 *   - `md` 사이즈, 좌측 정렬, bold weight
 *
 * - `review`
 *   - 리뷰 폼에서 사용되는 라벨
 *   - `lg` 사이즈, 중앙 정렬, bold weight
 *
 * @param htmlFor - 연결될 form control의 `id` 값
 * @param variant - 라벨의 스타일 `'authForm' | 'form' | 'review'`
 * @param className - 추가적인 스타일 확장을 위한 클래스
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" variant="authForm">이메일</Label>
 *
 * <Label htmlFor="password" variant="form">
 *   비밀번호
 * </Label>
 *
 * <Label htmlFor="review" variant="review">
 *   소중한 경험을 들려주세요
 * </Label>
 * ```
 */
export default function Label({ htmlFor, children, className, variant }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn(labelVariants({ variant }), className)}>
      {children}
    </label>
  );
}
