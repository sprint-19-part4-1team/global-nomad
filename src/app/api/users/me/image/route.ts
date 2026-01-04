import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { CreateProfileImageUrlResponse } from '@/shared/types/user';

export const POST = createAuthorizedRoute<File>(async ({ accessToken, body }) => {
  return proxy<CreateProfileImageUrlResponse>(
    '/users/me/image',
    { method: 'POST', body },
    accessToken
  );
});
