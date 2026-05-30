import { cva } from 'class-variance-authority';
import Icons from '@/assets/icons';

const carouselButtonVariants = cva(
  'hidden sm:flex group absolute top-1/2 -mt-27 z-1 flex h-54 w-54 items-center justify-center rounded-full border border-[#b3b3b3] bg-white duration-300',
  {
    variants: {
      direction: {
        next: '-right-27',
        prev: '-left-27',
      },
      disabled: {
        true: 'pointer-events-none opacity-0',
        false: 'hover:border-gray-400 hover:shadow-sm cursor-pointer',
      },
    },
  }
);

type Direction = 'prev' | 'next';

interface CarouselButtonProps {
  direction: Direction;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function CarouselButton({ direction, onClick, disabled }: CarouselButtonProps) {
  const Icon = direction === 'prev' ? Icons.ArrowLeft : Icons.ArrowRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={carouselButtonVariants({
        direction,
        disabled,
      })}>
      <Icon className='w-24 text-gray-950 transition-colors duration-300 group-hover:text-primary-600' />
    </button>
  );
}
