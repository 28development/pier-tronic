import { NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/app/i18n-request";

export async function POST(request: Request) {
    const { locale } = await request.json().catch(() => ({ locale: "en" }));
    const res = new NextResponse(null, { status: 204 });
    res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
}


