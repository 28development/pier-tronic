import { NextResponse } from "next/server";
import { getRequestLocale } from "@/app/i18n-request";
import { languages } from "@/app/i18n";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const ns = url.searchParams.get("ns") || "common";
    const langParam = url.searchParams.get("lang")?.toLowerCase();
    const locale = (langParam && (languages as readonly string[]).includes(langParam)) ? langParam : await getRequestLocale();
    const filePath = path.join(process.cwd(), "public", "locales", locale, `${ns}.json`);
    try {
        const raw = await fs.readFile(filePath, "utf-8");
        const json = JSON.parse(raw);
        return NextResponse.json(json, { status: 200 });
    } catch {
        return NextResponse.json({}, { status: 200 });
    }
}


