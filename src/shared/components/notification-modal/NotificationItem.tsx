import Icons from '@/assets/icons';
import { getTimeAgo } from '@/shared/utils/getTimeAgo';

export type NotificationStatus = 'confirmed' | 'declined';
export interface Notification {
  id: number;
  title: string;
  updatedAt: string;
  date: string;
  status: NotificationStatus;
}
/**
 * NotificationItem 컴포넌트에서 사용하는 props
 */
export interface NotificationItemProps extends Notification {
  /** 해당 알림을 삭제할 때 호출되는 콜백 */
  onDelete: () => void;
}

const STATUS_OPTIONS = {
  confirmed: {
    label: '승인',
    color: 'text-primary-500',
  },
  declined: {
    label: '거절',
    color: 'text-red-500',
  },
} as const;

/**
 * 단일 알림 아이템을 표시하는 컴포넌트
 *
 * - 알림 상태(승인/거절)에 따른 텍스트 및 색상 표시
 * - 알림 발생 시간 표시
 * - 개별 알림 삭제 버튼 제공
 *
 * 삭제 로직은 상위 컴포넌트에서 주입받은 onDelete를 통해 처리
 */
export default function NotificationItem({
  title,
  date,
  updatedAt,
  status,
  onDelete,
}: NotificationItemProps) {
  const { label, color } = STATUS_OPTIONS[status];

  return (
    <div className='border-t border-gray-50 p-16'>
      <div className='mb-8 flex items-center justify-between'>
        <div className='body-14 font-bold'>예약 {label}</div>
        <div className='flex items-center gap-12'>
          <div className='body-12 font-medium text-gray-400'>{getTimeAgo(updatedAt)}</div>
          <button
            type='button'
            aria-label='알림 삭제'
            className='cursor-pointer'
            onClick={onDelete}>
            <Icons.Trash className='h-24 w-24 text-gray-300' />
          </button>
        </div>
      </div>
      <div className='body-14 font-normal text-gray-800'>
        <div>{title}</div>
        <div>({date})</div>
        <div>
          예약이 <span className={`font-semibold ${color}`}>{label}</span> 되었어요
        </div>
      </div>
    </div>
  );
}
