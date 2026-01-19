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

// Initialize gtag function and dataLayer
const initializeGtag = (): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
};

// Initialize Google Consent Mode V2 with default denied state
// This MUST be called before GTM loads
export const initializeGoogleConsentMode = (): void => {
  if (typeof window === "undefined") return;

  // Initialize gtag
  initializeGtag();

  // Set default consent state - DENIED by default (GDPR compliant)
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted", // Always granted for security purposes
    wait_for_update: 500, // Wait 500ms for consent update
  });

  // Set data redaction for denied consent
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", true);
};

// Update Google Consent Mode when user accepts
export const updateGoogleConsent = (granted: boolean): void => {
  if (typeof window === "undefined") return;

  // Ensure gtag is initialized
  if (!window.gtag) {
    initializeGtag();
  }

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

// Function to load Google Tag Manager when consent is given
export const loadGoogleTagManager = (): void => {
  if (typeof window === "undefined") return;

  // Check if GTM script already exists
  const existingScript = document.querySelector(
    'script[src*="googletagmanager.com/gtm.js"]'
  );
  if (existingScript) return;

  // Initialize dataLayer with gtm.start event
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
  window.OnSiteObject = "onsite";
  window.onsite =
    window.onsite ||
    function (...args: unknown[]) {
      (window.onsite!.q = window.onsite!.q || []).push(args);
    };

  // Add OnSite-Tracking script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://trk.herofil.es/onsite/onsite.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // Create tracking instance with the provided ID
  window.onsite!("create", "RH-077-305-956");
};

// Function to load all tracking scripts when consent is given
export const loadTrackingScripts = (): void => {
  // First update consent mode to granted
  updateGoogleConsent(true);

  // Then load the tracking scripts
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
