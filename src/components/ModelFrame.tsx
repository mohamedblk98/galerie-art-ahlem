// Importe useMemo et memo pour optimiser les performances
import { useMemo, memo } from 'react';
// Importe useGLTF pour charger les modèles 3D .glb des tableaux
import { useGLTF } from '@react-three/drei';
// Importe Three.js pour Box3, Vector3, Mesh, matériaux
import * as THREE from 'three';

// Props : URL du modèle GLB du tableau
interface ModelFrameProps {
  modelUrl: string; // Chemin vers le .glb (ex: /models/tab1.glb)
}

// Composant qui affiche un tableau 3D importé (modèle GLB)
function ModelFrameInner({ modelUrl }: ModelFrameProps) {
  const { scene } = useGLTF(modelUrl); // Charge le modèle et récupère sa scène

  // Clone et normalise le modèle une seule fois
  const cloned = useMemo(() => {
    const clone = scene.clone(true); // Clone profond pour ne pas altérer le cache
    // Normalise l'échelle pour que le tableau ait une taille cohérente (~2.15 unités)
    const box = new THREE.Box3().setFromObject(clone); // Boîte englobante
    const size = new THREE.Vector3(); // Dimensions
    box.getSize(size); // Remplit size
    const maxDim = Math.max(size.x, size.y, size.z); // Plus grande dimension
    const targetMax = 2.15; // Taille cible (légèrement agrandi)
    const scale = targetMax / maxDim; // Facteur d'échelle
    clone.scale.setScalar(scale); // Applique l'échelle uniforme

    // Centre le modèle à l'origine
    const center = new THREE.Vector3(); // Centre
    box.getCenter(center); // Récupère le centre
    clone.position.sub(center.multiplyScalar(scale)); // Décale pour centrer (corrigé échelle)

    // Rotation 90° vers la gauche sur l'axe Y (pour orienter face à la caméra)
    clone.rotation.y = -Math.PI / 2;

    // Corrige les matériaux transparents accidentels et désactive les ombres (tableau plat)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) { // Si c'est un mesh
        const mesh = child as THREE.Mesh;
        if (mesh.material) { // Si matériau présent
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.transparent && mat.opacity < 0.1) { // Si quasi invisible
            mat.opacity = 1; // Rend opaque
            mat.transparent = false; // Désactive transparence
          }
        }
        mesh.castShadow = true; // Le cadre projette une ombre légère et réaliste sur le mur
        mesh.receiveShadow = true; // Peut recevoir une ombre douce
      }
    });

    return clone; // Retourne le clone prêt
  }, [scene]); // Recalcule si modèle change

  return <primitive object={cloned} />; // Affiche l'objet Three.js directement
}

// Exporte mémorisé
export default memo(ModelFrameInner);
