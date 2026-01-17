import { useRef } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { toast } from 'react-toastify';
import { useAddressForm } from '@/features/activity-form/common/hooks/useAddressForm';
import Input from '@/shared/components/input/Input';

/** 다음 주소 검색 API 스크립트 URL */
const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface AddressSectionProps {
  /**
   * useBasicInfoForm의 리턴 타입
   * address - 선택된 기본 주소 (우편번호 + 주소 문자열)
   * setAddress - 기본 주소 상태 업데이트 함수
   * detailAddress - 상세 주소 (동/건물명 등)
   * setDetailAddress - 상세 주소 상태 업데이트 함수
   * addressError - 주소 유효성 검사 실패 시 표시할 에러 메시지
   * validateAddress - 주소 필수값 유효성 검사 함수
   */
  addressInfo: ReturnType<typeof useAddressForm>;
}

/**
 * ## AddressField
 *
 * @description
 * - 다음(카카오) 주소 검색 API를 활용하여
 * 기본 주소 + 상세 주소 입력을 처리하는 폼 필드 컴포넌트입니다.
 * - 주소 검색 API 오류 발생 시 토스트 메시지를 통해 사용자에게 안내합니다.
 */
export default function AddressSection({ addressInfo }: AddressSectionProps) {
  const { address, setAddress, detailAddress, setDetailAddress, addressError, validateAddress } =
    addressInfo;

  const isPopupOpen = useRef(false);
  const open = useDaumPostcodePopup(SCRIPT_URL);

  const handleComplete = (data: Address) => {
    const { zonecode, address, bname, buildingName, addressType } = data;

    let autoDetailAddress = '';

    // 도로명 주소(R)인 경우에만 부가 정보 자동 생성
    if (addressType === 'R') {
      const addrDetails = [bname, buildingName].filter(Boolean);
      autoDetailAddress = addrDetails.length > 0 ? `${addrDetails.join(', ')}` : '';
    }

    const fullAddress = `[${zonecode}] ${address}`;

    setAddress(fullAddress);
    setDetailAddress(autoDetailAddress);

    validateAddress(fullAddress);

    isPopupOpen.current = false;
  };

  const handleClick = () => {
    if (isPopupOpen.current) {
      return;
    }

    isPopupOpen.current = true;
    open({
      onComplete: handleComplete,
      onClose: () => {
        if (isPopupOpen.current) {
          validateAddress(address);
        }
        isPopupOpen.current = false;
      },
      onError: () => {
        toast.error(
          <>
            현재 주소 검색 서비스를 이용할 수 없습니다. <br />
            잠시 후 다시 시도해주세요.
          </>
        );
        isPopupOpen.current = false;
      },
    });
  };

  return (
    <fieldset className='flex flex-col gap-16'>
      <legend className='sr-only'>주소 입력</legend>
      <Input
        name='address'
        divClassName='cursor-pointer'
        className='w-full cursor-pointer outline-0'
        readOnly
        type='text'
        variant='form'
        label='주소'
        value={address}
        placeholder='주소를 검색해 주세요.'
        onClick={handleClick}
        errorMessage={addressError}
      />
      {address && (
        <Input
          variant='form'
          labelClassName='sr-only'
          label='상세 주소'
          autoComplete='street-address'
          name='detail-address'
          type='text'
          placeholder='상세주소를 입력해 주세요.'
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      )}
    </fieldset>
  );
}
