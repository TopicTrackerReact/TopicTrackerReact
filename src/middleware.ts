import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: ['/home', '/flashcards']
};

export function middleware(req: NextRequest) {

  // GET COOKIES FROM CLIENT THAT MATCH ('tta-session)
  const cookieSession = req.cookies?.get('tta-session');

  if (cookieSession) {

    const response = NextResponse.next();
    response.cookies.set({
      name: 'tta-session',
      value: cookieSession.value,
      secure: true,
      maxAge: 60,
    });
    return response;

  }
  else return NextResponse.redirect(new URL('/login', req.url));

  // if (req.nextUrl.pathname.startsWith('/home') || req.nextUrl.pathname.startsWith('/flashcards')) {

  //   if (cookieSession) return NextResponse.next();
  //   else return NextResponse.redirect(new URL('/login', req.url));
  // }

}

