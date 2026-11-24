import { useState } from 'react'
import LanternScene from './components/LanternScene.jsx'
import InfoPanel from './components/ui/InfoPanel.jsx'
import NavFallback from './components/ui/NavFallback.jsx'
import ChatbotLauncher from './components/chatbot/ChatbotLauncher.jsx'
import ChatbotWindow from './components/chatbot/ChatbotWindow.jsx'
import { NAVIGATION_SECTIONS } from './data/navigationData.js'

export default function App() {
  const [active, setActive] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const selectedSection = NAVIGATION_SECTIONS.find((item) => item.id === active)

  const handleSelect = (id) => {
    // If the same section is clicked again, deselect and return to overview
    setActive((prev) => (prev === id ? null : id))
  }

  return (
    <main className="sky">
      {/* 3D Real-time R3F Environment with 7 Navigation Lanterns & OrbitControls */}
      <LanternScene
        destinations={NAVIGATION_SECTIONS}
        active={active}
        onSelect={handleSelect}
      />

      {/* Top Header UI */}
      <header className="topbar">
        <button
          type="button"
          className="brand"
          onClick={() => handleSelect('home')}
          aria-label="Return to Home section"
        >
          ✦ IFFAT ADNAN • PORTFOLIO
        </button>
        <span className="top-note">Drag to orbit • Scroll to zoom • Click lanterns to explore</span>
      </header>

      {/* Center Welcome Intro (subtly fades when an information panel is active) */}
      <section className={`intro ${active ? 'dimmed' : ''}`} id="home">
        <p className="eyebrow">PORTFOLIO OF IFFAT ADNAN</p>
        <h1>Every light has<br /><em>a story.</em></h1>
        <p className="intro-copy">
          Final-year BS Computer Science / Gaming and Animation student.
          <br />
          Explore games, 3D web simulations, full-stack applications, and creative technology.
        </p>

        {/* Quick entry buttons */}
        <div className="intro-quick-buttons">
          <button
            type="button"
            className="intro-btn primary"
            onClick={() => handleSelect('projects')}
          >
            Explore Projects ✦
          </button>
          <button
            type="button"
            className="intro-btn secondary"
            onClick={() => handleSelect('contact')}
          >
            Get in Touch ✉
          </button>
        </div>
      </section>

      {/* Normal Accessible HTML Navigation Fallback Dock */}
      <NavFallback
        destinations={NAVIGATION_SECTIONS}
        activeId={active}
        onSelect={handleSelect}
      />

      {/* Elegant Translucent Information Panel for the Selected Section */}
      {selectedSection && (
        <InfoPanel
          activeSection={selectedSection}
          onClose={() => setActive(null)}
          onNavigate={(id) => setActive(id)}
          allSections={NAVIGATION_SECTIONS}
        />
      )}

      {/* Bottom Footer UI */}
      <footer className="footer">
        <span>Iffat Adnan • Computer Science - Gaming and Animation ✦</span>
        <span>Left-click drag to orbit scene • Touch & pinch supported</span>
      </footer>

      {/* RAG Chatbot UI Components */}
      <ChatbotLauncher
        isOpen={chatOpen}
        onToggle={() => setChatOpen((prev) => !prev)}
      />
      <ChatbotWindow
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </main>
  )
}
