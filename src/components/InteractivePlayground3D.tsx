import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, EyeOff, RotateCw, Volume2 } from 'lucide-react';

const assemblyModel = '/models/assembly.glb';

export const InteractivePlayground3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<THREE.Group | null>(null);
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [audioSimulation, setAudioSimulation] = useState(true);
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const toggleHud = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'h') return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      setControlsCollapsed((collapsed) => !collapsed);
    };
    window.addEventListener('keydown', toggleHud);
    return () => window.removeEventListener('keydown', toggleHud);
  }, []);

  const paramsRef = useRef({ autoRotate, speed, audioSimulation });
  useEffect(() => {
    paramsRef.current = { autoRotate, speed, audioSimulation };
  }, [autoRotate, speed, audioSimulation]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 550;
    let disposed = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    pmremGenerator.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.3);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xc6ff00, 3.2, 18);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0x8899aa, 1.25);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    const subjectGroup = new THREE.Group();
    subjectRef.current = subjectGroup;
    scene.add(subjectGroup);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.32 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.05;
    scene.add(ground);

    const loader = new GLTFLoader();
    loader.load(
      assemblyModel,
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => {
                Object.values(material).forEach((value) => {
                  if (value instanceof THREE.Texture) value.dispose();
                });
                material.dispose();
              });
            }
          });
          return;
        }

        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const largestDimension = Math.max(size.x, size.y, size.z) || 1;
        const scale = 3.5 / largestDimension;
        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        subjectGroup.add(model);
        setModelStatus('ready');
      },
      undefined,
      () => {
        if (!disposed) setModelStatus('error');
      }
    );

    const handleResize = () => {
      width = container.clientWidth || 800;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const params = paramsRef.current;
      if (params.autoRotate && !dragRef.current.active) {
        subjectGroup.rotation.y += delta * 0.32 * params.speed;
      }
      const pulse = params.audioSimulation ? 1 + Math.sin(time * 3.2) * 0.012 : 1;
      subjectGroup.scale.setScalar(pulse);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      subjectRef.current = null;
      subjectGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        }
      });
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      environment.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, lastX: event.clientX, lastY: event.clientY };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !subjectRef.current) return;
    const deltaX = event.clientX - dragRef.current.lastX;
    const deltaY = event.clientY - dragRef.current.lastY;
    subjectRef.current.rotation.y += deltaX * 0.009;
    subjectRef.current.rotation.x += deltaY * 0.009;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const resetRotation = () => {
    if (!subjectRef.current) return;
    subjectRef.current.rotation.set(0, 0, 0);
  };

  return (
    <section id="playground" className="relative py-28 md:py-36 px-6 md:px-14 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 text-xs font-mono text-[#888888] tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-[#C6FF00]">04</span>
            <span>INTERACTIVE 3D MODEL // GLB VIEWER</span>
          </div>
          <div className="hidden sm:block"><span>DRAG TO ROTATE · SCENE LIGHTING</span></div>
        </div>

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-[#F5F5F0] uppercase tracking-tight">
              3D DESIGN <span className="text-[#C6FF00]">EXPERIENCE</span>
            </h2>
            <p className="mt-2 text-sm text-[#888888] max-w-xl font-sans">
              Explore the Assembly model in real time. Drag to rotate it, or let it turn automatically under studio lighting.
            </p>
          </div>
          <div className="text-xs font-mono text-[#888888]">PRESS [H] OR TOGGLE TO COLLAPSE HUD</div>
        </div>

        <div
          data-cursor="drag"
          data-cursor-text="DRAG"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          className="relative w-full h-[520px] md:h-[620px] border border-white/10 bg-[#0a0a0a] overflow-hidden group select-none touch-none"
        >
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          <div className="absolute top-4 left-4 z-20 pointer-events-none text-xs font-mono text-[#888888]">
            <div className="text-[#F5F5F0] font-bold">ASSEMBLY_1.GLB</div>
            <div className="text-[10px] text-[#C6FF00]">
              {modelStatus === 'loading' ? 'LOADING MODEL…' : modelStatus === 'ready' ? 'GLTF · INTERACTIVE' : 'MODEL FAILED TO LOAD'}
            </div>
          </div>

          <button
            onClick={() => setControlsCollapsed(!controlsCollapsed)}
            data-cursor="hover"
            className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-[#888888] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors flex items-center gap-2"
          >
            {controlsCollapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{controlsCollapsed ? 'SHOW HUD' : 'COLLAPSE HUD'}</span>
          </button>

          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-2xl bg-[#121212]/90 backdrop-blur-xl border border-white/15 p-4 transition-all duration-300 ease-out shadow-2xl ${
              controlsCollapsed ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-[#888888]">ROTATE MODEL <span className="text-white/70">BY DRAGGING</span></div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetRotation}
                  className="px-2.5 py-1 flex items-center gap-1 bg-white/5 text-[#888888] hover:text-[#C6FF00] transition-colors"
                  title="Reset model rotation"
                >
                  <RotateCw className="w-3.5 h-3.5" /> RESET
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 transition-colors ${autoRotate ? 'bg-[#C6FF00] text-black font-bold' : 'bg-white/5 text-[#888888]'}`}
                >
                  {autoRotate ? 'AUTO ROTATE ON' : 'AUTO ROTATE OFF'}
                </button>
                <button
                  onClick={() => setAudioSimulation(!audioSimulation)}
                  className={`px-2.5 py-1 flex items-center gap-1 transition-colors ${audioSimulation ? 'bg-white/10 text-[#C6FF00]' : 'bg-white/5 text-[#888888]'}`}
                  title="Toggle subtle model pulse"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {audioSimulation ? 'PULSE ON' : 'PULSE OFF'}
                </button>
                <button
                  onClick={() => setSpeed((current) => current === 1 ? 2 : current === 2 ? 0.4 : 1)}
                  className="px-2.5 py-1 bg-white/5 text-[#888888] hover:text-[#C6FF00] transition-colors"
                >
                  SPEED: {speed}X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
