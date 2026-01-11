'use client';

import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';
import { getPaginationRange } from '@/shared/utils/getPaginationRange';

/**
 * Pagination 컴포넌트의 Props
 *
 * @property {number} totalCount - 전체 아이템 개수
 * @property {number} itemsPerPage - 한 페이지에 표시할 아이템 개수
 * @property {number} currentPage - 현재 페이지 번호 (1부터 시작)
 * @property {(page: number) => void} onPageChange - 페이지 변경 시 호출되는 콜백 함수
 */
interface PaginationProps {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// 버튼 스타일 모음
// - ~Base : 기본 스타일
// - hoverableBtn : hover 가능한 상태
// - disabledArrowBtn : 비활성 화살표
// - selectedStyle : 선택된 페이지
const PAGINATION_STYLES = {
  arrowBtnBase: 'flex items-center justify-center h-40 w-40 text-gray-950 rounded-4',
  pageBtnBase:
    'flex items-center justify-center h-40 w-40 body-14 font-medium select-none text-gray-300 rounded-4',
  hoverableBtn: 'cursor-pointer hover:bg-gray-25',
  disabledArrowBtn: 'cursor-default text-gray-300',
  selectedStyle: 'border-b-2 border-primary-500 text-gray-950 rounded-none',
} as const;

/**
 * 페이지네이션 컴포넌트 (Controlled Component)
 *
 * @description
 * - 페이지 상태를 직접 관리하지 않고 부모 컴포넌트로부터 props로 받아 제어됩니다.
 * - URL 쿼리 파라미터 관리는 부모 컴포넌트에서 담당합니다.
 * - Controlled Component 패턴을 사용하여 재사용성과 유연성을 높였습니다.
 * - 여러 페이지네이션이 필요한 경우 각각 다른 쿼리 키로 관리할 수 있습니다.
 *
 * @param {PaginationProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 페이지네이션 UI
 *
 * @example
 * ```tsx
 * // 부모 컴포넌트에서 상태 관리
 * const [currentPage, setCurrentPage] = useQueryParamState('page', {
 *   defaultValue: 1,
 *   parse: parsePageQueryParam,
 * });
 *
 * <Pagination
 *   totalCount={100}
 *   itemsPerPage={10}
 *   currentPage={currentPage}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 */
export default function Pagination({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPage = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const { checkedCurrentPage, visiblePages, canGoPrev, canGoNext } = getPaginationRange({
    currentPage,
    totalPage,
  });

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }
    onPageChange(checkedCurrentPage - 1);
  };

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }
    onPageChange(checkedCurrentPage + 1);
  };

  const handleSelectPage = (page: number) => {
    if (page === checkedCurrentPage) {
      return;
    }
    onPageChange(page);
  };

  const { arrowBtnBase, pageBtnBase, hoverableBtn, disabledArrowBtn, selectedStyle } =
    PAGINATION_STYLES;

  return (
    <nav aria-label='페이지네이션' className='flex items-center gap-4'>
      <button
        aria-label='이전 페이지'
        className={cn(arrowBtnBase, canGoPrev ? hoverableBtn : disabledArrowBtn)}
        disabled={!canGoPrev}
        onClick={handlePrev}>
        <Icons.ChevronLeft aria-hidden='true' focusable='false' className='h-24 w-24' />
      </button>
      {visiblePages.map((page) => {
        const isSelected = page === checkedCurrentPage;

        return (
          <button
            aria-current={isSelected ? 'page' : undefined}
            aria-label={`${page} 페이지`}
            key={page}
            className={cn(pageBtnBase, isSelected ? selectedStyle : hoverableBtn)}
            disabled={isSelected}
            onClick={() => handleSelectPage(page)}>
            {page}
          </button>
        );
      })}
      <button
        aria-label='다음 페이지'
        className={cn(arrowBtnBase, canGoNext ? hoverableBtn : disabledArrowBtn)}
        disabled={!canGoNext}
        onClick={handleNext}>
        <Icons.ChevronRight aria-hidden='true' focusable='false' className='h-24 w-24' />
      </button>
    </nav>
  );
}
