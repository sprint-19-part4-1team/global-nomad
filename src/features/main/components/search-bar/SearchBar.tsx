'use client';

import { useState } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';

/**
 * 검색어 입력 및 제출을 담당하는 검색바 컴포넌트
 *
 * @description
 * - 사용자가 검색어를 입력할 수 있는 input과 제출 버튼을 제공한다.
 * - Enter 키 또는 "검색하기" 버튼 클릭 시 동일한 submit 로직이 실행된다.
 * - 입력값은 trim() 처리되어 앞뒤 공백이 제거된다.
 * - trim 결과가 빈 문자열인 경우, 검색어 입력을 유도하는 alert를 표시한다.
 * - 정상적인 값이 있는 경우, 입력된 검색어를 alert로 노출한다.
 *
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 *
 * @behavior
 * - input은 controlled component로 관리된다.
 * - form submit 이벤트를 사용하여 키보드/버튼 인터랙션을 통합 처리한다.
 *
 */

export default function SearchBar() {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert('검색어를 입력해주세요.');
      return;
    }

    alert(`입력한 값: ${trimmedValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center justify-between rounded-16 bg-white py-6 pr-8 pl-20 shadow-card sm:rounded-24 sm:py-10 sm:pr-12 sm:pl-32'>
      <div className='flex min-w-0 flex-1 items-center'>
        <Icons.Search aria-hidden className='mr-4 h-24 w-24 sm:mr-10' />
        <input
          name='search'
          type='text'
          placeholder='내가 원하는 체험은'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-[calc(100%-24px-4px)] body-14 font-medium outline-0 sm:w-[calc(100%-24px-10px)] sm:body-18'
        />
      </div>
      <Button
        type='submit'
        size='md'
        className='ms:h-50 ml-5 h-42 w-105 shrink-0 sm:ml-10 sm:w-120'>
        검색하기
      </Button>
    </form>
  );
}
