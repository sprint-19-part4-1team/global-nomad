interface GetPaginationRangeProps {
  currentPage: number;
  totalPage: number;
}
type PaginationRange = {
  checkedCurrentPage: number;
  visiblePages: number[];
  canGoPrev: boolean;
  canGoNext: boolean;
};

const PAGES_PER_GROUP = 5;
const emptyRange: PaginationRange = {
  checkedCurrentPage: 1,
  visiblePages: [],
  canGoPrev: false,
  canGoNext: false,
};

export const getPaginationRange = ({
  currentPage,
  totalPage,
}: GetPaginationRangeProps): PaginationRange => {
  if (totalPage <= 0) {
    return emptyRange;
  }
  const checkedCurrentPage = Math.min(Math.max(currentPage, 1), totalPage);
  const startPage = Math.floor((checkedCurrentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + (PAGES_PER_GROUP - 1), totalPage);
  const visiblePages: number[] = [];

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }
  const canGoPrev = checkedCurrentPage > 1;
  const canGoNext = checkedCurrentPage < totalPage;

  return {
    checkedCurrentPage,
    visiblePages,
    canGoPrev,
    canGoNext,
  };
};
