import { useMemo } from 'react'
import * as THREE from 'three'

// Procedural sunset horizon glow texture (warm sunset orange to twilight magenta)
function createHorizonGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(64, 128, 0, 64, 128, 120)
  gradient.addColorStop(0, 'rgba(255, 130, 45, 0.85)')   // Radiant sunset amber/orange
  gradient.addColorStop(0.35, 'rgba(225, 65, 115, 0.55)') // Warm coral / magenta
  gradient.addColorStop(0.7, 'rgba(105, 30, 115, 0.32)')  // Deep twilight purple
  gradient.addColorStop(1, 'rgba(32, 14, 52, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function Atmosphere() {
  const horizonTexture = useMemo(() => createHorizonGlowTexture(), [])

  return (
    <>
      {/* Warm sunset / twilight sky background & distance fog */}
      <color attach="background" args={['#241238']} />
      <fog attach="fog" args={['#3a1842', 12, 55]} />

      {/* Atmospheric lighting */}
      {/* Warm ambient fill light so dark clothing catches soft highlights */}
      <ambientLight color="#ffd2b8" intensity={1.3} />

      {/* Golden-hour hemisphere bounce: twilight purple from sky, warm sunset glow from ground */}
      <hemisphereLight args={['#582d70', '#ff8d58', 1.2]} />

      {/* Key directional light (acts like a low setting sun creating strong edge highlights) */}
      <directionalLight
        position={[6, 10, 8]}
        color="#ffe2b8"
        intensity={1.8}
      />

      {/* Cool soft rim light from behind/above to separate dark silhouettes from the background */}
      <directionalLight
        position={[-8, 14, -6]}
        color="#d48cf5"
        intensity={0.8}
      />

      {/* Luminous distant horizon festival sunset glow */}
      <mesh position={[0, -5, -42]}>
        <planeGeometry args={[110, 50]} />
        <meshBasicMaterial
          map={horizonTexture}
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}