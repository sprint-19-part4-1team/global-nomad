import { cn } from '@/shared/utils/cn';

/**
 * Skeleton 컴포넌트의 Props
 *
 * @property {string} className - Skeleton 컴포넌트의 CSS 클래스 (width, height, border-radius, 배경색 등)
 */
interface SkeletonProps {
  className: string;
}

/**
 * Skeleton 컴포넌트
 *
 * 콘텐츠 로딩 중 표시되는 애니메이션 플레이스홀더 컴포넌트입니다.
 * className을 통해 크기와 스타일을 지정하여 다양한 형태의 스켈레톤을 생성할 수 있습니다.
 *
 * @param {SkeletonProps} props - 컴포넌트 props
 * @returns {JSX.Element} Skeleton 컴포넌트
 *
 * @example
 * ```tsx
 * // 박스형 스켈레톤
 * <Skeleton className="h-100 w-100 rounded-24" />
 *
 * // 텍스트 라인 스켈레톤
 * <Skeleton className="h-16 w-full rounded" />
 *
 * // 원형 아바타 스켈레톤
 * <Skeleton className="h-64 w-64 rounded-full" />
 *
 * // 반응형 스켈레톤
 * <Skeleton className="h-72 w-72 rounded-16 sm:h-140 sm:w-140 sm:rounded-24" />
 *
 * // 추가 스타일 적용
 * <Skeleton className="h-32 w-1/2 rounded bg-gray-300" />
 * ```
 */
export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('h-100 w-100 animate-pulse bg-gray-200', className)} />;
}
