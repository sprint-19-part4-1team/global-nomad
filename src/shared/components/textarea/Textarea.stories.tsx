import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Textarea from '@/shared/components/textarea/Textarea';

/**
 * Textarea 컴포넌트 스토리 가이드
 *
 * Textarea는 최대 글자 수 제한과 글자 수 카운터가 포함된 텍스트 입력 영역 컴포넌트입니다.<br/>
 * variant prop에 따라 체험 등록/수정용('form')과 리뷰 작성용('review')으로 구분됩니다.
 *
 * ### 주요 특징
 * - form/review 두 가지 variant로 사용 목적에 따른 스타일 분리
 * - maxLength를 통한 입력 글자 수 제한 및 카운터 표시
 * - errorMessage prop을 통한 유효성 검사 에러 표시
 * - label, placeholder를 통한 명확한 사용자 가이드 제공
 *
 * ### Props 설명
 * - `variant`: Textarea를 사용할 위치 ('form'|'review')
 * - `label`: 텍스트 영역의 label 텍스트
 * - `name`: form 제출 시 사용될 텍스트 영역의 name
 * - `placeholder`: 텍스트 영역의 placeholder 텍스트
 * - `value`: 텍스트 영역의 현재 값
 * - `onChange`: 텍스트 변경 이벤트 핸들러
 * - `onBlur`: 텍스트 영역에서 포커스가 벗어날 때 실행되는 이벤트 핸들러 (선택)
 * - `maxLength`: 텍스트 영역에 입력 가능한 최대 글자 수
 * - `errorMessage`: 에러 발생 시 표시될 메시지 (선택)
 */

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  render: (args) => {
    const [value, setValue] = useState('');
    const [textError, setTextError] = useState('');

    const validateText = (value: string) => {
      if (value.trim() === '') {
        setTextError('설명을 입력해 주세요.');
      } else {
        setTextError('');
      }
    };

    return (
      <div className='w-400'>
        {args.errorMessage ? (
          <Textarea
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => validateText(e.target.value)}
            errorMessage={textError}
          />
        ) : (
          <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        )}
      </div>
    );
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['form', 'review'],
      description: "Textarea를 사용할 위치 ('form': 체험 등록/수정용 | 'review': 리뷰 작성용)",
    },
    label: {
      control: 'text',
      description: '텍스트 영역의 label 텍스트',
    },
    name: {
      control: 'text',
      description: 'form 제출 시 사용될 텍스트 영역의 name',
    },
    placeholder: {
      control: 'text',
      description: '텍스트 영역의 placeholder 텍스트',
    },
    value: {
      control: 'text',
      description: '텍스트 영역의 현재 값',
    },
    onChange: {
      action: 'changed',
      description: '텍스트 변경 이벤트 핸들러',
    },
    onBlur: {
      action: 'blurred',
      description:
        '텍스트 영역에서 포커스가 벗어날 때 실행되는 이벤트 핸들러 (주로 유효성 검사나 입력 완료 시점의 처리에 활용)',
    },
    maxLength: {
      control: 'number',
      description: '텍스트 영역에 입력 가능한 최대 글자 수',
    },
    errorMessage: {
      control: 'text',
      description: '에러 발생 시 표시될 메시지 (선택사항)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * 기본 상태 (체험 등록/수정용)
 *
 * 체험 등록 및 수정 페이지에서 사용되는 기본 Textarea입니다.
 * 최대 1000자까지 입력 가능합니다.
 */
export const Default: Story = {
  args: {
    variant: 'form',
    label: '설명',
    name: 'content',
    placeholder: '체험에 대한 설명을 입력해 주세요.',
    maxLength: 1000,
  },
};

/**
 * 리뷰 작성용
 *
 * 리뷰 작성 페이지에서 사용되는 Textarea입니다.
 * 최대 100자까지 입력 가능합니다.
 */
export const Review: Story = {
  args: {
    variant: 'review',
    label: '소중한 경험을 들려주세요',
    name: 'comment',
    placeholder: '체험에서 느낀 경험을 자유롭게 남겨주세요.',
    maxLength: 100,
  },
};

/**
 * 에러 메시지 표시 컴포넌트
 *
 * errorMessage prop이 전달되면 Textarea에 빨간색 테두리가 적용되고 하단에 에러 메시지가 표시됩니다.
 */
const WithErrorComponent = () => {
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');

  const validateText = (value: string) => {
    if (value.trim() === '') {
      setTextError('설명을 입력해 주세요.');
    } else {
      setTextError('');
    }
  };

  return (
    <div className='w-400'>
      <Textarea
        variant='form'
        label='설명'
        name='content'
        placeholder='체험에 대한 설명을 입력해 주세요.'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => validateText(e.target.value)}
        maxLength={1000}
        errorMessage={textError}
      />
    </div>
  );
};

/**
 * 에러 메시지 표시
 *
 * Textarea 컴포넌트의 에러 표시 기능을 보여주는 스토리입니다. <br/>
 * errorMessage prop을 전달하면 Textarea에 빨간색 테두리가 적용되고, 하단에 에러 메시지가 표시됩니다.
 *
 * 유효성 검사 실패 시 사용자에게 명확한 피드백을 제공하는 데 활용됩니다.
 */
export const WithError: Story = {
  render: () => <WithErrorComponent />,
};
