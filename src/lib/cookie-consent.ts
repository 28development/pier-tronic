"use client";

export type CookieConsent = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "piertronic_cookie_consent";

export const getCookieConsent = (): CookieConsent => {
    if (typeof window === "undefined") return null;

    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent as CookieConsent;
};

export const setCookieConsent = (consent: CookieConsent): void => {
    if (typeof window === "undefined") return;

    if (consent) {
        localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    } else {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
};

// Function to load Google AdSense script when consent is given
export const loadGoogleAdsense = (): void => {
    if (typeof window === "undefined") return;

    // Check if script already exists
    const existingScript = document.querySelector(
        'script[src*="adsbygoogle"]'
    );
    if (existingScript) return;

    // Add Google AdSense script when user accepts cookies
    // Uncomment and add your AdSense client ID when ready
    // const script = document.createElement("script");
    // script.async = true;
    // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID";
    // script.crossOrigin = "anonymous";
    // document.head.appendChild(script);
};

// Function to remove Google AdSense cookies when rejected
export const removeGoogleAdsenseCookies = (): void => {
    if (typeof window === "undefined") return;

    // Remove Google AdSense related cookies
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        // Remove Google-related cookies
        if (
            name.startsWith("_ga") ||
            name.startsWith("_gid") ||
            name.startsWith("_gat") ||
            name.startsWith("__gads") ||
            name.startsWith("__gpi") ||
            name === "DSID" ||
            name === "IDE" ||
            name === "ANID" ||
            name === "NID"
        ) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        }
    }
};

