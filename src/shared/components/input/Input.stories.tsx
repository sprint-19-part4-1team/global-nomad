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
 * - 비밀번호 타입일 경우 표시/숨기기 토글 버튼 자동 추가
 * - errorMessage prop을 통한 유효성 검사 에러 표시
 * - autoComplete 속성을 통한 브라우저 자동완성 제어
 * - label, placeholder를 통한 명확한 사용자 가이드 제공
 *
 * ### Props 설명
 * - `variant`: Input을 사용할 위치 ('authForm'|'form')
 * - `label`: Input의 label 텍스트
 * - `subLabel`: Input의 부가 설명 텍스트 (선택사항)
 * - `name`: form 제출 시 사용될 Input의 name
 * - `type`: Input의 타입 (text, email, password, number 등)
 * - `autoComplete`: 브라우저 자동완성 동작 제어 (선택사항, 기본은 'off')
 * - `value`: Input의 현재 값
 * - `onChange`: 값 변경 이벤트 핸들러
 * - `placeholder`: Input의 placeholder 텍스트
 * - `onClick`: Input 컨테이너 클릭 이벤트 핸들러 (선택사항)
 * - `errorMessage`: 에러 발생 시 표시될 메시지 (선택사항)
 */

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className='w-400'>
        <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
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
    label: {
      control: 'text',
      description: 'Input의 label 텍스트',
    },
    name: {
      control: 'text',
      description: 'form 제출 시 사용될 Input의 name',
    },
    type: {
      control: 'text',
      description: 'Input의 타입 (text, email, password 등)',
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
      description: '브라우저 자동완성 동작 제어',
    },
    value: {
      control: 'text',
      description: 'Input의 현재 값 (string 또는 number)',
    },
    onChange: {
      action: 'changed',
      description: '값 변경 이벤트 핸들러',
    },
    placeholder: {
      control: 'text',
      description: 'Input의 placeholder 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: 'Input 컨테이너 클릭 이벤트 핸들러',
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
 * 로그인 및 회원가입 페이지에서 사용되는 기본 이메일 Input입니다.
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
 * 로그인 및 회원가입 페이지에서 사용되는 비밀번호 Input입니다.
 * 비밀번호 타입을 사용하며, 자동으로 표시/숨기기 토글 버튼이 추가됩니다.
 */
export const Password: Story = {
  args: {
    variant: 'authForm',
    label: '비밀번호',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: '비밀번호을 입력해 주세요.',
  },
};

/**
 * 체험 제목 입력 (체험 등록/수정용)
 *
 * 체험 등록 및 수정 페이지에서 사용되는 제목 Input입니다.
 * form variant를 사용합니다.
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
 * 체험 등록 및 수정 페이지에서 사용되는 가격 Input입니다.
 * number 타입을 사용하여 숫자만 입력 가능합니다.
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
 * 에러 메시지 표시
 *
 * 두 가지 variant(authForm, form)에서 에러 메시지가 표시되는 예시입니다.
 * 각 Input은 독립적인 상태를 가지며, 에러 메시지가 있을 때 테두리 색상이 빨간색으로 변경됩니다.
 */
export const DisplayError: Story = {
  render: () => {
    // 독립적인 상태 관리를 위한 컴포넌트
    const Component = () => {
      // 닉네임 Input의 상태
      const [nameValue, setNameValue] = useState('');
      // 제목 Input의 상태
      const [titleValue, setTitleValue] = useState('');

      return (
        <div className='flex gap-40'>
          <div className='flex w-400 flex-col gap-10 rounded-10 border p-10'>
            <div>authForm의 에러 표시 예시</div>
            <hr />
            <Input
              variant='authForm'
              label='닉네임 '
              name='nickname'
              type='text'
              autoComplete='nickname'
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder='닉네임을 입력해주세요.'
              errorMessage='닉네임 형식을 확인해 주세요.'
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
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder='제목을 입력해주세요.'
              errorMessage='제목을 입력해주세요.'
            />
          </div>
        </div>
      );
    };

    return <Component />;
  },
};
