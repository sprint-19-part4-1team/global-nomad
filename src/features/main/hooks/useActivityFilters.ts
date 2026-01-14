import { useRouter } from 'next/navigation';
import { useActivities } from '@/features/main/queries/useActivities';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { GetActivitiesParams } from '@/shared/types/activities';
import { parsePageQueryParam } from '@/shared/utils/parsePageQueryParam';

type FilterKey = 'category' | 'sort' | 'keyword' | 'page';

const FILTER_CONFIG: Record<
  FilterKey,
  {
    shouldRemove: (value: any) => boolean;
  }
> = {
  category: {
    shouldRemove: (value) => value === undefined,
  },
  sort: {
    shouldRemove: (value) => value === 'latest' || !value,
  },
  keyword: {
    shouldRemove: (value) => !value || value.trim() === '',
  },
  page: {
    shouldRemove: (value) => value === 1 || !value,
  },
};

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

  const { data, isPending } = useActivities({
    method: 'offset',
    page: currentPage,
    size,
    category,
    keyword,
    sort,
  });

  const activities = data?.activities;
  const totalCount = data?.totalCount;

  const updateFilters = (
    updates: Partial<{
      category: GetActivitiesParams['category'];
      sort: GetActivitiesParams['sort'];
      keyword: string;
      page: number;
    }>
  ) => {
    const params = new URLSearchParams(window.location.search);

    (Object.entries(updates) as [FilterKey, any][]).forEach(([key, value]) => {
      const { shouldRemove } = FILTER_CONFIG[key];

      if (shouldRemove(value)) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

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
    totalCount,
    isPending,
    updateFilters,
  };
};
