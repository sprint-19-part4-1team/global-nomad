'use client';

import Icons from '@/assets/icons';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { cn } from '@/shared/utils/cn';
import { getPaginationRange } from '@/shared/utils/getPaginationRange';

interface PaginationProps {
  totalCount: number;
  itemsPerPage: number;
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
 * @description
 * - 현재 페이지는 URL 쿼리 파라미터 `page`를 기준으로 동작합니다.
 * - URL 상태 관리는 `useQueryParamState` 공통 훅에서 처리됩니다.
 * - 유효하지 않은 page 값은 1페이지로 보정되며, 1페이지는 URL에 남기지 않습니다.
 * - 실제 UI는 `getPaginationRange`에서 보정된 `checkedCurrentPage`를 기준으로 렌더링됩니다.
 *
 * @param totalCount - 전체 아이템 개수
 * @param itemsPerPage - 한 페이지에 표시할 아이템 개수 ( ex) 메인 페이지 기준 8개(데스크탑), 4개(테블릿), 6개(모바일) )
 */
export default function Pagination({ totalCount, itemsPerPage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useQueryParamState<number>('page', {
    defaultValue: 1,
    parse: (v) => {
      const n = Number(v);
      if (!Number.isFinite(n) || n <= 0) {
        return 1;
      }
      return Math.floor(n);
    },
    removeParam: (v) => v === 1,
    replace: false,
    scroll: false,
  });

  const totalPage = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const { checkedCurrentPage, visiblePages, canGoPrev, canGoNext } = getPaginationRange({
    currentPage: currentPage,
    totalPage,
  });

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }
    setCurrentPage(checkedCurrentPage - 1);
  };
  const handleNext = () => {
    if (!canGoNext) {
      return;
    }
    setCurrentPage(checkedCurrentPage + 1);
  };
  const handleSelectPage = (page: number) => {
    if (page === checkedCurrentPage) {
      return;
    }
    setCurrentPage(page);
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
