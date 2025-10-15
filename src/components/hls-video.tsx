"use client";

import Hls from "hls.js";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * HLS Video Player Component
 * Handles HLS streaming with fallback for browsers without native support
 * - Safari/iOS: Uses native HLS support
 * - Chrome/Firefox/Edge: Uses hls.js library
 */
export const HlsVideo = forwardRef<HTMLVideoElement, HlsVideoProps>(
  ({ src, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose the video element to parent components
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Check if browser has native HLS support (Safari)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        return;
      }

      // Use hls.js for browsers without native HLS support
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Auto-play if specified
          if (props.autoPlay) {
            video.play().catch((error) => {
              console.warn("Auto-play prevented:", error);
            });
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Network error encountered, trying to recover");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Media error encountered, trying to recover");
                hls.recoverMediaError();
                break;
              default:
                console.error("Fatal error, cannot recover");
                hls.destroy();
                break;
            }
          }
        });

        return () => {
          hls.destroy();
        };
      } else {
        console.error(
          "HLS is not supported in this browser and native playback is unavailable"
        );
      }
    }, [src, props.autoPlay]);

    return <video ref={videoRef} {...props} />;
  }
);

HlsVideo.displayName = "HlsVideo";
