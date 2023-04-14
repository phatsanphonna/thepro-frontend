import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const handleRedirect = async () => {
    await fetch(process.env.NEXT_PUBLIC_URL + '/api/auth/signout', {
      credentials: 'include',
      headers: {
        Cookie: request.headers.get('Cookies') as string
      }
    })
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  const url = request.nextUrl.clone()
  const accessToken = request.cookies.get('accessToken');
  const cookie = request.headers.get('cookie')

  if (!accessToken) return await handleRedirect()

  const response = await fetch(
    process.env.NEXT_PUBLIC_URL + '/api/auth/verify', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: cookie as string
    }
  })
  const { status } = await response.json()
  
  if (!status) return await handleRedirect()
  else return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/assignment/:path*',
    '/me'
  ],
}
