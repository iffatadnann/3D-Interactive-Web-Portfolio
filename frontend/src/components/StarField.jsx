import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural soft glowing circular star texture (zero external assets needed)
function createStarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.25, 'rgba(255, 246, 224, 0.9)')
  gradient.addColorStop(0.6, 'rgba(215, 228, 255, 0.35)')
  gradient.addColorStop(1, 'rgba(180, 200, 255, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function StarField({ count = 2200 }) {
  const pointsRef = useRef()
  const starTexture = useMemo(() => createStarTexture(), [])

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    // Palette: crisp starlight white, warm celestial gold, soft lavender, light cyan
    const colorPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffe9b5'),
      new THREE.Color('#fff2cc'),
      new THREE.Color('#dfd5ff'),
      new THREE.Color('#cae2ff'),
    ]

    for (let i = 0; i < count; i++) {
      // Celestial dome distribution surrounding the scene
      const radius = 28 + Math.random() * 52
      const theta = Math.random() * Math.PI * 2
      // Favor the sky dome above the horizon
      const phi = Math.acos(Math.random() * 1.75 - 0.75)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.cos(phi)
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      const brightness = 0.55 + Math.random() * 0.45
      col[i * 3] = baseColor.r * brightness
      col[i * 3 + 1] = baseColor.g * brightness
      col[i * 3 + 2] = baseColor.b * brightness
    }

    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    // Slow celestial rotation and delicate breathing wobble
    pointsRef.current.rotation.y = t * 0.005
    pointsRef.current.rotation.x = Math.sin(t * 0.002) * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.15}
        sizeAttenuation
        map={starTexture}
        transparent
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  )
}
