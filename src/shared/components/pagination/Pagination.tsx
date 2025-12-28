'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';
import { getPaginationRange } from '@/shared/utils/getPaginationRange';

interface PaginationProps {
  totalCount: number;
  size: number;
}

// size는 한 번에 보여질 개수( ex) 메인 페이지 데스크톱은 8개, 테블릿은 4개, 모바일은 6개 )
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
    const clampedNextPage = Math.min(Math.max(nextPage, 1), totalPage);
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('page', String(clampedNextPage));
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
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

  // 버튼 스타일 모음
  // - ~Base : 기본 스타일
  // - hoverableBtn : hover 가능한 상태
  // - disabledArrowBtn : 비활성 화살표
  // - selectedStyle : 선택된 페이지
  const arrowBtnBase = 'flex items-center justify-center h-40 w-40 text-gray-950 rounded-4';
  const pageBtnBase =
    'flex items-center justify-center h-40 w-40 body-14 font-medium select-none text-gray-300 rounded-4';
  const hoverableBtn = 'cursor-pointer hover:bg-gray-25';
  const disabledArrowBtn = 'cursor-default text-gray-300';
  const selectedStyle = 'border-b-2 border-primary-500 text-gray-950 rounded-none';

  return (
    <div className='flex items-center gap-4'>
      <button
        className={cn(arrowBtnBase, canGoPrev ? hoverableBtn : disabledArrowBtn)}
        disabled={!canGoPrev}
        onClick={handlePrev}>
        <Icons.ChevronLeft className='h-24 w-24' />
      </button>
      {visiblePages.map((page) => {
        const isSelected = page === checkedCurrentPage;

        return (
          <button
            key={page}
            className={cn(pageBtnBase, isSelected ? selectedStyle : hoverableBtn)}
            disabled={isSelected}
            onClick={() => handleSelectPage(page)}>
            {page}
          </button>
        );
      })}
      <button
        className={cn(arrowBtnBase, canGoNext ? hoverableBtn : disabledArrowBtn)}
        disabled={!canGoNext}
        onClick={handleNext}>
        <Icons.ChevronRight className='h-24 w-24' />
      </button>
    </div>
  );
}
