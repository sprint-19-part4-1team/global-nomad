import { LAYER } from '@/shared/components/overlay/constants/layer';

export default function Backdrop() {
  return <div className={`absolute h-dvh w-dvw bg-op-50 ${LAYER.backdrop}`} />;
}
