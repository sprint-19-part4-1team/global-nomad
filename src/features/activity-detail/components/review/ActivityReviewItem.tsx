import { format } from 'date-fns';
import Icons from '@/assets/icons';
import { ReviewServiceResponseDto } from '@/shared/types/activities';

/**
 * 체험 리뷰 컴포넌트의 Props
 * @property {ReviewServiceResponseDto} review - 리뷰 데이터 객체
 */
interface ActivityReviewItemProps {
  review: ReviewServiceResponseDto;
}

/**
 * 체험 리뷰 표시 컴포넌트
 *
 * 체험에 대한 사용자 리뷰를 카드 형태로 표시하며,
 * 작성자 닉네임, 작성일, 별점, 리뷰 내용을 포함합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 정보를 표시합니다:
 * - 작성자 닉네임: 굵은 글씨로 표시
 * - 작성일: yyyy.MM.dd 형식으로 표시
 * - 별점: 노란색 별 아이콘으로 시각화
 * - 리뷰 내용: 본문 텍스트로 표시
 *
 * @param {ActivityReviewItemProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 리뷰 카드
 *
 * @example
 * ```tsx
 * <ActivityReviewItem
 *   review={{
 *     user: { nickname: '테스트' },
 *     rating: 5,
 *     content: '정말 재미있는 체험이었어요!',
 *     createdAt: '2024-01-15T10:30:00Z'
 *   }}
 * />
 * ```
 */
export default function ActivityReviewItem({ review }: ActivityReviewItemProps) {
  const {
    user: { nickname },
    rating,
    content,
    createdAt,
  } = review;

  const date = format(new Date(createdAt), 'yyyy.MM.dd');

  return (
    <article className='flex w-full flex-col gap-12 rounded-24 p-20 body-14 text-gray-950 shadow-card sm:body-16'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-8'>
          <span className='font-bold'>{nickname}</span>
          <time className='body-13 font-medium text-gray-400 sm:body-14'>{date}</time>
        </div>
        <div className='flex items-center'>
          {Array.from({ length: rating }).map((_, index) => (
            <Icons.Star key={index} aria-hidden='true' className='h-16 w-16 text-yellow-500' />
          ))}
        </div>
      </div>
      <p className='font-normal'>{content}</p>
    </article>
  );
}
