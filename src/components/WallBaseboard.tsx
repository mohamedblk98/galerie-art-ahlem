// Plinthe murale — bande au pied du mur, gris foncé comme le carrelage

export default function WallBaseboard() {
  // Mur à z=-0.6, sol horizontal à y=-1.195
  // Plinthe : longueur 40, hauteur 0.18, profondeur 0.07, posée sur le sol
  const y = -1.195 + 0.09; // sol + moitié hauteur
  const z = -0.6 + 0.035; // légèrement devant le mur

  return (
    <group>
      {/* Corps principal — gris foncé carrelage, mat */}
      <mesh position={[0, y, z]} castShadow={false} receiveShadow={false}>
        <boxGeometry args={[128, 0.18, 0.07]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0} />
      </mesh>
      {/* Liseré supérieur fin — gris légèrement plus clair */}
      <mesh position={[0, y + 0.085, z + 0.005]} castShadow={false} receiveShadow={false}>
        <boxGeometry args={[128, 0.015, 0.075]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.65} metalness={0} />
      </mesh>
    </group>
  );
}
