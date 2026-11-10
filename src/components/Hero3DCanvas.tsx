import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Environment (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080808, 0.8);
    scene.add(hemiLight);

    // Warm Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Electric Lime Rim Light (Brand Color)
    const rimLight = new THREE.PointLight(0xc6ff00, 4.5, 15);
    rimLight.position.set(-5, -3, 3);
    scene.add(rimLight);

    // Secondary Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x7090b0, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    // Multi-part Procedural 3D Subject (THREE.Group)
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1. Primary Subject: High-Reflectance Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.38, 220, 36, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x181818,
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      envMapIntensity: 1.8,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    heroGroup.add(knotMesh);

    // 2. Secondary Element: Orbital Geometric Rings
    const ringGroup = new THREE.Group();
    heroGroup.add(ringGroup);

    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xc6ff00,
      emissive: 0xc6ff00,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.4,
      metalness: 0.9,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringGroup.add(ringMesh2);

    // 3. Accent Element: Instanced Floating Stardust Particles
    const particleCount = 140;
    const particleGeometry = new THREE.SphereGeometry(0.025, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6ff00,
      transparent: true,
      opacity: 0.7,
    });
    const instancedParticles = new THREE.InstancedMesh(particleGeometry, particleMaterial, particleCount);
    const dummy = new THREE.Object3D();
    const particleRadii: number[] = [];
    const particleAngles: number[] = [];
    const particleSpeeds: number[] = [];
    const particleY: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      const speed = (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1);

      particleRadii.push(radius);
      particleAngles.push(angle);
      particleSpeeds.push(speed);
      particleY.push(y);

      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    instancedParticles.instanceMatrix.needsUpdate = true;
    heroGroup.add(instancedParticles);

    // Pointer Interaction
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Pre-warm shaders
    renderer.compile(scene, camera);

    // Render loop with exponential damping & zero GC
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping on mouse coordinates
      mouseRef.current.x = THREE.MathUtils.damp(mouseRef.current.x, mouseRef.current.targetX, 4.5, delta);
      mouseRef.current.y = THREE.MathUtils.damp(mouseRef.current.y, mouseRef.current.targetY, 4.5, delta);

      // Rotate hero group smoothly
      heroGroup.rotation.y = time * 0.18 + mouseRef.current.x * 0.75;
      heroGroup.rotation.x = THREE.MathUtils.damp(heroGroup.rotation.x, -mouseRef.current.y * 0.45, 4.0, delta);

      // Rotate internal elements
      knotMesh.rotation.z = time * 0.12;
      ringGroup.rotation.z = -time * 0.22;
      ringGroup.rotation.x = Math.sin(time * 0.4) * 0.25;

      // Update particle orbital paths
      for (let i = 0; i < particleCount; i++) {
        const curAngle = particleAngles[i] + time * particleSpeeds[i] * 0.3;
        const r = particleRadii[i] + Math.sin(time + i) * 0.15;
        const y = particleY[i] + Math.cos(time * 0.8 + i) * 0.15;

        dummy.position.set(Math.cos(curAngle) * r, y, Math.sin(curAngle) * r);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Camera gentle breathing
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseRef.current.x * 0.35, 3.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, mouseRef.current.y * 0.35, 3.0, delta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      instancedParticles.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
