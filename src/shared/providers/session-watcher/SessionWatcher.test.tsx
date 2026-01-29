import { render } from '@testing-library/react';
import { toast } from 'react-toastify';
import SessionWatcher from '@/shared/providers/session-watcher/SessionWatcher';

jest.mock('@/shared/stores/userStore', () => ({
  useUserStore: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}));

const mockUseUserStore = require('@/shared/stores/userStore').useUserStore as jest.Mock;

describe('SessionWatcher 테스트', () => {
  it('로그인 상태에서 세션 만료로 로그아웃되면 toast를 띄운다', () => {
    // 로그인 상태
    mockUseUserStore.mockReturnValueOnce({
      user: { id: 1 },
      logoutReason: undefined,
    });

    // 세션 만료로 상태 변경
    mockUseUserStore.mockReturnValueOnce({
      user: undefined,
      logoutReason: 'expired',
    });

    // 상태 변경을 위해서 리렌더링
    const { rerender } = render(<SessionWatcher />);
    rerender(<SessionWatcher />);

    // 한번만 일어나야 할 때
    expect(toast.info).toHaveBeenCalledTimes(1);
  });

  it('logoutReason이 expired가 아니면 toast를 띄우지 않는다', () => {
    // 로그인 상태
    mockUseUserStore.mockReturnValueOnce({
      user: { id: 1 },
      logoutReason: undefined,
    });

    // 유저 자체 로그아웃으로 상태 변경
    mockUseUserStore.mockReturnValueOnce({
      user: undefined,
      logoutReason: 'user',
    });

    // 상태 변경을 위해서 리렌더링
    const { rerender } = render(<SessionWatcher />);
    rerender(<SessionWatcher />);

    // 행동이 일어나면 안될 때
    expect(toast.info).not.toHaveBeenCalled();
  });
});
