
import { PERSONAL_INFO } from '../../data/portfolioData.js'

export default function AboutSection() {
  return (
    <div className="section-content section-about">

      <div className="about-intro-block">
        <h3 className="section-subtitle">
          Bridging Technology & Creativity
        </h3>
        <p className="lead-paragraph">
          {PERSONAL_INFO.shortBio}
        </p>
      </div>

      <div className="about-card">
        <div className="card-badge">✦ BACKGROUND</div>
        <h4 className="about-card-title">A Little About Me</h4>
        <p className="about-card-text">
          I am a final-year Computer Science student specializing
          in Gaming & Animation. My interests lie in game development,
          interactive experiences, and creative software development.
          I enjoy exploring how technology and creativity can come
          together to build engaging digital experiences.
        </p>
      </div>

      <div className="about-card">
        <div className="card-badge">✦ WHAT I DO</div>
        <h4 className="about-card-title">Development & Projects</h4>
        <p className="about-card-text">
          I have worked on 2D and 3D games, VR applications, and
          web development projects. My experience includes building
          games with Unity and C#, developing web applications with
          Python and Django, and experimenting with interactive 3D
          environments using Three.js.
        </p>
      </div>

      <div className="about-card">
        <div className="card-badge">✦ MY APPROACH</div>
        <h4 className="about-card-title">Always Learning, Always Building</h4>
        <p className="about-card-text">
          I enjoy learning by working on practical projects,
          experimenting with new tools, and solving development
          challenges. I believe every project is an opportunity
          to improve my skills, understand technology better,
          and turn ideas into something meaningful.
        </p>
      </div>

    </div>
  )
}
