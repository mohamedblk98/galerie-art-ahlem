// Sol en carrelage intérieur — PBR complet (diffuse, normal, roughness, AO, metallic, height)
import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function WoodenFloor() {
  // Charge toutes les textures PBR
  const [diffuseMap, normalMap, roughnessMap, aoMap, metallicMap, heightMap] = useLoader(THREE.TextureLoader, [
    '/models/interior_tiles_4k/interior_tiles_flatten_2k.jpg',
    '/models/interior_tiles_4k/interior_tiles_normal.png',
    '/models/interior_tiles_4k/interior_tiles_roughness.png',
    '/models/interior_tiles_4k/interior_tiles_ao.png',
    '/models/interior_tiles_4k/interior_tiles_metallic.png',
    '/models/interior_tiles_4k/interior_tiles_height.png',
  ]);

  // Configure les textures PBR pour les deux sols
  const textures = useMemo(() => {
    const REPEAT_X = 20;
    const REPEAT_Y = 4;

    const setupTex = (tex: THREE.Texture, isColor: boolean) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(REPEAT_X, REPEAT_Y);
      tex.anisotropy = 8;
      tex.needsUpdate = true;
      if (isColor) {
        tex.colorSpace = THREE.SRGBColorSpace;
      } else {
        tex.colorSpace = THREE.NoColorSpace;
      }
    };

    // Cloner chaque texture pour le second sol
    const clone = (tex: THREE.Texture) => tex.clone();

    // --- Sol incliné ---
    setupTex(diffuseMap, true);
    setupTex(normalMap, false);
    setupTex(roughnessMap, false);
    setupTex(aoMap, false);
    setupTex(metallicMap, false);
    setupTex(heightMap, false);

    // --- Sol horizontal (clones) ---
    const dDiff = clone(diffuseMap); setupTex(dDiff, true);
    const dNorm = clone(normalMap); setupTex(dNorm, false);
    const dRough = clone(roughnessMap); setupTex(dRough, false);
    const dAO = clone(aoMap); setupTex(dAO, false);
    const dMetal = clone(metallicMap); setupTex(dMetal, false);
    const dHeight = clone(heightMap); setupTex(dHeight, false);

    return {
      incline: { diffuseMap, normalMap, roughnessMap, aoMap, metallicMap, heightMap },
      flat: { diffuseMap: dDiff, normalMap: dNorm, roughnessMap: dRough, aoMap: dAO, metallicMap: dMetal, heightMap: dHeight },
    };
  }, [diffuseMap, normalMap, roughnessMap, aoMap, metallicMap, heightMap]);

  return (
    <>
      {/* Sol incliné principal — PBR complet, teinte gris clair */}
      <mesh position={[0, -3.5, 2]} rotation={[-Math.PI / 2.4, 0, 0]} receiveShadow>
        <planeGeometry args={[128, 10, 64, 64]} />
        <meshStandardMaterial
          map={textures.incline.diffuseMap}
          color="#c8c8c8"
          normalMap={textures.incline.normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughnessMap={textures.incline.roughnessMap}
          roughness={0.5}
          metalnessMap={textures.incline.metallicMap}
          metalness={0.05}
          aoMap={textures.incline.aoMap}
          aoMapIntensity={0.8}
          displacementMap={textures.incline.heightMap}
          displacementScale={0.012}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Sol horizontal sous les statues — miroir PBR avec reflets des statues */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.195, 0.5]} receiveShadow>
        <planeGeometry args={[128, 10, 64, 64]} />
        <MeshReflectorMaterial
          mirror={0.45}
          blur={[400, 100]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={0.55}
          color="#c8c8c8"
          map={textures.flat.diffuseMap}
          normalMap={textures.flat.normalMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          roughnessMap={textures.flat.roughnessMap}
          roughness={0.5}
          metalness={0.05}
          aoMap={textures.flat.aoMap}
          aoMapIntensity={0.8}
          depthScale={0.4}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
        />
      </mesh>
    </>
  );
}
