// Mur simple blanc — sans texture rugueuse
import * as THREE from 'three';

export default function BeigeWall() {
  return (
    <mesh position={[0, 0, -0.6]} receiveShadow={false}>
      <planeGeometry args={[128, 12]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}
