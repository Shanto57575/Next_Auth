import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;

    const isPublic = ['/', '/login', '/signup', '/verifyemail', '/forgotpassword', '/resetpassword'].includes(path);
    const token = request.cookies.get('token')?.value || "";

    if (isPublic && token && path !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublic && !token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next(); 
  } catch (error: any) {
    console.log(error.message);
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword',
  ]
};