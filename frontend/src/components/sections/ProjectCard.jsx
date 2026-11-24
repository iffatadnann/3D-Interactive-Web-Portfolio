export default function ProjectCard({ project }) {
  const {
    title,
    highlight,
    description,
    tech = [],
    category,
    icon = '🏮',
    githubUrl,
    demoUrl,
  } = project

  return (
    <article className="project-card-full">
      {/* Visual Placeholder Banner */}
      <div className="card-visual-banner" aria-hidden="true">
        <div className="banner-glow-orb" />
        <span className="banner-icon">{icon}</span>
        <span className="banner-category-tag">{category}</span>
      </div>

      <div className="card-main-content">
        <div className="card-header-row">
          <span className="project-highlight-badge">{highlight}</span>
          <h4 className="project-heading">{title}</h4>
        </div>

        <p className="project-description-text">{description}</p>

        {/* Technology Tags */}
        <div className="project-tech-chips" aria-label="Technologies used">
          {tech.map((item, idx) => (
            <span key={idx} className="tech-chip">
              {item}
            </span>
          ))}
        </div>

        {/* Links or Editable Link Placeholders */}
        <div className="project-links-row">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="proj-link-btn"
            >
              <span>GitHub Code</span>
              <span className="link-arrow">↗</span>
            </a>
          ) : (
            <span className="proj-link-placeholder" title="Add GitHub repository link">
              <span className="ph-icon">⌥</span> [GitHub Repo - Add Link]
            </span>
          )}

          {demoUrl && (
  <a
    href={demoUrl}
    target="_blank"
    rel="noreferrer"
    className="proj-link-btn primary"
  >
    <span>Live Demo</span>
    <span className="link-arrow">↗</span>
  </a>
)}
        </div>
      </div>
    </article>
  )
}
