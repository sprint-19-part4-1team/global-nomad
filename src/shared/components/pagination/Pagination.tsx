'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';
import { getPaginationRange } from '@/shared/utils/getPaginationRange';

interface PaginationProps {
  totalCount: number;
  size: number;
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
};

/**
 * @description
 * - 현재 페이지는 URL의 `page` 파라미터에서 파생됩니다.
 * - 한 번에 최대 5개의 페이지 버튼만 노출됩니다.
 * - 선택된 페이지 버튼은 비활성화되며 hover 되지 않습니다.
 * - 좌/우 화살표는 이동 가능한 경우에만 활성화됩니다.
 * - 페이지 이동 시 스크롤이 상단으로 이동하지 않도록 처리되어 있습니다.
 *
 * @param totalCount - API에서 내려주는 전체 아이템 개수
 * @param size - 한 페이지에 표시할 아이템 개수 ( ex) 메인 페이지 기준 8개(데스크탑), 4개(테블릿), 6개(모바일) )
 */
export default function Pagination({ totalCount, size }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParams = searchParams.get('page');
  const pageNumber = pageParams ? Number(pageParams) : NaN;
  const currentPageFromUrl =
    Number.isFinite(pageNumber) && pageNumber > 0 ? Math.floor(pageNumber) : 1;

  const totalPage = Math.max(1, Math.ceil(totalCount / size));
  const { checkedCurrentPage, visiblePages, canGoPrev, canGoNext } = getPaginationRange({
    currentPage: currentPageFromUrl,
    totalPage,
  });

  const setPageInUrl = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(nextPage));
    }
    const query = nextParams.toString();

    router.push(query ? `${pathname}?${query}` : `${pathname}`, { scroll: false });
  };

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }
    setPageInUrl(checkedCurrentPage - 1);
  };
  const handleNext = () => {
    if (!canGoNext) {
      return;
    }
    setPageInUrl(checkedCurrentPage + 1);
  };
  const handleSelectPage = (page: number) => {
    if (page === checkedCurrentPage) {
      return;
    }
    setPageInUrl(page);
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
        <Icons.ChevronLeft className='h-24 w-24' />
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
        <Icons.ChevronRight className='h-24 w-24' />
      </button>
    </nav>
  );
}
