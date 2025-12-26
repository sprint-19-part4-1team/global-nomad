import Icons from '@/assets/icons';

export type NotificationStatus = 'confirmed' | 'declined';
export interface Notification {
  id: number;
  title: string;
  updatedAt: string;
  date: string;
  status: NotificationStatus;
}
export interface NotificationItemProps extends Notification {
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

export default function NotificationItem({ title, date, status, onDelete }: NotificationItemProps) {
  const { label, color } = STATUS_OPTIONS[status];

  return (
    <div className='border-t border-gray-50 p-16'>
      <div className='mb-8 flex items-center justify-between'>
        <div className='body-14 font-bold'>예약 {label}</div>
        <div className='flex items-center gap-12'>
          {/* TODO: updatedAt 기준으로 시간 계산 로직 필요 */}
          <div className='body-12 font-medium text-gray-400'>1분 전</div>
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
