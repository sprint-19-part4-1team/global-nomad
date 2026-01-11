'use client';

import { useState } from 'react';
import Card from '@/features/main/components/card/Card';
import FilterButton from '@/features/main/components/filter-button/FilterButton';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import Pagination from '@/shared/components/pagination/Pagination';
import Title from '@/shared/components/title/Title';
import { ACTIVITY_CATEGORIES } from '@/shared/constants';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { parsePageQueryParam } from '@/shared/utils/parsePageQueryParam';

export default function AllActivity() {
  const [currentPage, setCurrentPage] = useQueryParamState('page', {
    defaultValue: 1,
    parse: parsePageQueryParam,
  });

  // 필터버튼
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      <div className='relative mt-33 sm:mt-80'>
        <div className='mb-15 sm:mb-15 md:mb-20'>
          <Title responsive='lg' className='hidden sm:block'>
            🛼 모든 체험
          </Title>
          <div className='block sm:hidden'>
            <SelectDropdown
              onChangeValue={() => {}}
              triggerId='category-filter'
              value=''
              variants='shadow'>
              <SelectDropdownTrigger>
                <SelectDropdownValue
                  placeholder='🛼 모든 체험'
                  placeholderClassName='heading-18 font-bold text-gray-950'
                  // render={(value) => ACTIVITY_CATEGORIES.find((opt) => opt.value === value)?.label}
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
          {ACTIVITY_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <FilterButton
                key={category.value}
                isActive={isActive}
                onClick={() => setActiveCategory(category.value)}>
                <span>{category.label}</span>
              </FilterButton>
            );
          })}
        </div>
        <div className='absolute top-0 right-0 md:top-auto md:bottom-10'>
          <SelectDropdown
            onChangeValue={() => {}}
            triggerId='sort-filter'
            value=''
            variants='shadow'>
            <SelectDropdownTrigger>
              <SelectDropdownValue
                placeholder='최신순'
                placeholderClassName='text-gray-950'
                // render={(value) => ACTIVITY_CATEGORIES.find((opt) => opt.value === value)?.label}
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
      <div className='flex flex-wrap'>
        <div className='mt-30 w-1/4'>
          <Card
            id={123}
            bannerImageUrl='/abc'
            title={`aaa`}
            rating={2}
            reviewCount={33}
            price={39990}
          />
        </div>
        <div className='mt-30 w-1/4'>
          <Card
            id={123}
            bannerImageUrl='/abc'
            title={`aaa`}
            rating={2}
            reviewCount={33}
            price={39990}
          />
        </div>
        <div className='mt-30 w-1/4'>
          <Card
            id={123}
            bannerImageUrl='/abc'
            title={`aaa`}
            rating={2}
            reviewCount={33}
            price={39990}
          />
        </div>
        <div className='mt-30 w-1/4'>
          <Card
            id={123}
            bannerImageUrl='/abc'
            title={`aaa`}
            rating={2}
            reviewCount={33}
            price={39990}
          />
        </div>
      </div>

      <div className='mt-24 flex justify-center sm:mt-30'>
        <Pagination
          totalCount={100}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
