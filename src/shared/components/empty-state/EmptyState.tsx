import { ComponentType } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import { cn } from '@/shared/utils/cn';

type EmptyType = 'experience' | 'review';
type ReviewProps = {
  type: 'review';
  mainText: string;
  href?: never;
  btnText?: never;
};
type ExperienceProps = {
  type: 'experience';
  mainText: string;
  button?: { href: string; text: string };
  href: string;
  btnText: string;
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
 * 데이터가 존재하지 않는 경우(Empty State) 사용자에게 안내 문구와 액션 버튼을 제공하는 컴포넌트입니다.
 * @param type - 사용처 유형 ('experience' | 'review')
 * @param mainText - 아이콘 하단에 표시될 텍스트
 * @param href - (선택) 버튼을 누르면 이동시킬 경로
 * @param btnText - (선택) 버튼에 표시될 텍스트
 *
 * @example
 * <EmptyState type='experience' mainText='체험이 없음요' href='/' btnText='홈으로 가기' />
 * <EmptyState type='experience' mainText='체험도 없고 버튼도 없음요' />
 * <EmptyState type='review' mainText='리뷰가 없음요' />
 */
export default function EmptyState({ type, mainText, href, btnText }: EmptyStateProps) {
  const { Icon, extraClassName } = EMPTY_STATE_VARIANTS[type];
  const iconClassName = cn('h-182 w-182', extraClassName);

  const canShowButton = type === 'experience' && Boolean(href) && Boolean(btnText);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-16 flex flex-col items-center justify-center body-16 font-medium text-gray-500'>
        <Icon className={iconClassName} />
        <span>{mainText}</span>
      </div>

      {canShowButton && (
        <Button href={href} variant='primary'>
          <span className='body-16 font-semibold'>{btnText}</span>
        </Button>
      )}
    </div>
  );
}
