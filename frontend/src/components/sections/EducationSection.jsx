import { EDUCATION_DATA } from '../../data/portfolioData.js'

export default function EducationSection() {
  return (
    <div className="section-content section-education">
      {/* Primary Degree Card */}
      <div className="degree-hero-card">
        <span className="edu-badge">✦ CURRENT DEGREE</span>
        <h3 className="degree-title">{EDUCATION_DATA.degree}</h3>
        <div className="edu-meta-row">
          <span className="edu-univ">
            <span className="meta-icon">🏛</span> {EDUCATION_DATA.university}
          </span>
          <span className="edu-duration">
            <span className="meta-icon">🗓</span> {EDUCATION_DATA.duration}
          </span>
        </div>
        <p className="edu-status-note">
          Status: <strong>{EDUCATION_DATA.status}</strong>
        </p>
      </div>

      {/* Academic Milestones & Capstone Note */}
      <div className="edu-notes-card">
        <div className="card-badge">✦ CAPSTONE LEADERSHIP</div>
        <h4 className="notes-heading">Final-Year Project</h4>
        <p className="notes-text">
          Leading the capstone project <strong>NoorQuest</strong>, an educational 3D game in Unity designed to provide interactive cultural and spiritual learning. Coordinates game physics, 3D assets, UI flows, and modular C# scripting.
        </p>
      </div>
    </div>
  )
}