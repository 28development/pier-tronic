"use client";

export type CookieConsent = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "piertronic_cookie_consent";

// Extend Window interface for tracking objects
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    OnSiteObject?: string;
    onsite?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

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

// Ensure gtag function is available
// NOTE: gtag is initialized in layout.tsx <head> with consent mode defaults
// This function is a fallback to ensure gtag exists before use
const ensureGtagExists = (): void => {
  if (typeof window === "undefined") return;

  // gtag should already be initialized from layout.tsx
  // This is a safety fallback only
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
};

// Update Google Consent Mode when user accepts or rejects
export const updateGoogleConsent = (granted: boolean): void => {
  if (typeof window === "undefined") return;

  // Ensure gtag is available (should already exist from layout.tsx)
  ensureGtagExists();

  const consentState = granted ? "granted" : "denied";

  window.gtag("consent", "update", {
    ad_storage: consentState,
    ad_user_data: consentState,
    ad_personalization: consentState,
    analytics_storage: consentState,
    functionality_storage: consentState,
    personalization_storage: consentState,
  });
};

// EXACT Google Tag Manager snippet as provided by Ströer
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQZSWD74');`;

// EXACT Ströer OnSite-Tracking snippet as provided
const STROEER_SNIPPET = `(function(o,n,s,i,t,e){o['OnSiteObject']=s;o[s]=o[s]||function(h){(
o[s].q=o[s].q||[]).push(arguments)};t=n.createElement('script');t.async=true;
t.src=i;e=n.getElementsByTagName('script')[0];e.parentNode.insertBefore(t,e)
})(window, document, 'onsite', 'https://trk.herofil.es/onsite/onsite.js');

onsite('create', 'RH-077-305-956');`;

// Function to inject an inline script with the exact snippet
const injectInlineScript = (id: string, code: string): void => {
  // Check if script already exists
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.type = "text/javascript";
  script.textContent = code;

  // Insert at the beginning of head for earliest execution
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(script);
};

// Function to load Google Tag Manager when consent is given
// Uses the EXACT snippet provided by Ströer
export const loadGoogleTagManager = (): void => {
  if (typeof window === "undefined") return;

  injectInlineScript("gtm-script", GTM_SNIPPET);
};

// Function to load Ströer OnSite-Tracking when consent is given
// Uses the EXACT snippet provided by Ströer
export const loadStroeerTracking = (): void => {
  if (typeof window === "undefined") return;

  injectInlineScript("stroeer-onsite-script", STROEER_SNIPPET);
};

// Function to load all tracking scripts when consent is given
export const loadTrackingScripts = (): void => {
  // First update consent mode to granted
  updateGoogleConsent(true);

  // Then load the EXACT tracking scripts as provided by Ströer
  loadGoogleTagManager();
  loadStroeerTracking();
};

// Function to remove tracking cookies when rejected
export const removeTrackingCookies = (): void => {
  if (typeof window === "undefined") return;

  // Update consent mode to denied
  updateGoogleConsent(false);

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
