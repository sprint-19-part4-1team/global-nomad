import { cva, VariantProps } from 'class-variance-authority';
import { LinkProps } from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import ButtonBase from '@/shared/components/button/ButtonBase';
import LinkBase from '@/shared/components/button/LinkBase';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'cursor-pointer w-fit text-center font-semibold disabled:bg-gray-100 disabled:text-gray-25 disabled:cursor-default',
  {
    variants: {
      /**
       * ### position
       *
       * @description
       * Button의 스타일을 정의합니다.
       */
      theme: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary:
          'bg-white text-gray-800 border border-gray-300 hover:bg-primary-100 hover:border-primary-500 hover:text-primary-500',
        negative: 'bg-white border border-red-400 text-red-500 hover:bg-red-100',
      },
      /**
       * ### size
       *
       * @description
       * Button의 사이즈를 정의합니다.
       */
      size: {
        sm: 'px-12 py-6 rounded-12 body-13 sm:body-14',
        md: 'px-16 py-8 rounded-12 body-13 sm:body-14',
        lg: 'px-24 py-12 body-14 sm:body-16 rounded-14',
      },
      /**
       * ### full
       *
       * @description
       * Button의 width full-size 여부를 정의합니다.
       */
      full: {
        true: 'w-full',
      },
    },

    /**
     * ### defaultVariants
     *
     * @description
     * - 별도 지정이 없으면 `prmairy`, `lg` 적용
     */
    defaultVariants: {
      theme: 'primary',
      size: 'lg',
      full: false,
    },
  }
);

/** 공통(스타일 + children/className) */
type ButtonCommonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
};

/** button(action) 타입 */
type ButtonAsButton = ButtonCommonProps
  & Omit<ComponentProps<'button'>, 'className' | 'children'> & {
    href?: never;
  };

/** Link(navigation) 타입 */
type ButtonAsLink = ButtonCommonProps
  & Omit<ComponentProps<'a'>, 'className' | 'children' | 'href'> & {
    href: LinkProps['href'];
    onClick?: never;
    type?: never;
    disabled?: never;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * ## Button
 *
 * @description
 * - action(button)과 navigation(link)을 제공하는 버튼 컴포넌트입니다.
 * - `href`가 전달되면 Next.js `Link` 기반의 navigation 버튼으로,
 *   전달되지 않으면 HTML `<button>` 기반의 action 버튼으로 동작합니다.
 *
 * @param props
 * - 공통 스타일 props: `theme`, `size`, `full`
 * - 공통 UI props: `children`, `className`
 * - action 버튼: `<button>`이 지원하는 기본 props (`onClick`, `type`, `disabled` 등)
 * - navigation 버튼: `href` 및 `<a>` 태그가 지원하는 기본 props
 *
 * @example
 * ```tsx
 * // action button
 * 'use client'
 * <Button onClick={handleSubmit}>저장</Button>
 *
 * // submit button
 * <Button type="submit">제출</Button>
 *
 * // navigation button
 * <Button href="/profile">프로필</Button>
 *
 * // full width button
 * <Button full theme="secondary">전체 버튼</Button>
 * ```
 */
export default function Button(props: ButtonProps) {
  const { theme, size, full, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ theme, size, full }), className);

  if ('href' in rest && rest.href != null) {
    const { href, ...linkProps } = rest;

    return (
      <LinkBase href={href} className={classes} {...linkProps}>
        {children}
      </LinkBase>
    );
  }

  // 런타임 분기상 이 시점에서는 ButtonAsButton이 확정되므로
  // 유니온 타입을 해소하기 위해 명시적으로 타입 단언
  const { type = 'button', ...buttonProps } = rest as Omit<ButtonAsButton, keyof ButtonCommonProps>;

  return (
    <ButtonBase className={classes} type={type} {...buttonProps}>
      {children}
    </ButtonBase>
  );
}
