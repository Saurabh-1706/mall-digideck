'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { getOptimalParticleCount, getOptimalPixelRatio, prefersReducedMotion } from '../../lib/device';

interface Section3DBackgroundProps {
  particleColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  particleCount?: number;
  pattern?: 'float' | 'rotate' | 'wave' | 'spiral' | 'burst';
  particleShape?: 'circle' | 'square' | 'star';
  mouseInteraction?: boolean;
  opacity?: number;
  className?: string;
}

export default function Section3DBackground({
  particleColor = '#C9A962',
  secondaryColor,
  tertiaryColor,
  particleCount = 1500,
  pattern = 'float',
  particleShape = 'circle',
  mouseInteraction = false,
  opacity = 0.8,
  className = '',
}: Section3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) return; // Don't initialize if user prefers reduced motion

    // Optimize for device
    const optimizedCount = getOptimalParticleCount(particleCount);
    const pixelRatio = getOptimalPixelRatio();

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
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(optimizedCount * 3);
    const velocityArray = new Float32Array(optimizedCount * 3);

    for (let i = 0; i < optimizedCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 150; // x
      posArray[i + 1] = (Math.random() - 0.5) * 150; // y
      posArray[i + 2] = (Math.random() - 0.5) * 100; // z

      // Velocity (for future use)
      velocityArray[i] = (Math.random() - 0.5) * 0.02; // vx
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.02; // vy
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.01; // vz
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

    // Custom shader material
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uOpacity: { value: opacity },
        uColor1: { value: new THREE.Color(particleColor) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        
        void main() {
          vec3 pos = position;
          
          // Simple floating animation
          pos.y = pos.y + sin(uTime + pos.x * 0.1) * 2.0;
          pos.x = pos.x + cos(uTime * 0.5 + pos.y * 0.1) * 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 6.0 * uPixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        uniform vec3 uColor1;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) {
            discard;
          }
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(uColor1, alpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.uTime.value += 0.01;
      }

      // Apply mouse interaction
      if (mouseInteraction && particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const dx = mouseRef.current.x * 50 - positions[i];
          const dy = mouseRef.current.y * 50 - positions[i + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 20) {
            const force = (20 - dist) / 20;
            positions[i] -= dx * force * 0.01;
            positions[i + 1] -= dy * force * 0.01;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Rotation for rotate pattern
      if (pattern === 'rotate' && particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
      }

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

    // Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      } else {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [particleColor, secondaryColor, tertiaryColor, particleCount, pattern, particleShape, mouseInteraction, opacity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
