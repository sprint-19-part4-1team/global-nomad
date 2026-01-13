'use client';

import { useEffect } from 'react';
import Card from '@/features/main/components/card/Card';
import FilterButton from '@/features/main/components/filter-button/FilterButton';
import { useActivityFilters } from '@/features/main/hooks/useActivityFilters';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import Pagination from '@/shared/components/pagination/Pagination';
import Title from '@/shared/components/title/Title';
import { ACTIVITY_CATEGORIES, SORT_LABELS } from '@/shared/constants';
import { GetActivitiesParams } from '@/shared/types/activities';

export default function AllActivity({
  onEmptyChange,
}: {
  onEmptyChange?: (isEmpty: boolean) => void;
}) {
  const {
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
  } = useActivityFilters();

  // 상위로 activities 갯수 보내기
  useEffect(() => {
    if (!isPending) {
      onEmptyChange?.(activities?.length === 0);
    }
  }, [activities, isPending, onEmptyChange]);

  // 화면 크기에 따라 size 자동 변경
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const updateSize = () => {
      if (mediaQuery.matches) {
        setSize(8);
      } else {
        setSize(4);
      }
    };

    updateSize(); // 초기 값 설정
    mediaQuery.addEventListener('change', updateSize);
    return () => mediaQuery.removeEventListener('change', updateSize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [size]);

  // 페이지 네이션
  const activitiesList = activities ?? [];

  const pageSize = size ?? 8;
  const isLastPage = activitiesList.length < pageSize;

  const totalCount = isLastPage
    ? (currentPage - 1) * pageSize + activitiesList.length
    : (currentPage + 1) * pageSize;

  return (
    <>
      {isPending ? (
        <div>모든 체험 로딩중...</div>
      ) : activities && activities.length > 0 ? (
        <>
          <div className='relative mt-33 sm:mt-80'>
            <div className='mb-15 sm:mb-15 md:mb-20'>
              <Title responsive='lg' className='hidden sm:block'>
                🛼 모든 체험
              </Title>

              <div className='block sm:hidden'>
                <SelectDropdown
                  onChangeValue={(value) =>
                    setCategory(value as NonNullable<GetActivitiesParams['category']>)
                  }
                  triggerId='category-filter'
                  value={category as string}
                  variants='shadow'>
                  <SelectDropdownTrigger>
                    <SelectDropdownValue
                      placeholder='🛼 모든 체험'
                      placeholderClassName='heading-18 font-bold text-gray-950'
                      render={(value) =>
                        ACTIVITY_CATEGORIES.find((opt) => opt.value === value)?.label
                      }
                      valueClassName='heading-18 font-bold text-gray-950'
                    />
                  </SelectDropdownTrigger>
                  <SelectDropdownContent>
                    {ACTIVITY_CATEGORIES.map((category) => (
                      <SelectDropdownItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectDropdownItem>
                    ))}
                  </SelectDropdownContent>
                </SelectDropdown>
              </div>
            </div>

            <div className='mt-15 hidden gap-10 sm:mt-30 sm:flex md:gap-13 lg:gap-20'>
              {ACTIVITY_CATEGORIES.map((item) => {
                const isActive = category === item.value;

                return (
                  <FilterButton
                    key={item.value}
                    isActive={isActive}
                    onClick={() => setCategory(isActive ? undefined : item.value)}>
                    <span>{item.label}</span>
                  </FilterButton>
                );
              })}
            </div>

            <div className='absolute top-0 right-0 md:top-auto md:bottom-10'>
              <SelectDropdown
                onChangeValue={(value) =>
                  setSort(value as NonNullable<GetActivitiesParams['sort']>)
                }
                triggerId='sort-filter'
                value={sort as string}
                variants='shadow'>
                <SelectDropdownTrigger>
                  <SelectDropdownValue
                    placeholder={sort}
                    placeholderClassName='text-gray-950'
                    render={(value) => SORT_LABELS[value] ?? '정렬'}
                    valueClassName='text-gray-950'
                  />
                </SelectDropdownTrigger>
                <SelectDropdownContent className='right-0 left-auto'>
                  <SelectDropdownItem value='latest'>최신순</SelectDropdownItem>
                  <SelectDropdownItem value='most_reviewed'>리뷰 많은순</SelectDropdownItem>
                  <SelectDropdownItem value='price_asc'>가격 높은순</SelectDropdownItem>
                  <SelectDropdownItem value='price_desc'>가격 낮은순</SelectDropdownItem>
                </SelectDropdownContent>
              </SelectDropdown>
            </div>
          </div>

          <div className='-mr-12 flex flex-wrap'>
            {activities.map((activity) => (
              <div key={activity.id} className='mt-30 basis-1/4 pr-12'>
                <Card
                  id={activity.id}
                  bannerImageUrl={activity.bannerImageUrl}
                  title={activity.title}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  price={activity.price}
                />
              </div>
            ))}
          </div>

          <div className='mt-24 flex justify-center sm:mt-30'>
            <Pagination
              totalCount={totalCount}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
