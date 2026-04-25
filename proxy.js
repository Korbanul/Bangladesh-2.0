import { NextResponse } from 'next/server'
export function proxy(request) {
 
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const isPublicpath = pathname === "/auth/login" || pathname === "/auth/signup";

  const getRoles = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // extracting the Payload part from jwt and atob decodes a Base64 encoded string into a binary string lastly convert into JS object
      return payload?.roles ?? [];   // ["ROLE_ADMIN"] or ["ROLE_USER"]
    } catch {
      return [];
    }
  };

  if (!isPublicpath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (isPublicpath && token) { // user loggedIn and publicpath then rediect to /admin/dashboard if Roles is Admin else redirect to /user/dashboard
    const roles = getRoles(token);
    if (roles.includes("ROLE_ADMIN")) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/user/dashboard', request.url))
  }

}



export const config = {
  matcher: [
    "/auth/:any*"
    , "/user/:any*"
    , "/admin/:any*"

  ]
}