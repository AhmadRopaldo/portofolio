import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw } from 'lucide-react';

export default function ProfileModel3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<() => void>(() => {});
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    setStatus('loading');
    let disposed = false;
    let visible = true;
    let frame = 0;
    let model: THREE.Group | null = null;
    const abort = new AbortController();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0c0e0a');
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setStatus('error');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute('aria-label', 'Model 3D Ahmad Ropaldo. Seret untuk memutar, gunakan scroll untuk zoom.');
    renderer.domElement.style.touchAction = 'none';
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 1.2;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI * 0.9;
    controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotateSpeed = 0.65;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x353b24, 2.2));
    const key = new THREE.DirectionalLight(0xfff4e0, 3);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc6ff00, 1.5);
    rim.position.set(-3, 2, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xc6d6ff, 1.1);
    fill.position.set(-4, 1, 3);
    scene.add(fill);
    const disposeModel = (group: THREE.Group) => {
      group.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) value.dispose();
          });
          material.dispose();
        });
      });
    };
    const fit = () => {
      const vertical = THREE.MathUtils.degToRad(camera.fov) / 2;
      const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
      camera.position.set(0, 0.1, 1.3 / Math.sin(Math.min(vertical, horizontal)));
      controls.target.set(0, 0, 0);
      controls.update();
      controls.saveState();
    };
    resetRef.current = () => controls.reset();
    const resize = () => {
      const width = mount.clientWidth || 300;
      const height = mount.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      fit();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(mount);
    resize();
    const load = async () => {
      try {
        const response = await fetch('/models/profile.glb', { signal: abort.signal });
        if (!response.ok) throw new Error(`Model response: ${response.status}`);
        const buffer = await response.arrayBuffer();
        if (disposed) return;
        const gltf = await new GLTFLoader().parseAsync(buffer, '/models/');
        if (disposed) { disposeModel(gltf.scene); return; }
        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 2.2 / (Math.max(size.x, size.y, size.z) || 1);
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);
        scene.add(model);
        fit();
        setStatus('ready');
      } catch {
        if (!disposed) setStatus('error');
      }
    };
    void load();
    let previous = 0;
    const animate = (time: number) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      if (visible && !document.hidden) {
        controls.update(delta);
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      disposed = true;
      abort.abort();
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      controls.dispose();
      if (model) disposeModel(model);
      renderer.dispose();
      renderer.domElement.remove();
      resetRef.current = () => {};
    };
  }, [attempt]);

  return (
    <div className="absolute inset-0 bg-[#0c0e0a]" data-cursor="drag" data-cursor-text="ROTATE" data-lenis-prevent>
      <div ref={mountRef} className="absolute inset-0" />
      {status === 'loading' && <div role="status" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0c0e0a]/90 font-mono text-xs text-[#C6FF00]"><span className="h-8 w-8 animate-spin rounded-full border border-[#C6FF00]/20 border-t-[#C6FF00] motion-reduce:animate-none" />MEMUAT MODEL 3D…</div>}
      {status === 'error' && <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0c0e0a] p-6 text-center text-sm text-white/70"><p>Model 3D belum berhasil dimuat.</p><button type="button" onClick={() => setAttempt((value) => value + 1)} data-cursor="hover" className="border border-[#C6FF00]/50 px-4 py-2 font-mono text-xs text-[#C6FF00]">COBA LAGI</button></div>}
      {status === 'ready' && <>
        <button type="button" onClick={() => resetRef.current()} data-cursor="hover" aria-label="Reset tampilan model 3D" className="absolute right-4 top-4 border border-white/20 bg-black/60 p-2 text-[#C6FF00]"><RotateCcw className="h-4 w-4" /></button>
        <p className="pointer-events-none absolute bottom-6 inset-x-4 text-center font-mono text-[9px] tracking-wider text-white/50">SERET UNTUK MEMUTAR · SCROLL UNTUK ZOOM</p>
      </>}
    </div>
  );
}
