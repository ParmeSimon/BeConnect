import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// ... imports ...

export default withAuth(
    function middleware(req) {
      const token = req.nextauth.token;
      const path = req.nextUrl.pathname;
  
      if ((path === '/' || path === '/auth/login') && token) {
        const roles = token.roles || [];
  
        if (roles.includes('ROLE_ADMIN')) {
          return NextResponse.redirect(new URL('/admin/', req.url));
        }
        if (roles.includes('ROLE_COMPANY')) {
          return NextResponse.redirect(new URL('/company/', req.url));
        }
        if (roles.includes('ROLE_USER')) {
          return NextResponse.redirect(new URL('/student/', req.url));
        }
        
        // Optionnel : redirection par défaut si aucun rôle ne correspond
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
  
      // 2. Le reste de ton code (protection des routes)...
    },
    {
      callbacks: {
        authorized: ({ req, token }) => {
          // Autoriser l'accès aux pages publiques
          if (req.nextUrl.pathname.startsWith('/auth/')) return true;
          
          // Autoriser si le token existe
          return !!token;
        }
      }
    }
  )

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}