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

/** 한 번에 표시할 페이지 버튼 개수 (페이지 그룹 단위) */
const PAGES_PER_GROUP = 5;

/** totalPage가 0 이하인 경우를 방어하기 위한 기본 반환값 */
const EMPTY_RANGE: PaginationRange = {
  checkedCurrentPage: 1,
  visiblePages: [],
  canGoPrev: false,
  canGoNext: false,
};

/**
 * 페이지네이션 UI에 필요한 페이지 범위를 계산하는 유틸 함수입니다.
 *
 * @description
 * - 페이지 번호는 고정된 그룹 단위로 표시됩니다. (예: 1-5, 6-10)
 * - 이전/다음 화살표 활성화 여부도 함께 계산합니다.
 *
 * @param currentPage - 현재 페이지 번호
 * @param totalPage - 전체 페이지 수
 *
 * @returns
 * - `checkedCurrentPage`: 보정된 현재 페이지 번호
 * - `visiblePages`: 화면에 표시할 페이지 번호 배열 (최대 5개)
 * - `canGoPrev`: 이전 페이지로 이동 가능 여부
 * - `canGoNext`: 다음 페이지로 이동 가능 여부
 *
 * @example
 * getPaginationRange({ currentPage: 6, totalPage: 12 })
 * {
 *   checkedCurrentPage: 6,
 *   visiblePages: [6, 7, 8, 9, 10],
 *   canGoPrev: true,
 *   canGoNext: true
 * }
 */
export const getPaginationRange = ({
  currentPage,
  totalPage,
}: GetPaginationRangeProps): PaginationRange => {
  if (totalPage <= 0) {
    return EMPTY_RANGE;
  }
  const checkedCurrentPage = Math.min(Math.max(currentPage, 1), totalPage);
  const startPage = Math.floor((checkedCurrentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + (PAGES_PER_GROUP - 1), totalPage);

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const canGoPrev = checkedCurrentPage > 1;
  const canGoNext = checkedCurrentPage < totalPage;

  return {
    checkedCurrentPage,
    visiblePages,
    canGoPrev,
    canGoNext,
  };
};
