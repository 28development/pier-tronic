"use client";

export type CookieConsent = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "piertronic_cookie_consent";

// Type for dataLayer - can contain objects or arrays (gtag commands)
type DataLayerItem = Record<string, unknown> | unknown[];
declare global {
  interface Window {
    dataLayer?: DataLayerItem[];
  }
}

/**
 * Google Consent Mode V2 - Set default consent state (denied)
 * This should be called as early as possible, before GTM loads
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */
export const initializeGoogleConsentMode = (): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Push default consent state - all denied by default (GDPR compliant)
  window.dataLayer.push({
    event: "consent_default",
    "gtm.start": new Date().getTime(),
  });

  // Set default consent to denied for all Google services
  window.dataLayer.push([
    "consent",
    "default",
    {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted", // Always needed for security
      wait_for_update: 500, // Wait 500ms for consent update
    },
  ]);

  // Enable URL passthrough for better conversion tracking without cookies
  window.dataLayer.push(["set", "url_passthrough", true]);

  // Enable ads data redaction when consent is denied
  window.dataLayer.push(["set", "ads_data_redaction", true]);
};

/**
 * Google Consent Mode V2 - Update consent state after user choice
 */
export const updateGoogleConsentMode = (granted: boolean): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const consentState = granted ? "granted" : "denied";

  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: consentState,
      ad_user_data: consentState,
      ad_personalization: consentState,
      analytics_storage: consentState,
      functionality_storage: consentState,
      personalization_storage: consentState,
    },
  ]);

  // Push consent event for GTM triggers
  window.dataLayer.push({
    event: granted ? "consent_granted" : "consent_denied",
  });
};

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

  // Initialize dataLayer (consent mode should already be initialized)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
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
  // Update Google Consent Mode to granted before loading scripts
  updateGoogleConsentMode(true);
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
