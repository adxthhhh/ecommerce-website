import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing. Skipping session update.');
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route protection
  const url = request.nextUrl.clone();

  if (user) {
    // Get user role from public.users via a direct fetch or custom claim
    // For now, let's assume we fetch from public.users or use metadata
    // The user's metadata is the fastest way if we sync it
    const role = user.app_metadata?.role || user.user_metadata?.role || 'CUSTOMER';

    if (url.pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (url.pathname.startsWith('/delivery') && role !== 'DELIVERY_BOY') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Redirect logged in users away from login/signup
    if (url.pathname.startsWith('/login') || url.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // Not logged in
    if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/delivery') || url.pathname.startsWith('/checkout')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}
