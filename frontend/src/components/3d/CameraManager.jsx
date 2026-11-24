import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Cubic Ease-Out for luxurious cinematic transitions
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3)
}

export default function CameraManager({ activeId, destinations = [] }) {
  const { camera, viewport } = useThree()
  const controlsRef = useRef()

  // Responsive default overview configuration
  const isMobile = viewport.width < 7.2 || viewport.aspect < 1.0
  const defaultCamPos = useMemoVector(isMobile ? [0, 0.2, 13.8] : [0, 0.6, 10.8])
  const defaultTarget = useMemoVector([0, 0.8, 0])

  // Transition state references (avoiding re-renders inside frame loop)
  const isTransitioning = useRef(false)
  const progress = useRef(0)
  const transitionSpeed = useRef(1.4) // Completed in ~0.7-0.9s

  const startCamPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const targetCamPos = useRef(new THREE.Vector3())
  const targetTarget = useRef(new THREE.Vector3())

  // Trigger smooth transition whenever activeId changes
  useEffect(() => {
    if (!controlsRef.current) return

    // Capture current camera and target positions as starting points
    startCamPos.current.copy(camera.position)
    startTarget.current.copy(controlsRef.current.target)

    if (activeId) {
      // Find the selected lantern destination
      const dest = destinations.find((d) => d.id === activeId)
      if (dest) {
        const [lx, ly, lz] = dest.position
        const [ox, oy, oz] = dest.cameraOffset || [0, 0.3, 3.5]

        // On mobile portrait, adjust camera distance and height so the lantern remains
        // visible above the bottom information sheet
        if (isMobile) {
          targetCamPos.current.set(lx, ly + 0.45, lz + oz + 1.2)
          targetTarget.current.set(lx, ly + 0.15, lz)
        } else {
          // Desktop: offset lantern slightly to the left/center while info panel opens on the right
          targetCamPos.current.set(lx + ox, ly + oy, lz + oz)
          targetTarget.current.set(lx, ly, lz)
        }

        progress.current = 0
        isTransitioning.current = true
        // Temporarily disable manual controls during the fly-in transition
        controlsRef.current.enabled = false
      }
    } else {
      // Return to overview
      targetCamPos.current.copy(defaultCamPos)
      targetTarget.current.copy(defaultTarget)

      progress.current = 0
      isTransitioning.current = true
      controlsRef.current.enabled = false
    }
  }, [activeId, destinations, isMobile, defaultCamPos, defaultTarget, camera])

  useFrame((state, delta) => {
    if (!controlsRef.current) return

    if (isTransitioning.current) {
      // Advance transition
      progress.current = Math.min(1, progress.current + delta * transitionSpeed.current)
      const eased = easeOutCubic(progress.current)

      // Smoothly interpolate camera position and controls target
      camera.position.lerpVectors(startCamPos.current, targetCamPos.current, eased)
      controlsRef.current.target.lerpVectors(startTarget.current, targetTarget.current, eased)
      controlsRef.current.update()

      // When transition arrives, re-enable OrbitControls for interactive exploration
      if (progress.current >= 1) {
        isTransitioning.current = false
        controlsRef.current.enabled = true
      }
    } else {
      // Normal continuous OrbitControls update with smooth damping
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3.5}
      maxDistance={22.0}
      minPolarAngle={Math.PI / 4.5} // ~40° prevents viewing directly from ground
      maxPolarAngle={Math.PI / 1.7} // ~105° prevents awkward upside-down flips
      enablePan={false} // Keeps camera orbiting within the lantern universe
      rotateSpeed={0.8}
      zoomSpeed={0.9}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  )
}

function useMemoVector([x, y, z]) {
  const ref = useRef()
  if (!ref.current) {
    ref.current = new THREE.Vector3(x, y, z)
  }
  return ref.current
}
