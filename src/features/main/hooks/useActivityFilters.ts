import { useRouter } from 'next/navigation';
import { useActivities } from '@/features/main/queries/useActivities';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { GetActivitiesParams } from '@/shared/types/activities';
import { parsePageQueryParam } from '@/shared/utils/parsePageQueryParam';

export const useActivityFilters = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useQueryParamState('keyword', {
    defaultValue: undefined as string | undefined,
  });

  const [currentPage, setCurrentPage] = useQueryParamState('page', {
    defaultValue: 1,
    parse: parsePageQueryParam,
  });

  const [sort, setSort] = useQueryParamState<GetActivitiesParams['sort']>('sort', {
    defaultValue: 'latest',
    removeParam: (v) => v === 'latest',
  });

  const [category, setCategory] = useQueryParamState<GetActivitiesParams['category']>('category', {
    defaultValue: undefined,
    removeParam: (v) => v === undefined,
  });

  const [size, setSize] = useQueryParamState<GetActivitiesParams['size']>('size', {
    defaultValue: 8,
    parse: (v) => Number(v),
  });

  const { data: activities, isPending } = useActivities({
    method: 'offset',
    page: currentPage,
    size: size,
    category: category,
    keyword: keyword,
    sort: sort,
  });

  const updateFilters = (updates: {
    category?: GetActivitiesParams['category'] | undefined;
    sort?: GetActivitiesParams['sort'];
    keyword?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams(window.location.search);

    // category 처리
    if ('category' in updates) {
      if (updates.category === undefined) {
        params.delete('category');
      } else {
        params.set('category', updates.category);
      }
    }

    // sort 처리
    if ('sort' in updates) {
      if (updates.sort === 'latest' || !updates.sort) {
        params.delete('sort');
      } else {
        params.set('sort', updates.sort);
      }
    }

    // keyword 처리
    if ('keyword' in updates) {
      if (updates.keyword) {
        params.set('keyword', updates.keyword);
      } else {
        params.delete('keyword');
      }
    }

    // page 처리
    if ('page' in updates) {
      if (updates.page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(updates.page));
      }
    }

    router.push(`?${params.toString()}`);
  };

  return {
    keyword,
    setKeyword,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    category,
    setCategory,
    size,
    setSize,
    activities,
    isPending,
    updateFilters,
  };
};
