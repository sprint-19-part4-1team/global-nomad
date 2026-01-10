'use client';

import { FormEvent, useState } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';

export default function SearchBar() {
  const [value, setValue] = useState('');

  const onSubmit = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert('검색어를 입력해주세요.');
      return;
    }

    alert(`입력한 값: ${trimmedValue}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
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
