'use client';

import { useState } from 'react';
import { VALIDATION_MESSAGES } from '@/shared/constants';
import { isRequired } from '@/shared/utils/validators';

/** 서버에서 내려주는 주소 문자열 파싱 */
const parseAddress = (fullAddress?: string) => {
  if (!fullAddress) {
    return { main: '', detail: '' };
  }

  if (fullAddress.includes('|')) {
    const [main, ...detailParts] = fullAddress.split('|');
    return {
      main: main.trim(),
      detail: detailParts.join('|').trim(),
    };
  }

  return { main: fullAddress.trim(), detail: '' };
};

interface AddressInitialData {
  /** 서버에서 내려주는 전체 주소 문자열 */
  address?: string;
}

/**
 * ## useAddressForm
 *
 * @description
 * - 체험(Activity)의 위치 정보를 입력하기 위한
 *   주소 / 상세주소 상태와 유효성 검사를 관리하는 커스텀 훅입니다.
 * - 기본 주소(address)와 상세 주소(detailAddress)를 분리하여 관리합니다.
 * - 서버에서 내려오는 주소 문자열을 파싱하여 초기값으로 설정할 수 있습니다.
 * - 주소 필수 입력 여부에 대한 유효성 검사를 제공합니다.
 *
 * @param initialData - 서버에서 내려온 초기 주소 데이터
 *
 *  @returns
 * - `address` : 기본 주소
 * - `detailAddress` : 상세 주소
 * - `addressError` : 주소 유효성 검사 에러 메시지
 * - `setAddress` : 기본 주소 변경 함수
 * - `setDetailAddress` : 상세 주소 변경 함수
 * - `validateAddress` : 주소 필수값 유효성 검사 함수
 * - `isAddressValid` : 주소 입력 여부
 * - `getFullAddressForSubmit` : 서버 전송용 전체 주소 문자열 생성 함수
 */
export const useAddressForm = (initialData?: AddressInitialData) => {
  const [address, setAddress] = useState<string>(() => parseAddress(initialData?.address).main);
  const [detailAddress, setDetailAddress] = useState<string>(
    () => parseAddress(initialData?.address).detail
  );
  const [addressError, setAddressError] = useState<string>('');

  const updateAddress = (newAddress: string) => {
    setAddress(newAddress);

    if (newAddress.trim()) {
      setAddressError('');
    }
  };

  const updateDetailAddress = (newDetail: string) => {
    setDetailAddress(newDetail);
  };

  const isAddressValid = address.trim() !== '';

  /** * 유효성 검사 함수
   * @param passedAddress - 외부에서 즉시 검증하고 싶은 값
   */
  const validateAddress = (passedAddress?: string) => {
    const targetAddress = typeof passedAddress === 'string' ? passedAddress : address;

    const error = isRequired(targetAddress, VALIDATION_MESSAGES.ADDRESS.REQUIRED);

    setAddressError(error);
    return !error;
  };

  /** 서버 전송용 데이터 포맷 함수 */
  const getFullAddressForSubmit = () => {
    if (!address.trim()) {
      return '';
    }

    return detailAddress.trim() ? `${address} | ${detailAddress}` : address;
  };

  return {
    address,
    detailAddress,
    addressError,
    setAddress: updateAddress,
    setDetailAddress: updateDetailAddress,
    validateAddress,
    isAddressValid,
    getFullAddressForSubmit,
  };
};
