import { ACHIEVEMENTS_DATA } from '../../data/portfolioData.js'

export default function AchievementsSection() {
  return (
    <div className="section-content section-achievements">
      <p className="achievements-intro-lead">
        Recognitions, professional certifications, and project milestones earned during my academic and development journey.
      </p>

      {/* Certifications Section */}
      <div className="achieve-group">
        <div className="group-header">
          <span className="group-badge">✦ PROFESSIONAL CREDENTIALS</span>
          <h4 className="group-title">Certifications</h4>
        </div>

        <div className="achieve-cards-list">
          {ACHIEVEMENTS_DATA.certifications.map((cert, idx) => (
            <div key={idx} className="cert-card">
              <div className="cert-icon-wrapper">
                <span className="cert-icon">📜</span>
              </div>
              <div className="cert-info">
                <div className="cert-meta-line">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <h5 className="cert-title">{cert.title}</h5>
                <p className="cert-desc">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic & Project Achievements Section */}
      <div className="achieve-group">
        <div className="group-header">
          <span className="group-badge">✦ PROJECT & ACADEMIC HONORS</span>
          <h4 className="group-title">Key Achievements</h4>
        </div>

        <div className="achieve-cards-list">
          {ACHIEVEMENTS_DATA.achievements.map((item, idx) => (
            <div key={idx} className="achievement-item-card">
              <div className="achieve-star-bullet">✦</div>
              <div className="achieve-content">
                <h5 className="achieve-title">{item.title}</h5>
                <span className="achieve-project-label">{item.project}</span>
                <p className="achieve-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  )
}
