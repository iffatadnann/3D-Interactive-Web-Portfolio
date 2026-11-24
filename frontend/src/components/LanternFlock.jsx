import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// High-performance instanced background lanterns flock
// Renders 50+ floating lanterns across varying depths in a SINGLE draw call!
export default function LanternFlock({ count = 52 }) {
  const meshRef = useRef()

  // Procedural curved lathe geometry shared across all instances
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0.25, -0.48),
      new THREE.Vector2(0.35, -0.28),
      new THREE.Vector2(0.40, -0.05),
      new THREE.Vector2(0.41, 0.20),
      new THREE.Vector2(0.37, 0.42),
      new THREE.Vector2(0.32, 0.50),
    ]
    return new THREE.LatheGeometry(points, 16)
  }, [])

  // Material with warm golden emissive glow
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ffa63d',
      emissive: '#ff7711',
      emissiveIntensity: 1.85,
      roughness: 0.35,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    })
  }, [])

  // Lantern instances data
  const lanterns = useMemo(() => {
    const items = []
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    // Palette of warm Tangled festival tones
    const colors = [
      new THREE.Color('#ffd58a'),
      new THREE.Color('#ffb95e'),
      new THREE.Color('#ff9c38'),
      new THREE.Color('#ffa866'),
      new THREE.Color('#ffc87a'),
    ]

    for (let i = 0; i < count; i++) {
      // Disperse across depth (Z from -6 to -38) and wide X, Y
      const x = (Math.random() - 0.5) * 44
      const y = -14 + Math.random() * 38
      const z = -6 - Math.random() * 32

      // Depth-based scaling: distant lanterns appear smaller
      const depthRatio = Math.abs(z) / 38
      const scale = (0.28 + Math.random() * 0.35) * (1 - depthRatio * 0.3)

      const speedY = 0.18 + Math.random() * 0.32
      const swaySpeed = 0.6 + Math.random() * 0.8
      const swayAmp = 0.08 + Math.random() * 0.14
      const rotSpeed = 0.05 + Math.random() * 0.15
      const phase = Math.random() * Math.PI * 2

      const chosenColor = colors[Math.floor(Math.random() * colors.length)]

      items.push({
        x,
        y,
        z,
        scale,
        speedY,
        swaySpeed,
        swayAmp,
        rotSpeed,
        phase,
        currentRotationY: Math.random() * Math.PI * 2,
        color: chosenColor,
      })
    }

    return items
  }, [count])

  // Set initial instance matrices and colors once mounted
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    lanterns.forEach((lantern, i) => {
      // Slow magical ascension into the starry night sky
      lantern.y += lantern.speedY * delta
      // Wrap around when rising past top threshold
      if (lantern.y > 24) {
        lantern.y = -14
        lantern.x = (Math.random() - 0.5) * 44
        lantern.z = -6 - Math.random() * 32
      }

      // Gentle lateral sway in the night breeze
      const currentX = lantern.x + Math.sin(t * lantern.swaySpeed + lantern.phase) * lantern.swayAmp
      const currentZ = lantern.z + Math.cos(t * (lantern.swaySpeed * 0.8) + lantern.phase) * lantern.swayAmp

      lantern.currentRotationY += delta * lantern.rotSpeed

      dummy.position.set(currentX, lantern.y, currentZ)
      dummy.scale.set(lantern.scale, lantern.scale, lantern.scale)
      dummy.rotation.set(
        Math.cos(t * 0.9 + lantern.phase) * 0.04,
        lantern.currentRotationY,
        Math.sin(t * 1.1 + lantern.phase) * 0.06
      )
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, lantern.color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  )
}
