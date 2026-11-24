import { SKILLS_DATA } from '../../data/portfolioData.js'

export default function SkillsSection() {
  return (
    <div className="section-content section-skills">
      <p className="skills-overview-lead">
        A structured overview of the programming languages, frameworks, game engines, and developer tools I work with.
      </p>

      <div className="skills-categories-grid">
        {SKILLS_DATA.map((cat, idx) => (
          <div key={idx} className="skill-category-card">
            <div className="cat-header">
              <span className="cat-badge">✦ CATEGORY {idx + 1}</span>
              <h4 className="cat-name">{cat.category}</h4>
            </div>
            <p className="cat-desc">{cat.description}</p>
            <div className="cat-skills-list">
              {cat.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-chip">
                  <span className="chip-dot" />
                  <span className="chip-text">{skill}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-note-card">
        <span>✦</span> Skills are based on practical coursework, games, and applications developed throughout my degree.
      </div>
    </div>
  )
}
