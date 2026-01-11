'use client';

import { useState } from 'react';
import Card from '@/features/main/components/card/Card';
import FilterButton from '@/features/main/components/filter-button/FilterButton';
import SearchBar from '@/features/main/components/search-bar/SearchBar';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import Pagination from '@/shared/components/pagination/Pagination';
import BannerSlide from '@/shared/components/slide/BannerSlide';
import PopularSlide from '@/shared/components/slide/PopularSlide';
import Title from '@/shared/components/title/Title';
import { ACTIVITY_CATEGORIES, layoutContainer } from '@/shared/constants/';

// 필터 버튼
const CATEGORY_ICONS: Record<string, string> = {
  '문화 · 예술': '🎨',
  식음료: '🍜',
  투어: '🏙️',
  관광: '🚍',
  웰빙: '🌿',
};

export default function Home() {
  // 필터버튼
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main
      className='min-h-[calc(100dvh-130px-80px)] sm:min-h-[calc(100dvh-146px-100px)] lg:min-h-[calc(100dvh-146px-180px)]'
      style={{
        background:
          'url("/cloud.png") center top /cover no-repeat, linear-gradient(180deg, rgba(201, 228, 255, 1) 0%, rgba(228, 241, 255, 1) 29%, rgba(254, 254, 255, 1) 100%)',
      }}>
      <div
        className={layoutContainer({
          maxWidth: 1200,
          paddingX: 'wide',
          paddingTop: 'md',
        })}>
        <BannerSlide />
        <Title responsive='lg' className='mt-30 mb-12 text-center sm:mt-62 sm:mb-36 md:mt-82'>
          무엇을 체험하고 싶으신가요?
        </Title>
        <SearchBar />

        <Title responsive='lg' className='mt-55 mb-14 sm:mt-92 sm:mb-16 md:mb-20'>
          🔥 인기 체험
        </Title>
        <PopularSlide
          slides={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i}>
              <Card
                id={123 + i}
                bannerImageUrl='/abc'
                title={`aaa ${i}`}
                rating={2}
                reviewCount={33}
                price={39990}
              />
            </div>
          ))}
        />

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
                  <SelectDropdownItem value='문화 · 예술'>🎨 문화 · 예술</SelectDropdownItem>
                  <SelectDropdownItem value='식음료'>🍜 식음료</SelectDropdownItem>
                  <SelectDropdownItem value='투어'>🏙️ 투어</SelectDropdownItem>
                  <SelectDropdownItem value='관광'>🚍 관광</SelectDropdownItem>
                  <SelectDropdownItem value='웰빙'>🌿 웰빙</SelectDropdownItem>
                </SelectDropdownContent>
              </SelectDropdown>
            </div>
          </div>

          <div className='mt-15 hidden gap-10 sm:mt-30 sm:flex md:gap-13 lg:gap-20'>
            {ACTIVITY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;

              return (
                <div key={category}>
                  <FilterButton isActive={isActive} onClick={() => setActiveCategory(category)}>
                    <span>{CATEGORY_ICONS[category]}</span>
                    <span>{category}</span>
                  </FilterButton>
                </div>
              );
            })}
          </div>
          <div className='absolute top-0 right-0 md:top-auto md:bottom-10'>
            <SelectDropdown
              onChangeValue={() => {}}
              triggerId='category-filter'
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
                <SelectDropdownItem value='문화 · 예술'>최신순</SelectDropdownItem>
                <SelectDropdownItem value='문화 · 예술'>리뷰 많은순</SelectDropdownItem>
                <SelectDropdownItem value='식음료'>가격 높은순</SelectDropdownItem>
                <SelectDropdownItem value='투어'>가격 낮은순</SelectDropdownItem>
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

        <EmptyState
          button={{
            href: '/',
            text: '체험 등록하기',
          }}
          mainText={`멋진 체험을 기다리는 중이에요.
체험을 등록해보세요!`}
          type='experience'
        />

        <div className='mt-24 flex justify-center sm:mt-30'>
          <Pagination itemsPerPage={8} totalCount={80} />
        </div>

        <div />
      </div>
    </main>
  );
}
