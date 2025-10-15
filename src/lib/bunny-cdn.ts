/**
 * Bunny CDN helper utilities
 * Centralizes CDN URL generation for Bunny Stream and static assets
 */

/**
 * Base URL for Bunny Stream (HLS video streaming)
 * Default: vz-9b35a891-b60.b-cdn.net
 */
const BUNNY_STREAM_HOST =
  process.env.NEXT_PUBLIC_BUNNY_STREAM_HOST ||
  "https://vz-9b35a891-b60.b-cdn.net";

/**
 * Optional: Base URL for Bunny Pull Zone (static assets like images)
 * Leave empty to use local /public files
 */
const BUNNY_CDN_URL = process.env.NEXT_PUBLIC_BUNNY_CDN_URL || "";

/**
 * Generates a Bunny Stream HLS playlist URL
 * @param videoId - The video UUID from Bunny Stream
 * @returns Full HLS playlist URL (m3u8)
 *
 * @example
 * getBunnyStreamUrl("a9f79476-87ca-49cf-83bd-c212d90db0f6")
 * // Returns: "https://vz-9b35a891-b60.b-cdn.net/a9f79476-87ca-49cf-83bd-c212d90db0f6/playlist.m3u8"
 */
export function getBunnyStreamUrl(videoId: string): string {
  return `${BUNNY_STREAM_HOST.replace(/\/$/, "")}/${videoId}/playlist.m3u8`;
}

/**
 * Generates a Bunny Stream MP4 fallback URL
 * Note: MP4 Fallback must be enabled in your Video Library settings
 * Only videos uploaded after enabling MP4 Fallback will have this available
 * Maximum resolution is 720p
 *
 * @param videoId - The video UUID from Bunny Stream
 * @param resolution - Height in pixels (240, 360, 480, 720)
 * @returns Full MP4 URL
 *
 * @see https://docs.bunny.net/docs/stream-how-to-retrieve-an-mp4-url-from-stream
 *
 * @example
 * getBunnyStreamMp4Url("a9f79476-87ca-49cf-83bd-c212d90db0f6", 720)
 * // Returns: "https://vz-9b35a891-b60.b-cdn.net/a9f79476-87ca-49cf-83bd-c212d90db0f6/play_720p.mp4"
 */
export function getBunnyStreamMp4Url(
  videoId: string,
  resolution: 240 | 360 | 480 | 720 = 720
): string {
  return `${BUNNY_STREAM_HOST.replace(
    /\/$/,
    ""
  )}/${videoId}/play_${resolution}p.mp4`;
}

/**
 * Generates a CDN URL for static assets
 * If BUNNY_CDN_URL is not set, returns the local path as-is
 *
 * @param path - Local path starting with / (e.g., "/images/logo.png")
 * @returns CDN URL or local path
 *
 * @example
 * getCdnUrl("/images/party.webp")
 * // With CDN: "https://your-pull-zone.b-cdn.net/images/party.webp"
 * // Without: "/images/party.webp"
 */
export function getCdnUrl(path: string): string {
  if (!BUNNY_CDN_URL) return path;
  return `${BUNNY_CDN_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/**
 * Video IDs for all artist clips
 * Extracted from Bunny Stream URLs for easy management
 */
export const VIDEO_IDS = {
  anaPak: {
    clip1: "a9f79476-87ca-49cf-83bd-c212d90db0f6",
    clip2: "3e92fe92-44e9-4df7-be95-8f4751988b9d",
  },
  inanBatman: {
    clip1: "1d54506b-e198-4265-8b7c-36bd633a5b67",
  },
  quincyKluivert: {
    clip1: "9d3e97d0-910c-46a5-b862-1e2e8b37c116",
  },
} as const;
