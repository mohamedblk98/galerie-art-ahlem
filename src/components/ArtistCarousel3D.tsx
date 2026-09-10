import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Artist } from '../types';
import { useTranslation } from '../i18n';

/* ─── shared angle offset (no group rotation) ─── */
let angleOffset = 0;

/* ─── helpers ─── */

function projectToScreen(
  worldPos: THREE.Vector3,
  camera: THREE.Camera,
  canvas: HTMLCanvasElement
): { x: number; y: number } | null {
  const v = worldPos.clone().project(camera);
  if (v.z > 1) return null;
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((v.x + 1) / 2) * rect.width,
    y: ((-v.y + 1) / 2) * rect.height,
  };
}

/* ─── single portrait card ─── */

function Card({
  artist,
  index,
  total,
  radius,
  activeIdx,
}: {
  artist: Artist;
  index: number;
  total: number;
  radius: number;
  activeIdx: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(artist.portrait);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [artist.portrait]);

  const CARD_W = 2.0;
  const CARD_H = 2.7;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    const baseAngle = (index / total) * Math.PI * 2;
    const currentAngle = baseAngle + angleOffset;

    // Position on circle (world space — no parent group rotation)
    mesh.position.x = Math.sin(currentAngle) * radius;
    mesh.position.z = Math.cos(currentAngle) * radius;

    // Gentle vertical bob
    mesh.position.y = Math.sin(t * 0.5 + index * 1.2) * 0.1;

    // ★ ALWAYS face camera — rotation.y = 0 ★
    mesh.rotation.y = 0;

    // Depth factor: 1 = front, 0 = back
    const depthFactor = (Math.cos(currentAngle) + 1) / 2;
    const isActive = index === activeIdx;

    // Scale: active biggest, front larger, back smaller
    let targetScale = 0.7 + depthFactor * 0.3;
    if (isActive) targetScale = 1.12;
    mesh.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );

    // Material: no opacity variation — all photos fully visible
    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.opacity = 1;
    mat.emissiveIntensity = isActive ? 0.1 : 0;
    mat.color.setScalar(1);

    // Render order: front cards render last (on top)
    mesh.renderOrder = Math.round(depthFactor * 100);
  });

  return (
    <mesh ref={meshRef} castShadow>
      <planeGeometry args={[CARD_W, CARD_H, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
        roughness={0.35}
        metalness={0.05}
        emissive="#B99A67"
        emissiveIntensity={0}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── floating gold particles ─── */

function GoldParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B99A67"
        size={0.03}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Hover detector — runs inside R3F (has camera access) ─── */

function HoverDetector({
  cardsGroupRef,
  pointerRef,
  isDraggingRef,
  onHover,
  canvasRef,
}: {
  cardsGroupRef: React.RefObject<THREE.Group>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  isDraggingRef: React.MutableRefObject<boolean>;
  onHover: (info: { index: number; x: number; y: number } | null) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}) {
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  useFrame(() => {
    if (isDraggingRef.current || !cardsGroupRef.current) return;

    const canvasEl = canvasRef.current?.querySelector('canvas');
    if (!canvasEl) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    if (
      px < rect.left || px > rect.right ||
      py < rect.top || py > rect.bottom
    ) {
      onHover(null);
      return;
    }

    const ndcX = ((px - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((py - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const meshes = cardsGroupRef.current.children.filter(
      (c) => c instanceof THREE.Mesh
    ) as THREE.Mesh[];
    const hits = raycaster.current.intersectObjects(meshes, false);

    if (hits.length > 0 && hits[0].object instanceof THREE.Mesh) {
      const mesh = hits[0].object;
      const idx = cardsGroupRef.current.children.indexOf(mesh);
      if (idx >= 0) {
        const wp = new THREE.Vector3();
        mesh.getWorldPosition(wp);
        const screen = projectToScreen(wp, camera, canvasEl);
        if (screen) {
          onHover({ index: idx, x: screen.x, y: screen.y });
          return;
        }
      }
    }
    onHover(null);
  });

  return null;
}

/* ─── main 3D scene ─── */

function Scene({
  artists,
  cardsGroupRef,
  activeIdx,
  pointerRef,
  isDraggingRef,
  onHover,
  canvasRef,
}: {
  artists: Artist[];
  cardsGroupRef: React.RefObject<THREE.Group>;
  activeIdx: number;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  isDraggingRef: React.MutableRefObject<boolean>;
  onHover: (info: { index: number; x: number; y: number } | null) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={0.9}
        color="#FFF5E8"
        castShadow
      />
      <directionalLight position={[-3, 3, -4]} intensity={0.25} color="#B99A67" />
      <pointLight
        position={[0, 2, 0]}
        intensity={0.35}
        color="#B99A67"
        distance={12}
      />

      <group ref={cardsGroupRef}>
        {artists.map((artist, i) => (
          <Card
            key={artist.id}
            artist={artist}
            index={i}
            total={artists.length}
            radius={3.6}
            activeIdx={activeIdx}
          />
        ))}
      </group>

      <HoverDetector
        cardsGroupRef={cardsGroupRef}
        pointerRef={pointerRef}
        isDraggingRef={isDraggingRef}
        onHover={onHover}
        canvasRef={canvasRef}
      />

      <GoldParticles count={40} />
      <fog attach="fog" args={['#1E0F2A', 7, 16]} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ArtistCarousel3D — Interactive 3D artist carousel
   ═══════════════════════════════════════════════════════ */

interface Props {
  artists: Artist[];
  onActiveChange?: (index: number) => void;
}

export default function ArtistCarousel3D({ artists, onActiveChange }: Props) {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState<{
    index: number;
    x: number;
    y: number;
  } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const cardsGroupRef = useRef<THREE.Group>(null);

  // Pointer tracking
  const isDragging = useRef(false);
  const pointerPos = useRef({ x: 0, y: 0 });
  const prevX = useRef(0);
  const velocity = useRef(0);

  /* ── pointer events ── */

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevX.current = e.clientX;
      velocity.current = 0;
      el.style.cursor = 'grabbing';
    };

    const onMove = (e: PointerEvent) => {
      pointerPos.current = { x: e.clientX, y: e.clientY };

      if (isDragging.current) {
        const dx = e.clientX - prevX.current;
        velocity.current = dx * 0.004;
        prevX.current = e.clientX;
        setHovered(null);
        return;
      }

      el.style.cursor = 'grab';
    };

    const onUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    el.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
  }, [artists.length]);

  /* ── animation loop — updates shared angleOffset ── */

  useEffect(() => {
    const tick = () => {
      // Apply drag velocity
      if (isDragging.current) {
        angleOffset += velocity.current;
      } else {
        // Inertia decay
        velocity.current *= 0.94;
        if (Math.abs(velocity.current) > 0.0001) {
          angleOffset += velocity.current;
        }
      }

      // Determine active card from angleOffset
      const n = artists.length;
      const norm = (((-angleOffset / (Math.PI * 2)) % 1) + 1) % 1;
      const idx = Math.round(norm * n) % n;
      setActiveIdx((prev) => {
        if (prev !== idx) onActiveChange?.(idx);
        return idx;
      });

      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [artists.length, onActiveChange]);

  const handleHover = useCallback(
    (info: { index: number; x: number; y: number } | null) => {
      setHovered(info);
    },
    []
  );

  if (!artists.length) return null;

  const hoveredArtist = hovered ? artists[hovered.index] : null;

  return (
    <div className="carousel3d-wrapper">
      <div
        ref={canvasRef}
        className="carousel3d-canvas"
        style={{ cursor: 'grab' }}
      >
        <Canvas
          camera={{ position: [0, 0.6, 8], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            localClippingEnabled: true,
          }}
          style={{ background: 'transparent' }}
        >
          <Scene
            artists={artists}
            cardsGroupRef={cardsGroupRef}
            activeIdx={activeIdx}
            pointerRef={pointerPos}
            isDraggingRef={isDragging}
            onHover={handleHover}
            canvasRef={canvasRef}
          />
        </Canvas>

        {/* Hover overlay — name + buttons at BOTTOM of photo */}
        {hovered && hoveredArtist && !isDragging.current && (
          <div
            className="carousel3d-hovercard"
            style={{
              left: hovered.x,
              top: hovered.y,
            }}
          >
            {/* Artist name */}
            <span className="carousel3d-hovercard__name">
              {hoveredArtist.nom}
            </span>
            {/* Buttons row */}
            <div className="carousel3d-hovercard__buttons">
              <Link
                to={`/artistes/${hoveredArtist.slug}`}
                className="carousel3d-hovercard__btn carousel3d-hovercard__btn--gallery"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                {t('artists_gallery')}
              </Link>
              <Link
                to={`/artistes/${hoveredArtist.slug}`}
                className="carousel3d-hovercard__btn carousel3d-hovercard__btn--info"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                {t('carousel3d_info')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Counter — bottom left */}
      <div className="carousel3d-counter">
        <span className="carousel3d-counter__current">
          {String(activeIdx + 1).padStart(2, '0')}
        </span>
        <span className="carousel3d-counter__sep">/</span>
        <span className="carousel3d-counter__total">
          {String(artists.length).padStart(2, '0')}
        </span>
      </div>

      {/* Drag hint */}
      <div className="carousel3d-hint">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span>{t('carousel3d_drag')}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ transform: 'scaleX(-1)' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
