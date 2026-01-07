import { ComponentType } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import { cn } from '@/shared/utils/cn';

type EmptyType = 'experience' | 'review';
type ReviewProps = {
  type: 'review';
  mainText: string;
  button?: never;
};
type ExperienceProps = {
  type: 'experience';
  mainText: string;
  button?: { href: string; text: string };
};

type EmptyStateProps = ReviewProps | ExperienceProps;

const EMPTY_STATE_VARIANTS: Record<
  EmptyType,
  {
    Icon: ComponentType<{ className?: string }>;
    extraClassName?: string;
  }
> = {
  experience: {
    Icon: Icons.SadEarth,
  },
  review: {
    Icon: Icons.SpeechBubble,
    extraClassName: 'text-primary-100',
  },
};

/**
 * 데이터가 없을 때(Empty State) 사용자에게 안내 메시지를 표시하는 컴포넌트입니다.
 *
 * `type` 값에 따라 렌더링되는 아이콘과 버튼 노출 여부가 달라집니다.
 *
 * ## 타입별 동작
 * - `experience`
 *   - 체험 데이터가 없을 때 사용
 *   - 하단에 액션 버튼을 선택적으로 표시할 수 있습니다
 * - `review`
 *   - 리뷰 데이터가 없을 때 사용
 *   - 버튼은 표시되지 않습니다
 *
 * @param type - Empty State의 사용 목적 (`'experience' | 'review'`)
 * @param mainText - 아이콘 하단에 표시될 안내 문구
 * @param button - (`experience` 타입에서만 선택 가능)
 *   - href: 버튼 클릭 시 이동할 경로
 *   - text: 버튼에 표시될 텍스트
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText="등록된 체험이 없습니다."
 *   button={{ href: '/', text: '홈으로 가기' }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText="체험이 없습니다."
 * />
 * ```
 *
 * @example
 * ```tsx
 * <EmptyState
 *   type="review"
 *   mainText="아직 작성된 리뷰가 없습니다."
 * />
 * ```
 */
export default function EmptyState({ type, mainText, button }: EmptyStateProps) {
  const { Icon, extraClassName } = EMPTY_STATE_VARIANTS[type];
  const iconClassName = cn('h-182 w-182', extraClassName);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-16 flex flex-col items-center justify-center body-16 font-medium text-gray-500'>
        <Icon className={iconClassName} />
        <span>{mainText}</span>
      </div>

      {type === 'experience' && button?.href && button.text && (
        <Button href={button.href} variant='primary'>
          {button.text}
        </Button>
      )}
    </div>
  );
}
