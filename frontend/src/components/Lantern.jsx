import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// Procedural soft circular halo texture for the warm outer lantern glow
function createGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 245, 200, 0.95)')
  gradient.addColorStop(0.2, 'rgba(255, 185, 70, 0.7)')
  gradient.addColorStop(0.5, 'rgba(255, 130, 30, 0.25)')
  gradient.addColorStop(1, 'rgba(255, 100, 20, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function Lantern({
  id,
  label,
  position = [0, 0, 0],
  color = '#ffd700',
  glowColor = '#ff9900',
  shapeType = 'standard',
  isSelected = false,
  isInteractive = true,
  onSelect,
  floatSpeed = 1.0,
  floatAmp = 0.22,
  driftAmp = 0.12,
  rotSpeed = 0.15,
  phase = 0,
  scale = 1.0,
  showTag = true,
}) {
  const groupRef = useRef()
  const paperMeshRef = useRef()
  const haloRef = useRef()
  const [hovered, setHovered] = useState(false)

  const glowTexture = useMemo(() => createGlowTexture(), [])

  // Handcrafted lathe profile curves for the 6 special navigation lanterns
  const { latheGeometry, topRimGeometry, bottomRimGeometry, decorativeRingGeometry } = useMemo(() => {
    let points = []
    let topR = 0.32
    let botR = 0.25
    let hasDecoRing = false
    let decoR = 0.38

    switch (shapeType) {
      case 'grand': // Home: Majestic, slightly larger, crowned
        points = [
          new THREE.Vector2(0.28, -0.52),
          new THREE.Vector2(0.38, -0.32),
          new THREE.Vector2(0.44, -0.05),
          new THREE.Vector2(0.45, 0.22),
          new THREE.Vector2(0.41, 0.44),
          new THREE.Vector2(0.35, 0.54),
        ]
        topR = 0.35
        botR = 0.28
        hasDecoRing = true
        decoR = 0.45
        break

      case 'slender': // Skills: Taller, elegant tapered silhouette
        points = [
          new THREE.Vector2(0.22, -0.56),
          new THREE.Vector2(0.30, -0.32),
          new THREE.Vector2(0.33, 0.0),
          new THREE.Vector2(0.33, 0.30),
          new THREE.Vector2(0.30, 0.50),
          new THREE.Vector2(0.26, 0.58),
        ]
        topR = 0.26
        botR = 0.22
        break

      case 'flared': // Projects: Lotus / Pagoda flared lower rim
        points = [
          new THREE.Vector2(0.34, -0.50),
          new THREE.Vector2(0.38, -0.32),
          new THREE.Vector2(0.42, -0.10),
          new THREE.Vector2(0.38, 0.20),
          new THREE.Vector2(0.32, 0.42),
          new THREE.Vector2(0.26, 0.50),
        ]
        topR = 0.26
        botR = 0.34
        hasDecoRing = true
        decoR = 0.39
        break

      case 'bell': // Education: Soft rounded bell shoulder taper
        points = [
          new THREE.Vector2(0.22, -0.50),
          new THREE.Vector2(0.34, -0.28),
          new THREE.Vector2(0.42, 0.05),
          new THREE.Vector2(0.42, 0.28),
          new THREE.Vector2(0.34, 0.46),
          new THREE.Vector2(0.25, 0.52),
        ]
        topR = 0.25
        botR = 0.22
        break

      case 'beacon': // Contact: Slender ascending beacon
        points = [
          new THREE.Vector2(0.20, -0.52),
          new THREE.Vector2(0.28, -0.30),
          new THREE.Vector2(0.34, 0.0),
          new THREE.Vector2(0.36, 0.25),
          new THREE.Vector2(0.32, 0.45),
          new THREE.Vector2(0.24, 0.54),
        ]
        topR = 0.24
        botR = 0.20
        break

      case 'standard': // About Me & default
      default:
        points = [
          new THREE.Vector2(0.25, -0.48),
          new THREE.Vector2(0.35, -0.28),
          new THREE.Vector2(0.40, -0.05),
          new THREE.Vector2(0.41, 0.20),
          new THREE.Vector2(0.37, 0.42),
          new THREE.Vector2(0.32, 0.50),
        ]
        topR = 0.32
        botR = 0.25
        break
    }

    const lathe = new THREE.LatheGeometry(points, 24)
    const topRim = new THREE.TorusGeometry(topR, 0.018, 12, 24)
    const bottomRim = new THREE.TorusGeometry(botR, 0.022, 12, 24)
    const decoRing = hasDecoRing ? new THREE.TorusGeometry(decoR, 0.015, 10, 24) : null

    return {
      latheGeometry: lathe,
      topRimGeometry: topRim,
      bottomRimGeometry: bottomRim,
      decorativeRingGeometry: decoRing,
    }
  }, [shapeType])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime() + phase

    // Gentle vertical bobbing motion
    const targetY = position[1] + Math.sin(t * floatSpeed) * floatAmp
    // Gentle lateral drift in night breeze
    const targetX = position[0] + Math.sin(t * (floatSpeed * 0.7) + phase) * driftAmp
    const targetZ = position[2] + Math.cos(t * (floatSpeed * 0.6) + phase) * driftAmp

    groupRef.current.position.y = targetY
    groupRef.current.position.x = targetX
    groupRef.current.position.z = targetZ

    // Slow yaw rotation and gentle wind tilt
    groupRef.current.rotation.y += delta * rotSpeed
    groupRef.current.rotation.z = Math.sin(t * 1.1 + phase) * 0.05
    groupRef.current.rotation.x = Math.cos(t * 0.9 + phase) * 0.035

    // Subtle candle flicker pulse on emissive intensity
    if (paperMeshRef.current && paperMeshRef.current.material) {
      const flicker = 1.0 + Math.sin(t * 9 + phase) * 0.08 + Math.cos(t * 14) * 0.04
      const baseIntensity = isSelected ? 3.4 : hovered ? 2.8 : 1.95
      paperMeshRef.current.material.emissiveIntensity = baseIntensity * flicker
    }

    // Halo gentle pulsing
    if (haloRef.current) {
      const baseHaloScale = scale * 2.3
      const haloScale = baseHaloScale * (1.0 + Math.sin(t * 2.5 + phase) * 0.05)
      haloRef.current.scale.set(haloScale, haloScale, 1)
    }
  })

  const currentScale = scale * (isSelected ? 1.2 : hovered ? 1.12 : 1.0)

  // Pointer event handlers with OrbitControls drag protection
  const handlePointerOver = (e) => {
    if (!isInteractive) return
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    if (!isInteractive) return
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    if (!isInteractive) return
    // CRITICAL: Prevent OrbitControls drag motion from accidentally triggering selection
    if (e.delta && e.delta > 5) return
    e.stopPropagation()
    if (onSelect) onSelect(id)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      scale={currentScale}
      onClick={isInteractive ? handleClick : undefined}
      onPointerOver={isInteractive ? handlePointerOver : undefined}
      onPointerOut={isInteractive ? handlePointerOut : undefined}
    >
      {/* Outer translucent golden paper body with custom accent tint */}
      <mesh ref={paperMeshRef} geometry={latheGeometry}>
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={isSelected ? 3.4 : hovered ? 2.8 : 1.95}
          roughness={0.3}
          metalness={0.05}
          transparent
          opacity={0.93}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top bamboo rim */}
      <mesh geometry={topRimGeometry} position={[0, 0.50, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#542e12" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Bottom bamboo rim */}
      <mesh geometry={bottomRimGeometry} position={[0, -0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#542e12" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Optional decorative middle band for special shapes */}
      {decorativeRingGeometry && (
        <mesh geometry={decorativeRingGeometry} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#7a461b" roughness={0.5} metalness={0.2} />
        </mesh>
      )}

      {/* Inner incandescent flame core */}
      <mesh position={[0, -0.22, 0]}>
        <sphereGeometry args={[0.088, 16, 16]} />
        <meshBasicMaterial color="#fffbe6" />
      </mesh>

      {/* Soft warm point light */}
      <pointLight
        position={[0, -0.15, 0]}
        color={color}
        intensity={isSelected ? 3.2 : hovered ? 2.4 : 1.5}
        distance={6.0}
        decay={2}
      />

      {/* Soft atmospheric radial glow sprite */}
      <sprite ref={haloRef} position={[0, 0, 0]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={isSelected ? 0.72 : hovered ? 0.58 : 0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Interactive Floating 3D label for navigation lanterns */}
      {isInteractive && showTag && label && (
        <Html
          position={[0, -0.92, 0]}
          center
          distanceFactor={13}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <button
            type="button"
            className={`lantern-3d-tag ${isSelected ? 'active' : ''} ${hovered ? 'hovered' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              if (onSelect) onSelect(id)
            }}
            style={{ '--tag-accent': color }}
            aria-label={`Navigate to ${label}`}
          >
            <span className="tag-sparkle">✦</span>
            <span className="tag-label">{label}</span>
          </button>
        </Html>
      )}
    </group>
  )
}
