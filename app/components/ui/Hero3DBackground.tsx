'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Hero3DBackgroundProps {
  className?: string;
}

export default function Hero3DBackground({ className = '' }: Hero3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // faster, avoids some driver bugs
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1800;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i]     = (Math.random() - 0.5) * 150; // x
        posArray[i + 1] = (Math.random() - 0.5) * 150; // y
        posArray[i + 2] = (Math.random() - 0.5) * 100; // z
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );

      // Standard PointsMaterial — no custom shaders, no WebGL compile errors
      const particlesMaterial = new THREE.PointsMaterial({
        color: new THREE.Color('#C9A962'), // WEM gold
        size: 0.35,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      particlesRef.current = particles;

      // Animation loop
      let animationId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        particles.rotation.y = t * 0.04;
        particles.rotation.x = t * 0.015;

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Capture ref for cleanup (avoids "possibly null" TS error)
      const container = containerRef.current;

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };

    } catch (err) {
      // WebGL unavailable or context lost — silently skip the 3D background
      console.warn('Hero3DBackground: WebGL init failed, skipping.', err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
