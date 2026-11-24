// Standard accessible HTML navigation fallback for all 6 sections
export default function NavFallback({ destinations = [], activeId, onSelect }) {
  return (
    <nav className="lantern-dock" aria-label="Portfolio sections navigation">
      {destinations.map((item) => {
        const isActive = activeId === item.id

        return (
          <button
            key={item.id}
            type="button"
            className={`dock-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(isActive ? null : item.id)}
            style={{ '--accent-color': item.color }}
            aria-label={`Explore ${item.label} section`}
            aria-pressed={isActive}
          >
            <span className="dock-dot" />
            <span className="dock-text">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
