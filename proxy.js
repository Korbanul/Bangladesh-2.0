import { NextResponse } from 'next/server'

export function proxy(request) {
    const pathname=request.nextUrl.pathname;
    const token=request.cookies.get("token")?.value;
    const isPublicpath= pathname==="/auth/login" || pathname==="/auth/signup";
    
    if(!isPublicpath && !token){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if(isPublicpath && token){
        return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }
 
}



export const config = {
  matcher: [
    "/auth/:any*" 
    ,"/user/:any*" 
    ,"/admin/:any*"

  ]
}