import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const filterButtonVariants = cva(
  'filter-button cursor-pointer rounded-25 border px-13 py-10 body-14 transition duration-500 lg:body-16',
  {
    variants: {
      isActive: {
        true: 'border-gray-950 bg-gray-950 font-bold text-white',
        false: 'border-gray-100 bg-white font-medium text-gray-950',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

type FilterButtonProps = {
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
  onClick?: () => void;
};

export default function FilterButton({
  children,
  isActive,
  className = '',
  onClick,
}: FilterButtonProps) {
  return (
    <button onClick={onClick} className={cn(filterButtonVariants({ isActive }), className)}>
      {children}
    </button>
  );
}
