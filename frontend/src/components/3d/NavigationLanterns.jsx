import Lantern from '../Lantern.jsx'

// Renders the six dedicated interactive navigation lanterns
export default function NavigationLanterns({ destinations = [], activeId, onSelect }) {
  return (
    <group name="navigation-lanterns">
      {destinations.map((dest, index) => {
        const isSelected = activeId === dest.id
        const isHome = dest.id === 'home'

        return (
          <Lantern
            key={dest.id}
            id={dest.id}
            label={dest.label}
            color={dest.color}
            glowColor={dest.glowColor}
            shapeType={dest.shapeType || 'standard'}
            position={dest.position}
            isSelected={isSelected}
            isInteractive={true}
            onSelect={onSelect}
            floatSpeed={0.8 + index * 0.1}
            floatAmp={0.2 + (index % 3) * 0.04}
            driftAmp={0.12 + (index % 2) * 0.03}
            rotSpeed={0.1 + (index % 3) * 0.03}
            phase={index * 1.35}
            scale={isHome ? 1.18 : 1.05}
            showTag={true}
          />
        )
      })}
    </group>
  )
}
