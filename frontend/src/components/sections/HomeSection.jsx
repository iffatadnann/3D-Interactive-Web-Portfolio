import { PERSONAL_INFO } from '../../data/portfolioData.js'
import PromoVideoCard from '../ui/PromoVideoCard.jsx'

export default function HomeSection({ onNavigate }) {
  return (
    <div className="section-content section-home">
      <div className="home-hero-card">
        <span className="hero-eyebrow">✦ WELCOME TO MY PORTFOLIO</span>
        <h3 className="hero-name">{PERSONAL_INFO.name}</h3>
        <p className="hero-role">{PERSONAL_INFO.role}</p>
        <p className="hero-intro">{PERSONAL_INFO.shortBio}</p>

        {/* Primary Call to Action Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            className="action-btn primary"
            onClick={() => onNavigate('projects')}
          >
            <span>Explore Projects</span>
            <span className="btn-arrow">→</span>
          </button>
          <button
            type="button"
            className="action-btn secondary"
            onClick={() => onNavigate('contact')}
          >
            <span>Contact Me</span>
            <span className="btn-icon">✉</span>
          </button>
        </div>
      </div>

      {/* Promotional Showreel Video Card */}
      <PromoVideoCard />

      {/* Focus Areas Highlights */}
      <div className="home-focus-grid">
        <div className="focus-card">
          <span className="focus-icon">🎮</span>
          <h4 className="focus-title">Game Development</h4>
          <p className="focus-desc">
            Building 2D, 3D, and immersive XR games in Unity, including the Final Year Project NoorQuest.
          </p>
        </div>
        <div className="focus-card">
          <span className="focus-icon">🏮</span>
          <h4 className="focus-title">3D Web Experiences</h4>
          <p className="focus-desc">
            Crafting real-time browser experiences using Three.js, React Three Fiber, and procedural lighting.
          </p>
        </div>
        <div className="focus-card">
          <span className="focus-icon">💻</span>
          <h4 className="focus-title">Software Engineering</h4>
          <p className="focus-desc">
            Developing full-stack web and mobile apps with React, Django REST, Python, and React Native.
          </p>
        </div>
      </div>

      {/* 3D Navigation Guide */}
      <div className="home-guide-card">
        <h4 className="guide-heading">✦ How to explore this portfolio:</h4>
        <ul className="guide-points">
          <li><strong>Orbit & Explore:</strong> Left-click and drag (or 1-finger swipe) to freely rotate the camera in 3D.</li>
          <li><strong>Zoom:</strong> Scroll your mouse wheel (or pinch on mobile) to get closer to the lanterns.</li>
          <li><strong>Lantern Navigation:</strong> Click any of the 7 glowing lanterns to fly directly to that section.</li>
          <li><strong>Bottom Dock:</strong> Use the dock at the bottom of the screen for quick, accessible navigation on any device.</li>
        </ul>
      </div>
    </div>
  )
}
