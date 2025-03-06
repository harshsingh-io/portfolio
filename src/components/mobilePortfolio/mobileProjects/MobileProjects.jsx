import React, { useState } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
} from 'react-icons/fa'
import './mobile-projects.css'

// Define project type
const MobileProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Your actual projects data from Portfolio.jsx
  const projects = [
    // Featured projects from your JSON
    {
      name: 'AI Fashion Stylist App',
      description:
        'An AI-powered fashion application that provides personalized clothing recommendations based on user preferences, body type, and current fashion trends. Features smart outfit suggestions and style assistance.',
      technologies: ['Flutter', 'TensorFlow', 'AI/ML', 'FastAPI'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/yourusername/ai-fashion-app',
      websiteLink: 'https://demo.example.com/ai-fashion-app',
      screenshots: [
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/ai-fashion-mockup.png?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/1.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/2.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/4.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/5.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/6.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/7.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/8.jpg?raw=true',
        'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/9.jpg?raw=true',
      ],
      demoVideoId: '1tngnYXZliwu5czziU4tnQ8ymeX5zZpxT',
      featured: true,
    },
    {
      id: 'ai-fashion-backend',
      name: 'AI Fashion App Backend',
      shortDescription: 'Robust backend system for AI fashion recommendations',
      description:
        'The backend infrastructure for the AI Fashion App, handling user data, AI model training, fashion inventory management, and recommendation algorithms.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'TensorFlow', 'AWS'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/lulu_stylist_backend',
      websiteLink: 'https://demo.example.com/ai-fashion-backend',
      screenshots: [
        '/api/placeholder/800/600',
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'freshness-analysis',
      name: 'Fruit & Vegetable Freshness Analysis',
      shortDescription: 'AI-based freshness detection for produce',
      description:
        'A mobile application that uses computer vision and machine learning to detect the freshness of fruits and vegetables, helping users reduce food waste and ensure quality.',
      technologies: ['Flutter', 'TensorFlow Lite', 'Python', 'OpenCV'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/fruit_freshness_analysis',
      websiteLink: 'https://demo.example.com/freshness-analysis',
      screenshots: [
        '/api/placeholder/800/600',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/1.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/2.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/3.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/4.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/5.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/1.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/2.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/3.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/4.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/5.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/6.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/1.jpg',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/2.jpg',
      ],
      demoVideo: '#',
      featured: true,
    },
    // {
    //   id: 'ml-model-deployment',
    //   name: 'ML Model Deployment',
    //   shortDescription: 'Streamlined deployment of machine learning models',
    //   description:
    //     'A framework for efficiently deploying machine learning models to mobile and web platforms, with optimization for on-device inference and real-time predictions.',
    //   technologies: [
    //     'TensorFlow',
    //     'Docker',
    //     'Kubernetes',
    //     'Flask',
    //     'React Native',
    //   ],
    //   appStoreLink: '#',
    //   playStoreLink: '#',
    //   githubLink: 'https://github.com/harshsingh-io/fruit_freshness_analysis',
    //   websiteLink: 'https://demo.example.com/ml-deployment',
    //   screenshots: [
    //     '/api/placeholder/800/600',
    //     require('../../../assets/mobile-showcase/screenshot1.png'),
    //     require('../../../assets/mobile-showcase/screenshot2.png'),
    //   ],
    //   demoVideo: '#',
    //   featured: true,
    // },
    {
      id: 'tensix-website',
      name: 'Tensix Media Softech Website',
      shortDescription: 'Professional website for tech company',
      description:
        'A responsive, modern website for Tensix Media Softech, featuring company services, portfolio showcase, team profiles, and client testimonials with seamless mobile integration.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Firebase'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/tensixmedia',
      websiteLink: 'https://demo.example.com/tensix',
      screenshots: [
        '/api/placeholder/800/600',
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'empowerverse',
      name: 'Empowerverse | Hopecore',
      shortDescription: 'Platform for community empowerment initiatives',
      description:
        'A digital platform connecting communities with empowerment resources, educational content, and social initiatives through an intuitive mobile interface and engaging user experience.',
      technologies: [
        'React Native',
        'Firebase',
        'Node.js',
        'Express',
        'MongoDB',
      ],
      appStoreLink: '#',
      playStoreLink:
        'https://play.google.com/store/apps/details?id=com.empowerverse.app&hl=en_IN',
      githubLink: '#',
      websiteLink: 'https://demo.example.com/empowerverse',
      screenshots: [
        '/api/placeholder/800/600',
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'testline-quiz',
      name: 'Testline Quiz App',
      shortDescription: 'Interactive educational quizzing platform',
      description:
        'An educational quiz application designed for students and educators, featuring customizable quizzes, performance analytics, and a comprehensive question bank across various subjects.',
      technologies: ['React Native', 'Redux', 'Firebase', 'Cloud Functions'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/testline_quiz_app',
      websiteLink: 'https://demo.example.com/testline',
      screenshots: [
        '/api/placeholder/800/600',
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },

    // Your original mobile projects
    {
      id: 'bodysync',
      name: 'BodySync: Workout App',
      shortDescription:
        'Your personal fitness companion with custom workout plans',
      description:
        'Your personal fitness companion with custom workout plans. Track your progress, get fitness tips, and achieve your health goals with personalized workout routines.',
      technologies: [
        'Kotlin',
        'Android SDK',
        'Room Database',
        'MVVM Architecture',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/BodySync',
      websiteLink:
        'https://github.com/harshsingh-io/BodySync/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/P3.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'weathercast',
      name: 'WeatherCast',
      shortDescription:
        'Real-time weather updates with beautiful visualizations',
      description:
        'Real-time weather updates with beautiful visualizations. Get accurate forecasts, radar maps, and weather alerts for your location and anywhere in the world.',
      technologies: ['Kotlin', 'Android SDK', 'OpenWeatherMap API', 'MVVM'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/WeatherCast',
      websiteLink:
        'https://github.com/harshsingh-io/WeatherCast/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/P4.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'memorywhisper',
      name: 'MemoryWhisper: HappyPlace App',
      shortDescription: 'Capture and preserve your precious memories',
      description:
        'Capture and preserve your precious memories with location tagging and details. Record the special moments of your life with photos, descriptions, and exact locations to revisit later.',
      technologies: [
        'Kotlin',
        'Google Maps API',
        'Room Database',
        'Camera API',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/MemoryWhisper',
      websiteLink:
        'https://github.com/harshsingh-io/MemoryWhisper/tree/main#demo',
      screenshots: [
        require('../../../assets/P2.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      featured: true,
    },
    {
      id: 'kanbanboard',
      name: 'Trello Clone: KanbanBoard',
      shortDescription:
        'A fully functional Kanban board with drag-and-drop functionality',
      description:
        'A fully functional Kanban board with drag-and-drop functionality. Organize tasks, manage projects, and collaborate with team members with this comprehensive project management tool.',
      technologies: ['Android', 'Kotlin', 'Firebase', 'Drag & Drop API'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/KanbanBoard',
      websiteLink:
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/P6.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: false,
    },
    {
      id: 'ecosync',
      name: 'EcoSync: Electricity Tracking',
      shortDescription:
        'Monitor and optimize your electricity usage in real-time',
      description:
        'Monitor and optimize your electricity usage in real-time. Track consumption patterns, set goals, and receive energy-saving tips to reduce your carbon footprint and utility bills.',
      technologies: [
        'Kotlin',
        'Android SDK',
        'Data Visualization',
        'IoT Integration',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/EcoSync',
      websiteLink:
        'https://github.com/harshsingh-io/EcoSync/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/EcoSync.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      featured: false,
    },
    {
      id: 'doodleit',
      name: 'DoodleIt: Drawing App',
      shortDescription:
        'Express your creativity with this digital drawing tool',
      description:
        'Express your creativity with this digital drawing tool. Choose from various brush sizes and colors to create beautiful artwork, save your creations, and share them with friends.',
      technologies: [
        'Kotlin',
        'Canvas API',
        'Custom Views',
        'Image Processing',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/DoodleIt',
      websiteLink:
        'https://github.com/harshsingh-io/DoodleIt/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/doodleit.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: false,
    },
    {
      id: 'quizie',
      name: 'Quizie: Quiz App',
      shortDescription: 'Test your knowledge with interactive quizzes',
      description:
        'Test your knowledge with interactive quizzes across various categories. Challenge yourself with timed questions, track your progress, and compete with friends on the leaderboard.',
      technologies: ['Kotlin', 'Firebase', 'Material Design', 'Animation API'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/quizie',
      websiteLink:
        'https://github.com/harshsingh-io/quizie/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/P5.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      demoVideo: '#',
      featured: false,
    },
    {
      id: 'calculator',
      name: 'Calculator',
      shortDescription: 'A sleek and functional calculator application',
      description:
        'A sleek and functional calculator application with both basic and scientific operations. Perform calculations with a clean interface and save calculation history for future reference.',
      technologies: ['Android', 'Kotlin', 'Material Design', 'Custom Views'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/calculator',
      websiteLink:
        'https://github.com/harshsingh-io/calculator/blob/main/README.md#demo',
      screenshots: [
        require('../../../assets/P1.webp'),
        require('../../../assets/mobile-showcase/screenshot1.png'),
        require('../../../assets/mobile-showcase/screenshot2.png'),
      ],
      featured: false,
    },
  ]

  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProject.screenshots.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProject.screenshots.length - 1 : prevIndex - 1
    )
  }

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowVideo(false)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
    document.body.style.overflow = '' // Re-enable scrolling
  }

  const filteredProjects = () => {
    switch (activeTab) {
      case 'featured':
        return projects.filter((p) => p.featured)
      case 'android':
        return projects.filter(
          (p) =>
            p.technologies.includes('Android') ||
            p.technologies.includes('Kotlin') ||
            p.technologies.includes('Android SDK')
        )
      case 'ai':
        return projects.filter(
          (p) =>
            p.technologies.includes('AI/ML') ||
            p.technologies.includes('TensorFlow') ||
            p.technologies.includes('Machine Learning') ||
            p.technologies.includes('TensorFlow Lite') ||
            p.name.includes('AI') ||
            p.description.includes('AI') ||
            p.description.includes('machine learning')
        )
      default:
        return projects
    }
  }

  return (
    <div className="mobile-projects-container">
      <div className="container">
        <p className="subtitle">
          Explore my portfolio of mobile applications, showcasing my skills in
          UI/UX design, frontend and backend development, and cross-platform
          technologies.
        </p>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </button>
            <button
              className={`tab-button ${
                activeTab === 'featured' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('featured')}
            >
              Featured
            </button>
            <button
              className={`tab-button ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              AI/ML
            </button>
            <button
              className={`tab-button ${
                activeTab === 'android' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('android')}
            >
              Android
            </button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects().map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => openProjectDetails(project)}
            />
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={closeProjectDetails}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedProject.name}</h3>
                <button className="close-button" onClick={closeProjectDetails}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-phone-container">
                  <div className="modal-phone">
                    <div className="phone-notch-modal"></div>
                    <div className="phone-screen-modal">
                      {/* Toggle button at the top */}
                      {selectedProject.demoVideo && (
                        <div className="media-toggle-modal">
                          <div className="toggle-buttons-modal">
                            <button
                              className={`toggle-button-modal ${
                                !showVideo ? 'active' : ''
                              }`}
                              onClick={() => setShowVideo(false)}
                            >
                              Images
                            </button>
                            <button
                              className={`toggle-button-modal ${
                                showVideo ? 'active' : ''
                              }`}
                              onClick={() => setShowVideo(true)}
                            >
                              Video
                            </button>
                          </div>
                        </div>
                      )}

                      {/* App screenshot or video */}
                      <div className="screen-content-modal">
                        {showVideo && selectedProject.demoVideo ? (
                          <video
                            src={selectedProject.demoVideo}
                            controls
                            className="app-video-modal"
                            poster={selectedProject.screenshots[0]}
                          />
                        ) : (
                          <img
                            src={selectedProject.screenshots[currentImageIndex]}
                            alt={`${selectedProject.name} screenshot ${
                              currentImageIndex + 1
                            }`}
                            className="app-screenshot-modal"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  {!showVideo && selectedProject.screenshots.length > 1 && (
                    <div className="image-navigation-modal">
                      <button
                        className="nav-button-modal prev"
                        onClick={prevImage}
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        className="nav-button-modal next"
                        onClick={nextImage}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  )}

                  {/* Pagination dots */}
                  {!showVideo && selectedProject.screenshots.length > 1 && (
                    <div className="pagination-dots-modal">
                      {selectedProject.screenshots.map((_, index) => (
                        <div
                          key={index}
                          className={`pagination-dot-modal ${
                            index === currentImageIndex ? 'active' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="project-details-modal">
                  <p className="project-description-modal">
                    {selectedProject.description}
                  </p>

                  <div className="technologies-modal">
                    <h4 className="technologies-title-modal">
                      Technologies Used
                    </h4>
                    <div className="technology-badges-modal">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="badge-modal">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="download-links-modal">
                    {selectedProject.appStoreLink && (
                      <a
                        href={selectedProject.appStoreLink}
                        className="app-store-link-modal"
                      >
                        App Store
                      </a>
                    )}
                    {selectedProject.playStoreLink && (
                      <a
                        href={selectedProject.playStoreLink}
                        className="play-store-link-modal"
                      >
                        Google Play
                      </a>
                    )}
                  </div>

                  <div className="additional-links-modal">
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        className="github-link-modal"
                      >
                        <FaGithub /> View Code
                      </a>
                    )}
                    {selectedProject.websiteLink && (
                      <a
                        href={selectedProject.websiteLink}
                        className="website-link-modal"
                      >
                        <FaExternalLinkAlt /> Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-image-container">
        <img
          src={project.screenshots[0]}
          alt={project.name}
          className="project-image"
        />
        {project.featured && <div className="featured-badge">Featured</div>}
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.name}</h3>
        <p className="project-short-description">{project.shortDescription}</p>
        <div className="project-technologies">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="project-tech-badge">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="project-tech-badge more">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
      <div className="project-footer">
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  )
}

export default MobileProjects
