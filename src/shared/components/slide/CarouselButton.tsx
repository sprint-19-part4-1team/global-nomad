import Icons from '@/assets/icons';
import { carouselButtonVariants } from '@/shared/components/slide/PopularSlide';

type Direction = 'prev' | 'next';

interface CarouselButtonProps {
  direction: Direction;
  onClick: () => void;
  disabled: boolean;
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
