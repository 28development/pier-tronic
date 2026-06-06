"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight, dependency-free (vanilla three.js) particle field used as the
 * backdrop of the VIP section. Renders rising golden "champagne" particles with
 * additive glow and a subtle pointer parallax.
 *
 * Performance & accessibility safeguards:
 * - Honors `prefers-reduced-motion` (renders a single static frame, no RAF loop).
 * - Pauses the animation loop while the section is outside the viewport.
 * - Scales the particle count down on smaller screens.
 */
export function Vip3DScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    // Soft circular sprite texture for round, glowing particles.
    const makeSprite = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255, 244, 214, 1)");
      gradient.addColorStop(0.25, "rgba(255, 214, 130, 0.95)");
      gradient.addColorStop(0.55, "rgba(214, 158, 58, 0.5)");
      gradient.addColorStop(1, "rgba(214, 158, 58, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const sprite = makeSprite();

    const isMobile = width < 640;
    const count = isMobile ? 90 : 220;

    const spreadX = 34;
    const spreadY = 26;
    const spreadZ = 14;

    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
      speeds[i] = 0.6 + Math.random() * 1.4;
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.35 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader so each particle can have its own size and soft falloff.
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: sprite },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSizeScale: { value: height * 0.09 },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        uniform float uPixelRatio;
        uniform float uSizeScale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uSizeScale * uPixelRatio / -mvPosition.z;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTexture;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = tex;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Pointer parallax (smoothed).
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    const posAttr = geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    const clock = new THREE.Clock();

    const updateParticles = (delta: number, elapsed: number) => {
      for (let i = 0; i < count; i++) {
        let y = posAttr.getY(i) + speeds[i] * delta;
        const halfY = spreadY / 2;
        if (y > halfY) {
          y = -halfY;
        }
        const baseX = posAttr.getX(i);
        const sway = Math.sin(elapsed * 0.6 + phases[i]) * 0.01;
        posAttr.setX(i, baseX + sway);
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    };

    let frameId = 0;
    let isVisible = true;

    const renderFrame = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      updateParticles(delta, elapsed);

      points.rotation.z = elapsed * 0.015;
      camera.position.x = pointer.x * 2.2;
      camera.position.y = -pointer.y * 1.6;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(renderFrame);
    }

    // Pause when offscreen to save resources.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nowVisible = entry.isIntersecting;
        if (nowVisible === isVisible) return;
        isVisible = nowVisible;
        if (prefersReducedMotion) return;
        if (isVisible && frameId === 0) {
          clock.getDelta();
          frameId = requestAnimationFrame(renderFrame);
        } else if (!isVisible && frameId !== 0) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleResize = () => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      material.uniforms.uSizeScale.value = height * 0.09;
      if (prefersReducedMotion || frameId === 0) {
        renderer.render(scene, camera);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (frameId !== 0) cancelAnimationFrame(frameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

export default Vip3DScene;
