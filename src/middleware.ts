import { NextRequest, NextResponse } from 'next/server';
// import { AUTH_COOKIE_KEYS } from '@/shared/constants';

const PROTECTED_ROUTE_RULES = {
  ACTIVITY: ['/activity/new', /^\/activity\/[^/]+\/edit$/],
  MYPAGE: [/^\/mypage(\/.*)?$/],
} as const;

const ALL_PROTECTED_RULES = Object.values(PROTECTED_ROUTE_RULES).flat();

const isProtectedPath = (pathname: string): boolean => {
  return ALL_PROTECTED_RULES.some((rule) =>
    typeof rule === 'string' ? pathname === rule : rule.test(pathname)
  );
};

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  // TODO: 리프레시 토큰 PR 머지되면 상수로 변경 AUTH_COOKIE_KEYS.ACCESS_TOKEN
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
