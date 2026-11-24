// Professional portfolio data for Iffat Adnan
// All editable fields are clearly identified and structured for easy maintenance.

export const PERSONAL_INFO = {
  name: 'Iffat Adnan',
  role: 'Final-year BS Computer Science / Gaming and Animation Student',
  shortBio:
    'Passionate about software development, game development, interactive 3D experiences, and creative technology. Experienced in building games with Unity and interactive web apps with React, Three.js, and Django.',
  academicBackground:
    'Final-year undergraduate student pursuing a Bachelor of Science in Computer Science with a specialization in Gaming and Animation.',
  interests: [
    'Software & Web Development',
    'Game Development (2D, 3D & XR)',
    'Interactive 3D Web Experiences'
  ],
  experienceSummary:
    'Hands-on experience working across modern development ecosystems including Unity, Python, Django, JavaScript, and Three.js. Driven by the harmony between creative art and rigorous software engineering.',
}

export const SKILLS_DATA = [
  {
    category: 'Programming',
    description: 'Core languages for game logic, web systems, and procedural development.',
    skills: ['Python', 'C#', 'JavaScript'],
  },
  {
    category: 'Web Development',
    description: 'Modern frontend interfaces, backend frameworks, and web architectures.',
    skills: ['React', 'Django', 'HTML', 'CSS'],
  },
  {
    category: 'Game Development',
    description: 'Game engines, interactive mechanics, and immersive environments.',
    skills: ['Unity', '2D/3D Game Development', 'XR Fundamentals'],
  },
  {
    category: '3D & Interactive Development',
    description: 'Real-time 3D rendering for the browser and digital asset modeling.',
    skills: ['Three.js', 'Blender Fundamentals'],
  },
  {
    category: 'Tools',
    description: 'Development environments, version control, and collaboration tools.',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
]

export const PROJECTS_DATA = [
  {
    id: 'noorquest',
    title: 'NoorQuest',
    highlight: 'Final-Year Project (Lead)',
    description:
      'An educational Islamic game developed in Unity designed to make learning engaging and interactive through thoughtful gameplay mechanics and immersive environments. Serving as project lead overseeing design, gameplay architecture, and implementation.',
    tech: ['Unity', 'C#', '3D Game Design', 'Educational Gaming'],
    category: 'Game Development',
    icon: '🎮',
    // Optional link fields to be populated later
    githubUrl: 'https://github.com/iffatadnann/NoorQuest' // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
  {
    id: 'vr-shooting',
    title: 'VR Shooting Game',
    highlight: 'Virtual Reality Experience',
    description:
      'An interactive virtual reality shooting game developed using Unity. Features immersive spatial audio, XR controller interactions, target mechanics, and realistic physical feedback in 3D virtual space.',
    tech: ['Unity', 'C#', 'XR Fundamentals', 'VR Interaction'],
    category: 'Game Development',
    icon: '🥽',
    githubUrl: 'https://github.com/iffatadnann/Shoot_The_Box', // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
  {
    id: '2d-platformer',
    title: '2D Platformer Game',
    highlight: 'Classic Gameplay Mechanics',
    description:
      'A responsive 2D platformer game built in Unity featuring physics-based movement, jump mechanics, dynamic obstacles, enemies,and collectables.',
    tech: ['Unity', 'C#', '2D Physics', 'Level Design'],
    category: 'Game Development',
    icon: '🕹️',
    githubUrl: 'https://github.com/iffatadnann/SuperJumpBoy', // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
  {
    id: 'tetris-python',
    title: 'Tetris Game',
    highlight: 'Classic Arcade Implementation',
    description:
      'A complete implementation of the classic Tetris game developed using Python. Features grid-based collision detection, tetromino rotation algorithms, line-clearing mechanics, and score tracking',
    tech: ['Python', 'Game Logic', 'Grid Algorithms'],
    category: 'Software Development',
    icon: '🧩',
    githubUrl: 'https://github.com/iffatadnann/Tetris_Tangled_Theme', // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
  {
    id: 'littlemargins',
    title: 'LittleMargins',
    highlight: 'Mobile Application',
    description:
      'A cross-platform mobile application developed using React Native and Expo. Focused on intuitive mobile UX, modular components, clean state management, and responsive layouts across iOS and Android.',
    tech: ['React Native', 'Expo', 'Mobile Development', 'JavaScript'],
    category: 'Mobile Development',
    icon: '📱',
    githubUrl: 'https://github.com/iffatadnann/JournalMobileApp', // Editable placeholder
    demoUrl: 'https://littlemargins--journal.expo.app/', // Editable placeholder
  },
  {
    id: 'minecraft-threejs',
    title: 'Minecraft-like Three.js Project',
    highlight: 'Browser 3D Voxel World',
    description:
      'A browser-based 3D voxel game developed using JavaScript and Three.js. Implements procedural block generation, first-person camera movement, voxel placement and destruction mechanics, and WebGL lighting.',
    tech: ['JavaScript', 'Three.js', '3D Voxel World', 'WebGL'],
    category: '3D Web Experiences',
    icon: '🧱',
    githubUrl: 'https://github.com/iffatadnann/minecraft_demo', // Editable placeholder
    demoUrl: 'https://lanternvale.netlify.app/', // Editable placeholder
  },
  {
    id: 'algorithm-time-analysis-visualiser',
    title: 'Algorithm & Time Analysis Visualiser',
    highlight: 'Algorithm Visualization & Performance Analysis',
    description:
      'A Python-based application designed to visualize algorithm execution and analyze time complexity. Demonstrates algorithm performance through execution-time measurements, graphical representations, and comparisons to help understand algorithm efficiency and computational complexity.',
    tech: ['Python', 'Algorithm Analysis', 'Time Complexity', 'Data Visualization'],
    category: 'Python Development',
    icon: '📊',
    githubUrl: 'https://github.com/iffatadnann/Algorithm_and_Time_Analysis_Visualiser', // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
  {
    id: 'django-school-portal',
    title: 'Django School Portal',
    highlight: 'Full-Stack Web Application',
    description:
      'A comprehensive web portal developed using Django for academic administration and management. Implements role-based access control, relational database modeling, and student/course record workflows.',
    tech: ['Python', 'Django', 'Web Application', 'Backend'],
    category: 'Web Development',
    icon: '🎓',
    githubUrl: 'https://github.com/iffatadnann/django-webapp-project', // Editable placeholder
    //demoUrl: '', // Editable placeholder
  },
]

export const EDUCATION_DATA = {
  degree: 'BS Computer Science / Gaming and Animation',
  university: 'NED University of Engineering and Technology, Karachi', // Editable placeholder
  duration: '2023 - 2027', // Editable placeholder
  status: 'Final-Year Undergraduate Student',
}

export const ACHIEVEMENTS_DATA = {
  certifications: [
    {
      title: 'Python Programming Advance - Django Certification',
      issuer: 'NED ACADEMY',
      date: '[October 2024 - December 2024]',
      description:
        'Certification in full-stack web development with the Python Django framework, covering ORM, views, templates, authentication, and REST APIs.',
    },
    {
      title: 'One Million Prompters – Prompt Engineering in AI',
      issuer: 'One Million Prompters',
      date: 'June 2026',
      description:
        'Professional training in AI prompt engineering, structured reasoning, generative workflows, and applied LLM integration.',
    },
  ],
  achievements: [
    {
      title: 'Final-Year Project Lead',
      project: 'NoorQuest (Unity Educational Islamic Game)',
      description:
        'Selected to lead the final-year project, coordinating technical development, game architecture, asset workflows, and milestone reviews.',
    },
  ],
}

export const CONTACT_DATA = {
  email: 'iffatadnan25@gmail.com',
  github: 'iffatadnann',
  githubUrl: 'https://github.com/iffatadnann', // Base link, editable
  linkedin: 'Iffat Adnan',
  linkedinUrl: 'https://www.linkedin.com/in/iffat-adnan-0a669b2b3/', // Base link, editable
  location: 'Karachi, Pakistan',
  availability: 'Available for game dev, full-stack, and 3D web opportunities.',
}
