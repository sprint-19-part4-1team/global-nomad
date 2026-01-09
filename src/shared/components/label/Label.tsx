import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const labelVariants = cva('w-fit', {
  variants: {
    variant: {
      authForm: 'font-medium text-gray-950 body-14 sm:body-16',
      form: 'form-title',
      review: 'w-full text-center font-bold text-gray-950 body-16 sm:body-18',
    },
  },
  defaultVariants: {
    variant: 'authForm',
  },
});

type LabelVariantsProps = VariantProps<typeof labelVariants>;

interface LabelProps extends LabelVariantsProps {
  id?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
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
 * @param id - 다른 컴포넌트에서 라벨을 참조하기 위한 식별자
 * @param htmlFor - 연결될 form control의 `id` 값
 * @param children - 라벨에 표시될 텍스트
 * @param variant - 라벨의 스타일 `'authForm' | 'form' | 'review'`
 * @param className - 추가적인 스타일 확장을 위한 클래스
 * @param onClick - selectDropdown 포커스 트리거를 위한 onClick 함수
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
export default function Label({ id, htmlFor, children, className, variant, onClick }: LabelProps) {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={cn(labelVariants({ variant }), className)}
      onClick={onClick}>
      {children}
    </label>
  );
}
