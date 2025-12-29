import { cva } from 'class-variance-authority';

export const tabItemVariants = cva(
  'grow px-2 pt-8 pb-6 sm:px-14 sm:py-8 text-center body-14 sm:body-16',
  {
    variants: {
      state: {
        active: 'text-primary-500 font-bold border-b-2 border-primary-500',
        inactive: 'text-gray-500 font-medium hover:bg-gray-25 hover:rounded-8',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  }
);
