import { cva } from 'class-variance-authority';

export const layoutContainer = cva('mx-auto w-full', {
  variants: {
    maxWidth: {
      640: 'max-w-640',
      700: 'max-w-700',
      980: 'max-w-980',
      1200: 'max-w-1200',
    },

    paddingX: {
      default: 'px-24',
      noneOnSm: 'px-24 sm:px-0',
      wide: 'px-24 sm:px-30 md:px-40',
      customSm32: 'px-24 sm:px-32 lg:px-0',
      lgOnlyNone: 'px-24 lg:px-0',
    },

    paddingTop: {
      sm: 'pt-60 sm:pt-140',
      md: 'pt-68 sm:pt-80 lg:pt-100',
      lg: 'pt-80 sm:pt-120 lg:pt-128',
    },
  },
});
