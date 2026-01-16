'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Icons from '@/assets/icons';
import { useActivityFilters } from '@/features/main/hooks/useActivityFilters';
import Button from '@/shared/components/button/Button';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import useOverlayState from '@/shared/components/overlay/store/useOverlayState';

export default function SearchBar() {
  const { keyword } = useActivityFilters();
  const router = useRouter();

  const [value, setValue] = useState('');

  const overlays = useOverlayState();
  const EMPTY_SEARCH_DIALOG_ID = 'empty-search-dialog';
  const isSearchDialogOpen = overlays.some((o) => o.id === EMPTY_SEARCH_DIALOG_ID);

  useEffect(() => {
    setValue(keyword ?? '');
  }, [keyword]);

  // esc 키 눌렀을 때 dialog 닫기 (이외의 키는 차단)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchDialogOpen) {
      return;
    }

    if (e.key === 'Escape') {
      overlayStore.pop();
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const onSubmit = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      if (isSearchDialogOpen) {
        return;
      }

      overlayStore.push(
        <Dialog
          message='검색어를 입력해주세요.'
          onClose={() => {
            overlayStore.popById(EMPTY_SEARCH_DIALOG_ID);
          }}
        />,
        EMPTY_SEARCH_DIALOG_ID
      );
      return;
    }

    router.push(`/search?keyword=${encodeURIComponent(trimmedValue)}&sort=latest&page=1`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className='flex items-center justify-between rounded-16 bg-white py-6 pr-8 pl-20 shadow-card sm:rounded-24 sm:py-10 sm:pr-12 sm:pl-32'>
      <div className='flex min-w-0 flex-1 items-center'>
        <Icons.Search aria-hidden className='mr-4 h-24 w-24 sm:mr-10' />
        <label htmlFor='search-bar-input' className='sr-only'>
          체험 검색
        </label>
        <input
          id='search-bar-input'
          name='search'
          type='text'
          placeholder='내가 원하는 체험은'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={isSearchDialogOpen}
          className='w-full body-14 font-medium outline-0 sm:body-18'
        />
      </div>
      <Button
        type='submit'
        size='md'
        className='ml-5 h-42 w-105 shrink-0 sm:ml-10 sm:h-50 sm:w-120'>
        검색하기
      </Button>
    </form>
  );
}
