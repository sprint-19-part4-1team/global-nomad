import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Input from '@/shared/components/input/Input';

/**
 * Input 컴포넌트 스토리 가이드
 *
 * Input은 Label, Input field, Error message를 포함한 완전한 form input 컴포넌트입니다.<br/>
 * variant prop에 따라 로그인/회원가입용('authForm')과 체험 등록/수정용('form')으로 구분됩니다.
 *
 * ### 주요 특징
 * - authForm/form 두 가지 variant로 사용 목적에 따른 스타일 분리
 * - 비밀번호 타입(type='password')일 경우 표시/숨기기 토글 버튼 자동 추가
 * - 숫자 타입(type='number')일 경우 천단위 콤마 자동 포맷팅 (내부적으로 text 타입으로 변환)
 * - 주소 관련 input(name 또는 autoComplete에 'address' 포함)일 경우 검색 아이콘 자동 표시
 * - errorMessage prop을 통한 유효성 검사 에러 표시 (빨간색 테두리 + 하단 메시지)
 * - disabled 속성을 통한 Input 비활성화 지원
 * - autoComplete 속성을 통한 브라우저 자동완성 제어
 * - label, placeholder를 통한 명확한 사용자 가이드 제공
 * - 접근성을 위한 고유 ID 자동 생성
 * - divClassName, inputClassName을 통한 커스텀 스타일링 지원
 *
 * ### Props 설명
 * - `variant`: Input을 사용할 위치 ('authForm'|'form')
 * - `divClassName`: Input 컨테이너 div에 적용할 추가 CSS 클래스 (선택사항)
 * - `label`: Input의 label 텍스트
 * - `inputClassName`: Input 요소에 적용할 추가 CSS 클래스 (선택사항)
 * - `name`: form 제출 시 사용될 Input의 name (주소 관련은 'address' 포함 시 검색 아이콘 표시)
 * - `type`: Input의 타입 (text, email, password, number 등)
 *   - password: 표시/숨기기 토글 버튼 자동 추가
 *   - number: 천단위 콤마 포맷팅 자동 적용, 내부적으로 text로 변환
 * - `autoComplete`: 브라우저 자동완성 동작 제어 ('address' 포함 시 검색 아이콘 표시) (선택사항, 기본은 'off')
 * - `disabled`: Input 비활성화 여부 (선택사항)
 * - `value`: Input의 현재 값 (string 또는 number)
 * - `onChange`: 값 변경 이벤트 핸들러 (선택사항)
 *   - number 타입의 경우 콤마가 제거된 순수 숫자 문자열 전달
 * - `placeholder`: Input의 placeholder 텍스트 (선택사항)
 * - `onClick`: Input 컨테이너(div) 클릭 이벤트 핸들러 (선택사항, 주소 검색 팝업 등에 활용)
 * - `errorMessage`: 에러 발생 시 표시될 메시지 (선택사항, 존재하면 빨간색 테두리와 함께 하단에 표시)
 */

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className='w-400'>
        {args.value ? (
          <Input {...args} />
        ) : (
          <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        )}
      </div>
    );
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['authForm', 'form'],
      description:
        "Input를 사용할 위치 ('authForm': 로그인 / 회원가입 등 유저 관련 폼 | 'form': 체험 등록 / 수정 폼)",
    },
    divClassName: {
      control: 'text',
      description: 'Input 컨테이너 div에 적용할 추가 CSS 클래스',
    },
    label: {
      control: 'text',
      description: 'Input의 label 텍스트',
    },
    inputClassName: {
      control: 'text',
      description: 'Input 요소에 적용할 추가 CSS 클래스',
    },
    name: {
      control: 'text',
      description:
        "form 제출 시 사용될 Input의 name (주소 관련 input은 'address' 포함 시 검색 아이콘 자동 표시)",
    },
    type: {
      control: 'text',
      description:
        'Input의 타입 (text, email, password, number 등) - password는 토글 버튼 추가, number는 콤마 포맷팅 적용',
    },
    autoComplete: {
      control: 'select',
      options: [
        'email',
        'nickname',
        'current-password',
        'new-password',
        'street-address',
        'transaction-amount',
        'off',
      ],
      description: "브라우저 자동완성 동작 제어 ('address' 포함 시 검색 아이콘 자동 표시)",
    },
    disabled: {
      control: 'boolean',
      description: 'Input 비활성화 여부',
    },
    value: {
      control: 'text',
      description: 'Input의 현재 값 (string 또는 number)',
    },
    onChange: {
      action: 'changed',
      description: '값 변경 이벤트 핸들러 (number 타입의 경우 콤마가 제거된 순수 숫자 문자열 전달)',
    },
    placeholder: {
      control: 'text',
      description: 'Input의 placeholder 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: 'Input 컨테이너(div) 클릭 이벤트 핸들러 (주소 검색 팝업 등에 활용)',
    },
    errorMessage: {
      control: 'text',
      description: '에러 발생 시 표시될 메시지 (존재하면 빨간색 테두리와 함께 하단에 표시)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * 기본 상태 (이메일 입력)
 *
 * 로그인 및 회원가입 페이지에서 사용되는 기본 이메일 Input입니다. <br/>
 * authForm variant를 사용하며, 이메일 자동완성이 활성화되어 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'authForm',
    label: '이메일',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    placeholder: '이메일을 입력해 주세요.',
  },
};

/**
 * 비밀번호 입력
 *
 * 로그인 및 회원가입 페이지에서 사용되는 비밀번호 Input입니다. <br/>
 * 비밀번호 타입(type='password')을 사용하며, 자동으로 표시/숨기기 토글 버튼이 추가됩니다. <br/>
 * 토글 버튼을 클릭하여 비밀번호를 표시하거나 숨길 수 있습니다.
 */
export const Password: Story = {
  args: {
    variant: 'authForm',
    label: '비밀번호',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: '비밀번호를 입력해 주세요.',
  },
};

/**
 * 체험 제목 입력 (체험 등록/수정용)
 *
 * 체험 등록 및 수정 페이지에서 사용되는 제목 Input입니다. <br/>
 * form variant를 사용하며, 일반 텍스트 입력이 가능합니다.
 */
export const FormTitleInput: Story = {
  args: {
    variant: 'form',
    label: '제목',
    name: 'title',
    type: 'text',
    placeholder: '제목을 입력해 주세요.',
  },
};

/**
 * 체험 가격 입력 (체험 등록/수정용)
 *
 * 체험 등록 및 수정 페이지에서 사용되는 가격 Input입니다. <br/>
 * number 타입을 사용하여 숫자만 입력 가능하며, 천단위 콤마가 자동으로 포맷팅됩니다. <br/>
 * 예: 1000 입력 시 "1,000"으로 표시되고, onChange에는 "1000"이 전달됩니다.
 *
 * 내부적으로 text 타입으로 변환되어 콤마 포맷팅이 가능하며,
 * 숫자가 아닌 문자 입력은 자동으로 차단됩니다.
 */
export const FormPriceInput: Story = {
  args: {
    variant: 'form',
    label: '가격 (원)',
    name: 'price',
    type: 'number',
    placeholder: '체험 금액을 입력해 주세요.',
  },
};

/**
 * 체험 주소 입력 (체험 등록/수정용) 컴포넌트
 *
 * 읽기 전용 주소 Input으로, 클릭 시 주소 검색 팝업을 통해 주소를 선택할 수 있습니다. <br/>
 * name에 'address'가 포함되어 검색 아이콘이 자동으로 표시되며, 접근성을 위한 aria 속성이 적용되어 있습니다.
 */
const FromAddressInputComponent = () => {
  const [addressValue, setAddressValue] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddressClick = () => {
    setIsPopupOpen(true);
    // 실제로는 여기서 다음 우편번호 서비스 등을 호출
    alert('주소 검색 팝업 열기');
  };

  return (
    <Input
      variant='form'
      label='주소'
      name='address'
      type='text'
      autoComplete='street-address'
      value={addressValue}
      onChange={(e) => setAddressValue(e.target.value)}
      placeholder='우편 번호 검색'
      onClick={handleAddressClick}
      readOnly
      aria-expanded={isPopupOpen}
      aria-haspopup='dialog'
      aria-controls='address-popup'
      aria-readonly='true'
    />
  );
};

/**
 * 체험 주소 입력 (체험 등록/수정용)
 *
 * 체험 등록 및 수정 페이지에서 사용되는 주소 Input입니다. <br/>
 * name 또는 autoComplete에 'address'가 포함되어 있어 검색 아이콘이 자동으로 표시됩니다. <br/>
 * onClick 핸들러를 통해 주소 검색 팝업(예: 다음 우편번호 서비스)을 연동할 수 있습니다.
 *
 */
export const FormAddressInput: Story = {
  render: () => <FromAddressInputComponent />,
};

/**
 * 비활성화된 이메일 Input
 *
 * Input이 비활성화된 상태의 예시입니다. <br/>
 * disabled prop이 true일 경우, 회색 배경과 함께 사용자 입력이 불가능합니다. <br/>
 * 이미 확정된 값이나 수정 불가능한 정보를 표시할 때 사용합니다.
 */
export const DisabledEmail: Story = {
  args: {
    variant: 'authForm',
    label: '이메일',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    disabled: true,
    value: 'test@test.com',
  },
};

/**
 * 에러 메시지 표시 컴포넌트
 *
 * authForm과 form 두 가지 variant에서 에러 메시지가 표시되는 방식을 비교하는 예시 컴포넌트입니다. </br>
 * errorMessage prop이 전달되면 Input에 빨간색 테두리가 적용되고 하단에 에러 메시지가 표시됩니다.
 */
const DisplayErrorComponent = () => {
  // 닉네임 Input의 상태
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState('');

  // 제목 Input의 상태
  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState('');

  // 닉네임 유효성 검증 함수
  const validateNickname = (value: string) => {
    if (value.trim() === '') {
      setNameError('닉네임을 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  // 제목 유효성 검증 함수
  const validateTitle = (value: string) => {
    if (value.trim() === '') {
      setTitleError('제목을 입력해주세요.');
    } else {
      setTitleError('');
    }
  };

  return (
    <div className='flex gap-40'>
      <div className='flex w-400 flex-col gap-10 rounded-10 border p-10'>
        <div>authForm의 에러 표시 예시</div>
        <hr />
        <Input
          variant='authForm'
          label='닉네임'
          name='nickname'
          type='text'
          autoComplete='nickname'
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
            setNameError(''); // 입력 중에는 에러 초기화
          }}
          onBlur={(e) => validateNickname(e.target.value)} // 포커스 벗어날 때 검증
          placeholder='닉네임을 입력해주세요.'
          errorMessage={nameError}
        />
      </div>
      <div className='flex w-400 flex-col gap-10 rounded-10 border p-10'>
        <div>form의 에러 표시 예시</div>
        <hr />
        <Input
          variant='form'
          label='제목'
          name='title'
          type='text'
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value);
            setTitleError(''); // 입력 중에는 에러 초기화
          }}
          onBlur={(e) => validateTitle(e.target.value)} // 포커스 벗어날 때 검증
          placeholder='제목을 입력해주세요.'
          errorMessage={titleError}
        />
      </div>
    </div>
  );
};

/**
 * 에러 메시지 표시 예시
 *
 * Input 컴포넌트의 에러 표시 기능을 보여주는 스토리입니다. <br/>
 * errorMessage prop을 전달하면 Input에 빨간색 테두리가 적용되고, 하단에 에러 메시지가 표시됩니다. <br/>
 * authForm과 form 두 가지 variant에서 에러가 어떻게 표시되는지 나란히 비교할 수 있습니다. <br/>
 *
 * 유효성 검사 실패 시 사용자에게 명확한 피드백을 제공하는 데 활용됩니다.
 */
export const DisplayError: Story = {
  render: () => <DisplayErrorComponent />,
};
