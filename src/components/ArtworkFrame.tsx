// Importe useMemo/memo (optimisation), Suspense (chargement asynchrone), useLoader (charge texture)
import { useMemo, memo, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
// Importe ModelFrame pour afficher les tableaux 3D GLB
import ModelFrame from './ModelFrame';
// Importe Three.js pour TextureLoader, SRGBColorSpace, filtres
import * as THREE from 'three';
// Importe le type Artwork
import type { Artwork } from '../types';

// Props : un artwork à afficher
interface ArtworkFrameProps {
  artwork: Artwork; // Données du tableau (image, modèle, titre...)
}

// Composant interne qui affiche un tableau (soit GLB 3D, soit image encadrée)
function ArtworkFrameInner({ artwork }: ArtworkFrameProps) {
  // Si le tableau a un modèle 3D GLB : affiche uniquement le modèle, sans cadre/passe-partout
  if (artwork.model) {
    return (
      <group> {/* Groupe conteneur */}
        <Suspense fallback={null}> {/* Attend le chargement GLB sans rien afficher */}
          <ModelFrame modelUrl={artwork.model} /> {/* Affiche le modèle 3D */}
        </Suspense>
      </group>
    );
  }

  // Sinon : affiche un cadre classique avec image texturée
  const texture = useLoader(THREE.TextureLoader, artwork.image); // Charge l'image comme texture Three.js
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace; // Espace couleur correct pour affichage fidèle
    texture.minFilter = THREE.LinearMipmapLinearFilter; // Filtrage doux quand éloigné (mipmap)
    texture.magFilter = THREE.LinearFilter; // Filtrage doux quand proche
    texture.anisotropy = 4; // Améliore netteté en angle rasant
    texture.needsUpdate = true; // Force mise à jour
  }, [texture]); // Exécute quand texture chargée

  const frameW = 1.6; // Largeur du tableau (unités 3D)
  const frameH = 2.1; // Hauteur du tableau
  const matThickness = 0.06; // Épaisseur du cadre
  const canvasInset = 0.01; // Marge intérieure de la toile
  return (
    <group> {/* Groupe conteneur du cadre */}
      {/* Passe-partout beige clair derrière le cadre */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[frameW + matThickness * 2 + 0.08, frameH + matThickness * 2 + 0.08]} />
        <meshStandardMaterial color="#F0EBE0" roughness={0.92} metalness={0} />
      </mesh>

      {/* Liseré blanc semi-transparent pour effet de profondeur */}
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[frameW + 0.02, frameH + 0.02]} />
        <meshStandardMaterial color="#fcfcfc" roughness={0.6} metalness={0.15} transparent opacity={0.18} />
      </mesh>

      {/* Toile avec l'image du tableau — toneMapped pour ACESFilmic (évite le brûlé) */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[frameW - canvasInset * 2, frameH - canvasInset * 2]} />
        <meshStandardMaterial
          map={texture}
          emissive="#fff5e6"
          emissiveIntensity={0.08}
          roughness={0.62}
          metalness={0}
          toneMapped
        />
      </mesh>

      {/* Cadre supérieur — baguette claire */}
      <mesh position={[0, frameH / 2 + matThickness / 2, 0.006]}>
        <boxGeometry args={[frameW + matThickness * 2 + 0.02, matThickness, 0.042]} />
        <meshStandardMaterial color="#eeeae8" roughness={0.68} metalness={0.08} />
      </mesh>
      {/* Cadre inférieur — baguette bois foncé */}
      <mesh position={[0, -(frameH / 2 + matThickness / 2), 0.006]}>
        <boxGeometry args={[frameW + matThickness * 2 + 0.02, matThickness, 0.042]} />
        <meshStandardMaterial color="#4B3020" roughness={0.68} metalness={0.08} />
      </mesh>
      {/* Cadre gauche — baguette bois foncé */}
      <mesh position={[-(frameW / 2 + matThickness / 2), 0, 0.006]}>
        <boxGeometry args={[matThickness, frameH + 0.02, 0.042]} />
        <meshStandardMaterial color="#3e271a" roughness={0.7} metalness={0.08} />
      </mesh>
      {/* Cadre droit — baguette bois foncé */}
      <mesh position={[frameW / 2 + matThickness / 2, 0, 0.006]}>
        <boxGeometry args={[matThickness, frameH + 0.02, 0.042]} />
        <meshStandardMaterial color="#3e271a" roughness={0.7} metalness={0.08} />
      </mesh>
    </group>
  );
}

// Exporte mémorisé pour éviter re-render inutile
export default memo(ArtworkFrameInner);
