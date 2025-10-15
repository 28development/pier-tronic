# Chrome HLS Playback Fix

## The Problem

- ✅ **Safari/iOS**: Works natively with HLS (`.m3u8`) streams
- ❌ **Chrome/Firefox/Edge**: Don't support HLS natively

## The Solution

We've added `hls.js` to handle HLS playback on all browsers.

## Installation Steps

**Run this command:**

```bash
pnpm install
```

This will install `hls.js` that's already added to your `package.json`.

## What Changed

### 1. New Component: `src/components/hls-video.tsx`

Replaces standard `<video>` tags with intelligent HLS player:

- Detects if browser supports HLS natively (Safari)
- Falls back to hls.js for Chrome/Firefox/Edge
- Auto-recovery from network errors
- Same API as regular video element

### 2. Updated Components

- `src/components/team.tsx` - Now uses `<HlsVideo>`
- `src/components/hero-section.tsx` - Now uses `<HlsVideo>`

### 3. Updated `package.json`

Added `"hls.js": "^1.5.22"` to dependencies

## Testing

After running `pnpm install`, test in:

1. **Chrome** - Should now work ✅
2. **Safari** - Should still work (native HLS) ✅
3. **Firefox** - Should now work ✅
4. **Edge** - Should now work ✅

## How It Works

### Before (Safari only)

```tsx
<video>
  <source src="video.m3u8" type="application/x-mpegURL" />
</video>
```

### After (All browsers)

```tsx
<HlsVideo src="video.m3u8" autoPlay loop muted playsInline />
```

The component automatically:

- Uses native HLS on Safari
- Uses hls.js on Chrome/Firefox/Edge
- Handles errors and recovery
- Maintains same video element API

## Troubleshooting

### Still not working in Chrome?

1. Check browser console for errors
2. Ensure `pnpm install` completed successfully
3. Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
4. Check if video URL is correct in Network tab

### Build errors?

If you get TypeScript errors, you may need types:

```bash
pnpm add -D @types/hls.js
```

### Performance issues?

The component is optimized with:

- Worker-based decoding
- Adaptive buffer management
- Automatic quality switching
