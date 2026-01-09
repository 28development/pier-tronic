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

// Function to load Google Tag Manager when consent is given
export const loadGoogleTagManager = (): void => {
  if (typeof window === "undefined") return;

  // Check if GTM script already exists
  const existingScript = document.querySelector(
    'script[src*="googletagmanager.com/gtm.js"]'
  );
  if (existingScript) return;

  // Initialize dataLayer
  (window as Window & { dataLayer?: unknown[] }).dataLayer =
    (window as Window & { dataLayer?: unknown[] }).dataLayer || [];
  (window as Window & { dataLayer?: unknown[] }).dataLayer!.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  // Add Google Tag Manager script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-MQZSWD74";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
};

// Function to load Ströer OnSite-Tracking when consent is given
export const loadStroeerTracking = (): void => {
  if (typeof window === "undefined") return;

  // Check if OnSite script already exists
  const existingScript = document.querySelector(
    'script[src*="trk.herofil.es/onsite"]'
  );
  if (existingScript) return;

  // Initialize OnSite object
  const w = window as Window & {
    OnSiteObject?: string;
    onsite?: ((action: string, id: string) => void) & { q?: unknown[] };
  };

  w.OnSiteObject = "onsite";
  w.onsite =
    w.onsite ||
    function (...args: unknown[]) {
      (w.onsite!.q = w.onsite!.q || []).push(args);
    };

  // Add OnSite-Tracking script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://trk.herofil.es/onsite/onsite.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // Create tracking instance
  w.onsite!("create", "RH-077-305-956");
};

// Function to load all tracking scripts when consent is given
export const loadTrackingScripts = (): void => {
  loadGoogleTagManager();
  loadStroeerTracking();
};

// Function to remove tracking cookies when rejected
export const removeTrackingCookies = (): void => {
  if (typeof window === "undefined") return;

  const cookies = document.cookie.split(";");
  const hostname = window.location.hostname;

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

    // Check if this is a tracking cookie that should be removed
    const isTrackingCookie =
      // Google Analytics / GTM cookies
      name.startsWith("_ga") ||
      name.startsWith("_gid") ||
      name.startsWith("_gat") ||
      name.startsWith("__gads") ||
      name.startsWith("__gpi") ||
      name === "DSID" ||
      name === "IDE" ||
      name === "ANID" ||
      name === "NID" ||
      // Ströer OnSite-Tracking cookie
      name === "campaignId";

    if (isTrackingCookie) {
      // Try to remove from various domain configurations
      const domains = [hostname, `.${hostname}`];

      // Also try to remove from parent domains
      const parts = hostname.split(".");
      if (parts.length > 2) {
        domains.push(`.${parts.slice(-2).join(".")}`);
      }

      for (const domain of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      }

      // Also try without domain specification
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
  }
};

// Legacy export for backwards compatibility
export const loadGoogleAdsense = loadTrackingScripts;
export const removeGoogleAdsenseCookies = removeTrackingCookies;
