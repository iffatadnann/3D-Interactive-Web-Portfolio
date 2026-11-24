import { useGLTF, Float } from '@react-three/drei'

export default function AvatarCompanion({ position = [0, -0.6, 2.8] }) {
  // 1. Load your GLB file from public/models/
  const { scene } = useGLTF('/models/avatar.glb')

  return (
    <group position={position}>
      {/* Gentle floating and bobbing animation */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <primitive 
          object={scene} 
          scale={2.0}          
          rotation={[0, 0.5, 0]}  
        />
      </Float>
      {/* Warm front fill light to illuminate face, hair, and black dress folds */}
<pointLight position={[0, 1.0, 1.4]} color="#fff3db" intensity={2.6} distance={5} />
    </group>
  )
}

// Preload the GLB so it loads instantly without stutter
useGLTF.preload('/models/avatar.glb')