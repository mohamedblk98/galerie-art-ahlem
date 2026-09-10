// Importe useMemo (mémorise le clone pour éviter de le recalculer) et memo (évite re-render inutile)
import { useMemo, memo } from 'react';
// Importe useGLTF : charge un fichier .glb/.gltf et donne accès à sa scène 3D
import { useGLTF } from '@react-three/drei';
// Importe Three.js pour Box3 (boîte englobante), Vector3, Mesh, matériaux
import * as THREE from 'three';

// Props de la statue : URL du modèle et position dans la galerie
interface StatueProps {
  modelUrl: string; // Chemin vers le .glb (ex: /models/statut1.glb)
  position: [number, number, number]; // Position [x, y, z] dans la scène
}

// Composant interne qui affiche une statue blanche
function StatueInner({ modelUrl, position }: StatueProps) {
  const { scene } = useGLTF(modelUrl); // Charge le modèle GLB et récupère sa scène racine

  // Clone et prépare le modèle une seule fois (mémorisé tant que scene ne change pas)
  const cloned = useMemo(() => {
    const clone = scene.clone(true); // Clone profond de la scène pour ne pas modifier l'original en cache
    const box = new THREE.Box3().setFromObject(clone); // Calcule la boîte englobante du modèle
    const size = new THREE.Vector3(); // Vecteur pour stocker les dimensions
    box.getSize(size); // Remplit size avec largeur/hauteur/profondeur
    const maxDim = Math.max(size.x, size.y, size.z); // Plus grande dimension (pour normaliser l'échelle)
    const targetMax = 1.65; // Taille cible augmentée (statues plus imposantes)
    const scale = targetMax / maxDim; // Facteur d'échelle pour atteindre targetMax
    clone.scale.setScalar(scale); // Applique l'échelle uniformément sur x/y/z

    const center = new THREE.Vector3(); // Vecteur pour le centre du modèle
    box.getCenter(center); // Récupère le centre de la boîte englobante
    clone.position.sub(center.multiplyScalar(scale)); // Décale pour centrer le modèle à l'origine (corrigé de l'échelle)

    // Ajuste pour poser la statue au sol (y=0)
    const box2 = new THREE.Box3().setFromObject(clone); // Recalcule la boîte après centrage/échelle
    clone.position.y -= box2.min.y; // Remonte de sorte que le bas touche y=0

    // Parcourt tous les meshes pour configurer ombres et matériau pierre noire
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) { // Vérifie que c'est un mesh
        const mesh = child as THREE.Mesh; // Cast en Mesh
        mesh.castShadow = false; // Pas d'ombre sur le mur — seul le sol reçoit
        mesh.receiveShadow = false;
        if (mesh.material) { // Si le mesh a un matériau
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]; // Gère matériau unique ou tableau
          mats.forEach((m: THREE.Material) => { // Pour chaque matériau
            const std = m as THREE.MeshStandardMaterial; // Cast en matériau standard
            if (std.color) std.color.set('#8a8a8a'); // Gris métal argenté
            if (std.roughness !== undefined) std.roughness = Math.min(0.35, std.roughness ?? 0.3); // Métal lisse et réfléchissant
            if (std.metalness !== undefined) std.metalness = 0.85; // Forte métallicité
            std.needsUpdate = true; // Force Three.js à mettre à jour le matériau
          });
        }
      }
    });

    return clone; // Retourne le clone prêt à afficher
  }, [scene]); // Recalcule seulement si le modèle source change

  return (
    // Groupe positionné dans la galerie (ex: [-3.2, -1.2, 0.5] à gauche)
    <group position={position}>
      <primitive object={cloned} /> {/* Affiche directement l'objet Three.js cloné */}
    </group>
  );
}

// Exporte mémorisé pour éviter re-render si props identiques
export default memo(StatueInner);
