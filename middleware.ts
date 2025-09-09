import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const SUPPORTED = new Set(['en', 'de', 'nl'])

export function middleware(request: NextRequest) {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang')?.toLowerCase()

    if (lang && SUPPORTED.has(lang)) {
        const current = request.cookies.get(LOCALE_COOKIE)?.value
        if (current !== lang) {
            if (url.pathname !== '/home') {
                url.pathname = '/home'
            }
            const res = NextResponse.redirect(url)
            res.cookies.set(LOCALE_COOKIE, lang, { path: '/', maxAge: 60 * 60 * 24 * 365 })
            return res
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|eot)).*)',
    ],
}


