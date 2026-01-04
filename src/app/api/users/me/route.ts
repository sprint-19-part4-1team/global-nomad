import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { UpdateUserBodyDto, UserServiceResponseDto } from '@/shared/types/user';

export const GET = createAuthorizedRoute(async ({ accessToken }) => {
  return proxy<UserServiceResponseDto>('/users/me', { method: 'GET' }, accessToken);
});

export const PATCH = createAuthorizedRoute<UpdateUserBodyDto>(async ({ accessToken, body }) => {
  return proxy<UserServiceResponseDto, UpdateUserBodyDto>(
    '/users/me',
    { method: 'PATCH', body },
    accessToken
  );
});
