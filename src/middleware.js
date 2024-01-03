import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.user) {
    return res
  }

  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/signin'
  return NextResponse.redirect(redirectUrl)
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: '/menu/:path*',
}