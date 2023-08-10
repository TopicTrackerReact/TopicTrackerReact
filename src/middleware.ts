import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/home', '/flashcards']
};

export function middleware(req: NextRequest) {

  // GET COOKIES FROM CLIENT THAT MATCH ('tta-session)
  const cookieSession = req.cookies?.get('tta-session');

  if (cookieSession) return NextResponse.next();
  else return NextResponse.redirect(new URL('/login', req.url));

}

