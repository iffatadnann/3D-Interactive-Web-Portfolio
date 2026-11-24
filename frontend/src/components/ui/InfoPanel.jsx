import { useEffect, useRef } from 'react'
import HomeSection from '../sections/HomeSection.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import SkillsSection from '../sections/SkillsSection.jsx'
import ProjectsSection from '../sections/ProjectsSection.jsx'
import EducationSection from '../sections/EducationSection.jsx'
import AchievementsSection from '../sections/AchievementsSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'

export default function InfoPanel({
  activeSection,
  onClose,
  onNavigate,
  allSections = [],
}) {
  const panelRef = useRef()

  // Auto-scroll content to top whenever the active section changes
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0
    }
  }, [activeSection?.id])

  if (!activeSection) return null

  const { id, label, tagline, color } = activeSection

  return (
    <aside
      className="info-panel"
      ref={panelRef}
      role="dialog"
      aria-label={`${label} portfolio section`}
      onPointerDown={(e) => e.stopPropagation()} // Prevent 3D orbit gestures while scrolling inside panel
    >
      {/* Panel Header */}
      <header className="panel-header">
        <div className="header-meta">
          <span className="panel-badge" style={{ '--accent': color }}>
            ✦ {tagline}
          </span>
          <h2 className="panel-title">{label}</h2>
        </div>
        <button
          type="button"
          className="panel-close-btn"
          onClick={onClose}
          aria-label="Close section panel and return to 3D sky view"
        >
          ×
        </button>
      </header>

      {/* Main Content Area - Modular Sections */}
      <div className="panel-body">
        {id === 'home' && <HomeSection onNavigate={onNavigate} />}
        {id === 'about' && <AboutSection />}
        {id === 'skills' && <SkillsSection />}
        {id === 'projects' && <ProjectsSection />}
        {id === 'education' && <EducationSection />}
        {id === 'achievements' && <AchievementsSection />}
        {id === 'contact' && <ContactSection />}
      </div>

      {/* Footer Quick-Switch Navigation between all 7 sections */}
      <footer className="panel-footer">
        <span className="switch-hint">Explore other sections:</span>
        <div className="quick-switch-pills">
          {allSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`quick-pill ${sec.id === id ? 'active' : ''}`}
              onClick={() => onNavigate(sec.id)}
              style={{ '--pill-accent': sec.color }}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </footer>
    </aside>
  )
}
