import {
  PERSONAL_INFO,
  SKILLS_DATA,
  PROJECTS_DATA,
  EDUCATION_DATA,
  ACHIEVEMENTS_DATA,
  CONTACT_DATA,
} from './portfolioData.js'

// Central navigation configuration for all 7 interactive portfolio lanterns
export const NAVIGATION_SECTIONS = [
  {
    id: 'home',
    label: 'Home',
    tagline: 'Welcome to the Festival',
    color: '#ffd700', // Radiant Royal Gold
    glowColor: '#ffaa00',
    shapeType: 'grand',
    position: [0, -1, 2.8],
    cameraOffset: [0, 0.4, 4.2],
    overview: 'Welcome to the interactive 3D portfolio of Iffat Adnan.',
    data: PERSONAL_INFO,
  },
  {
    id: 'about',
    label: 'About Me',
    tagline: 'Background & Philosophy',
    color: '#f59e0b', // Warm Amber Sunset
    glowColor: '#ff8800',
    shapeType: 'standard',
    position: [-4, 1.4, 0.8],
    cameraOffset: [1.2, 0.2, 3.6],
    overview: 'Academic background, creative vision, and technical passions.',
    data: PERSONAL_INFO,
  },
  {
    id: 'skills',
    label: 'Skills',
    tagline: 'Technologies & Toolset',
    color: '#38bdf8', // Celestial Sapphire Cyan
    glowColor: '#0ea5e9',
    shapeType: 'slender',
    position: [3.9, 1.9, 0.3],
    cameraOffset: [-1.2, 0.2, 3.5],
    overview: 'Programming, web, game development, 3D, and development tools.',
    data: SKILLS_DATA,
  },
  {
    id: 'projects',
    label: 'Projects',
    tagline: 'Selected Works',
    color: '#fbbf24', // Luminous Topaz
    glowColor: '#f59e0b',
    shapeType: 'flared',
    position: [3.2, -1.0, 1.8],
    cameraOffset: [-1.1, 0.3, 3.6],
    overview: 'A showcase of games, 3D browser simulations, mobile and web applications.',
    data: PROJECTS_DATA,
  },
  {
    id: 'education',
    label: 'Education',
    tagline: 'Academic Foundation',
    color: '#c084fc', // Mystic Amethyst
    glowColor: '#a855f7',
    shapeType: 'bell',
    position: [-2.9, -1.4, 2.0],
    cameraOffset: [1.1, 0.3, 3.6],
    overview: 'Degree, relevant coursework, and academic focus.',
    data: EDUCATION_DATA,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    tagline: 'Certifications & Honors',
    color: '#34d399', // Radiant Starlight Emerald
    glowColor: '#10b981',
    shapeType: 'flared',
    position: [-4.5, -0.1, -0.6],
    cameraOffset: [1.3, 0.2, 3.8],
    overview: 'Certifications in Django and AI Prompt Engineering, and capstone leadership.',
    data: ACHIEVEMENTS_DATA,
  },
  {
    id: 'contact',
    label: 'Contact',
    tagline: 'Get In Touch',
    color: '#fb7185', // Warm Coral / Rose Gold
    glowColor: '#f43f5e',
    shapeType: 'beacon',
    position: [4.6, -0.2, -0.6],
    cameraOffset: [-1.3, 0.2, 3.8],
    overview: 'Direct contact info, social links, and message form.',
    data: CONTACT_DATA,
  },
]
