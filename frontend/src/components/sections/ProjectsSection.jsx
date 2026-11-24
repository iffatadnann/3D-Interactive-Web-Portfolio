import { useState } from 'react'
import { PROJECTS_DATA } from '../../data/portfolioData.js'
import ProjectCard from './ProjectCard.jsx'
import PromoVideoCard from '../ui/PromoVideoCard.jsx'

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Categories list for filtering
  const filterCategories = [
    'All',
    'Game Development',
    '3D Web Experiences',
    'Web Development',
    'Mobile Development',
    'Software Development',
  ]

  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedFilter)

  return (
    <div className="section-content section-projects">
      <div className="projects-intro-bar">
        <p className="projects-count">
          Showing <strong>{filteredProjects.length}</strong> of {PROJECTS_DATA.length} projects
        </p>

        {/* Category filter pills */}
        <div className="projects-filter-pills" role="tablist" aria-label="Filter projects by category">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Gallery Grid */}
      <div className="projects-gallery-list">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
