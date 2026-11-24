import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Atmosphere from './Atmosphere.jsx'
import StarField from './StarField.jsx'
import LanternFlock from './LanternFlock.jsx'
import NavigationLanterns from './3d/NavigationLanterns.jsx'
import CameraManager from './3d/CameraManager.jsx'
import AvatarCompanion from './3d/AvatarCompanion.jsx'

export default function LanternScene({ destinations = [], active, onSelect }) {
  return (
    <div className="canvas-container" aria-hidden="false">
      <Canvas
        camera={{ position: [0, 0.6, 11], fov: 55, near: 0.1, far: 140 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Deep night sky atmospheric lighting & fog */}
          <Atmosphere />

          {/* 2,200 twinkling procedural stars */}
          <StarField count={2200} />

          {/* 52 non-interactive ambient floating background lanterns */}
          <LanternFlock count={52} />

          {/* The six dedicated interactive portfolio navigation lanterns */}
          <NavigationLanterns
            destinations={destinations}
            activeId={active}
            onSelect={onSelect}
          />

          {/* 3D Avatar Guide Companion */}
          <AvatarCompanion position={[-7.5, 1, 1]} />

          {/* OrbitControls exploration with coordinated smooth camera fly-to transitions */}
          <CameraManager
            activeId={active}
            destinations={destinations}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
