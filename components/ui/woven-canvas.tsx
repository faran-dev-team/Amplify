"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function getParticleBudget() {
  if (typeof window === "undefined") return 8000;
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) return 0;
  if (saveData || mem <= 2) return mobile ? 2500 : 4000;
  if (mem <= 4 || mobile) return mobile ? 5000 : 8000;
  if (cores <= 4) return 10000;
  return 14000;
}

/**
 * Hero-scoped particle atmosphere — pauses when off-screen or tab hidden.
 */
export function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const particleCount = getParticleBudget();
    if (particleCount === 0) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const lowEnd =
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <=
      2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: lowEnd ? "low-power" : "default",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, lowEnd || isMobile ? 1 : 1.5)
    );
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const startTime = performance.now();
    let mouseActive = false;
    let mouseIdleTimer = 0;
    let running = true;
    let inView = true;
    let visibleTab = document.visibilityState === "visible";

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 120, 16);
    const knotCount = torusKnot.attributes.position.count;

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % knotCount;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Vivid brand palette — Additive stacking was washing everything to white
      const PALETTE: [number, number, number][] = [
        [0.09, 0.78, 0.91], // cyan
        [0.66, 0.33, 0.97], // violet
        [0.85, 0.27, 0.94], // fuchsia
        [0.39, 0.40, 0.95], // indigo
        [0.96, 0.45, 0.71], // pink
        [0.52, 0.31, 0.90], // deep purple
        [0.20, 0.90, 0.80], // aqua
      ];
      const [cr, cg, cb] = PALETTE[i % PALETTE.length];
      // Slight variance so the weave feels alive, without drifting to white
      const jitter = 0.08 * (Math.random() - 0.5);
      colors[i * 3] = Math.min(1, Math.max(0, cr + jitter));
      colors[i * 3 + 1] = Math.min(1, Math.max(0, cg + jitter));
      colors[i * 3 + 2] = Math.min(1, Math.max(0, cb + jitter));

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.032 : 0.026,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const getHeroOffsetX = () =>
      window.innerWidth < 768 ? 0.35 : window.innerWidth < 1024 ? 2.15 : 2.65;
    let heroOffsetX = getHeroOffsetX();
    points.position.x = heroOffsetX;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseActive = true;
      window.clearTimeout(mouseIdleTimer);
      mouseIdleTimer = window.setTimeout(() => {
        mouseActive = false;
      }, 900);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId = 0;
    const mouseWorld = new THREE.Vector3();
    const currentPos = new THREE.Vector3();
    const originalPos = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const returnForce = new THREE.Vector3();
    let lastFrame = 0;
    const targetDt = lowEnd || isMobile ? 1000 / 30 : 1000 / 60;

    const shouldRun = () => running && inView && visibleTab;

    const animate = (now: number) => {
      if (!shouldRun()) {
        animationId = 0;
        return;
      }
      animationId = requestAnimationFrame(animate);

      if (now - lastFrame < targetDt - 1) return;
      lastFrame = now;

      const elapsedTime = (performance.now() - startTime) / 1000;
      mouseWorld.set(mouse.x * 3 + heroOffsetX * 0.35, mouse.y * 3, 0);

      // Full physics only while mouse is active — otherwise cheap drift
      if (mouseActive) {
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          currentPos.set(positions[ix], positions[iy], positions[iz]);
          originalPos.set(
            originalPositions[ix],
            originalPositions[iy],
            originalPositions[iz]
          );
          velocity.set(velocities[ix], velocities[iy], velocities[iz]);

          const dist = currentPos.distanceTo(mouseWorld);
          if (dist < 1.5) {
            const force = (1.5 - dist) * 0.01;
            direction.subVectors(currentPos, mouseWorld).normalize();
            velocity.add(direction.multiplyScalar(force));
          }

          returnForce
            .subVectors(originalPos, currentPos)
            .multiplyScalar(0.001);
          velocity.add(returnForce);
          velocity.multiplyScalar(0.95);

          positions[ix] += velocity.x;
          positions[iy] += velocity.y;
          positions[iz] += velocity.z;
          velocities[ix] = velocity.x;
          velocities[iy] = velocity.y;
          velocities[iz] = velocity.z;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      points.position.x = heroOffsetX;
      points.rotation.y = elapsedTime * 0.05;
      points.rotation.x = Math.sin(elapsedTime * 0.08) * 0.04;
      camera.lookAt(heroOffsetX * 0.45, 0, 0);
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!shouldRun() || animationId) return;
      lastFrame = 0;
      animationId = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
        if (inView) startLoop();
        else stopLoop();
      },
      { threshold: [0, 0.05, 0.2] }
    );
    io.observe(mount);

    const onVisibility = () => {
      visibleTab = document.visibilityState === "visible";
      if (visibleTab) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeRaf = 0;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const w = mount.clientWidth;
        const h = Math.max(mount.clientHeight, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        heroOffsetX = getHeroOffsetX();
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });

    startLoop();

    return () => {
      running = false;
      stopLoop();
      io.disconnect();
      window.clearTimeout(mouseIdleTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
