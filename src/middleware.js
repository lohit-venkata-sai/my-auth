import { NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;
    const isPublicPath = path==='/login' || path ==='/signup';

    const token  = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile',request.nextUrl));
    }

    if(!isPublicPath && !token){
        return  NextResponse.redirect(new URL('/login',request.nextUrl));
    }
    return NextResponse.next();
}

export const config={
    matcher : [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:id*'
    ]
}