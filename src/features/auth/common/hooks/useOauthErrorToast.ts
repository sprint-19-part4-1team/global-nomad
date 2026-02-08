import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '@/shared/stores/userStore';

export default function useOauthErrorToast() {
  const oauthError = useUserStore((state) => state.oauthError);
  const clearOAuthError = useUserStore((state) => state.clearOAuthError);

  useEffect(() => {
    if (oauthError) {
      toast.error(oauthError);
      clearOAuthError();
    }
  }, [oauthError, clearOAuthError]);
}
