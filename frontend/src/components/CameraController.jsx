import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraController() {
  const { camera, pointer, viewport } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0.5, 10.5))

  useFrame(() => {
    // Determine responsive framing based on viewport aspect ratio
    const isMobile = viewport.width < 7.0 || viewport.aspect < 1.0

    // Smooth subtle mouse parallax
    const parallaxX = pointer.x * (isMobile ? 0.6 : 1.3)
    const parallaxY = pointer.y * (isMobile ? 0.4 : 0.7)

    // On mobile screens, move camera slightly back so all lanterns stay comfortably framed
    const targetZ = isMobile ? 13.8 : 10.5
    const targetY = (isMobile ? 0.1 : 0.5) + parallaxY
    const targetX = parallaxX

    targetPos.current.set(targetX, targetY, targetZ)

    // Smooth buttery lerp
    camera.position.lerp(targetPos.current, 0.035)
    camera.lookAt(0, 0.9, 0)
  })

  return null
}
