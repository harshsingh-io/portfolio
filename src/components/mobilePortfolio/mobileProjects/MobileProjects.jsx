import React, { useState, useEffect, useRef } from 'react'
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  // For slider functionality
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const sliderRef = useRef(null)
  const [slidesPerView, setSlidesPerView] = useState(2)

  // Your actual projects data from Portfolio.jsx
  const projects = [
    // Featured projects from your JSON
    {
      name: 'AI Fashion Stylist App',
      shortDescription:
        'AI-powered fashion app with personalized clothing recommendations and style assistance',
      description:
        'An AI-powered fashion application that provides personalized clothing recommendations based on user preferences, body type, and current fashion trends. Features smart outfit suggestions and style assistance.',
      technologies: ['Flutter', 'TensorFlow', 'AI/ML', 'FastAPI'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/lulu_stylist_app',
      websiteLink: '#',
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
      name: 'Passport Seva Android App',
      shortDescription:
        'Modern Android application for accessing passport services offered by the Ministry of External Affairs, India',
      description:
        'A modern Android application that provides a digital interface for accessing passport services offered by the Ministry of External Affairs, India. Built with Jetpack Compose and following Clean Architecture principles, this app simplifies the passport application process, appointment booking, and application status tracking with an intuitive user interface.',
      technologies: [
        'Android',
        'Kotlin',
        'Jetpack Compose',
        'Material Design 3',
        'Clean Architecture',
        'MVVM',
        'Coroutines & Flow',
        'Dagger Hilt',
        'Navigation Component',
        'Room Database',
        'Retrofit',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/passport-seva',
      websiteLink: '#',
      screenshots: [
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/passportMockup.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/homePage.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/appointmentBookingScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/feeCalculatorScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/dark_theme/documentAdvisorScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/loginScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/registrationScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/appointmentBookingDateAndTimeScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/appointmentDetiailsScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/documentAdvisorScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/annexuresScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/faqScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/profileScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/editProfileScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/light_theme/servicesScreen.png?raw=true',
        'https://github.com/harshsingh-io/passport-seva/blob/main/screenshots/dark_theme/homeScreen.png?raw=true',
      ],
      demoVideoId: '1VSdQYoRXCivt442kYAqxiPsILtdZYNDI',
      featured: true,
    },
    {
      id: 'ai-fashion-backend',
      name: 'AI Stylist App Backend',
      shortDescription:
        'Robust and scalable FastAPI backend for AI fashion recommendations',
      description:
        'A robust and scalable FastAPI backend for the AI Stylist App that provides personalized fashion advice through an AI chat interface, wardrobe management, and user profile customization.',
      technologies: [
        'FastAPI',
        'PostgreSQL',
        'MongoDB',
        'OpenAI API',
        'AWS S3',
        'Docker',
        'JWT Authentication',
        'Alembic',
      ],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/yourusername/ai-stylist-backend',
      websiteLink: 'http://54.197.163.177:8000/docs',
      screenshots: [
        'https://github.com/harshsingh-io/certifications-and-achievements/blob/main/aifashionbackendMockup.png?raw=true',
      ],
      demoVideo: '',
      featured: true,
    },
    {
      id: 'freshness-analysis',
      name: 'Freshness Analysis of Fruits Using Deep Learning',
      shortDescription:
        'AI-based freshness detection for fruits using deep learning',
      description:
        "This project utilizes a deep learning model to analyze the freshness of fruits from images. The project has gone through multiple versions to improve model accuracy and real-world applicability. The current version (v2) integrates model fine-tuning and real-world use-case predictions, building upon the previous version's (v1) baseline model.",
      technologies: ['TensorFlow', 'Keras', 'Python', 'VGG16'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/fruit_freshness_analysis',
      websiteLink: 'https://demo.example.com/freshness-analysis',
      screenshots: [
        'https://github.com/harshsingh-io/certifications-and-achievements/blob/main/freshnessAnalysisMockup.png?raw=true',
      ],
      demoVideoId: '',
      featured: true,
    },
    {
      id: 'tensix-website',
      name: 'Tensix Media Softech Website',
      shortDescription: 'Professional website for tech company',
      description:
        'A responsive, modern website for Tensix Media Softech, featuring company services, portfolio showcase, team profiles, and client testimonials with seamless mobile integration.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/tensixmedia',
      websiteLink: 'https://demo.example.com/tensix',
      screenshots: [
        'https://github.com/harshsingh-io/certifications-and-achievements/blob/main/tensixmediaMockup.png?raw=true',
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
        'https://github.com/harshsingh-io/certifications-and-achievements/blob/main/empowerverseMockup.png?raw=true',
      ],
      demoVideo: '#',
      featured: true,
    },
    {
      id: 'testline-quiz',
      name: 'Testline Quiz App',
      shortDescription:
        'Modern, feature-rich interactive quiz app with gamification elements',
      description:
        'A modern, feature-rich quiz application built with Flutter that offers an engaging and interactive quiz-taking experience with gamification elements.',
      technologies: ['Flutter', 'http', 'flutter_markdown', 'confetti'],
      appStoreLink: '#',
      playStoreLink:
        'https://github.com/harshsingh-io/testline_quiz_app/raw/main/app-debug.apk',
      githubLink: 'https://github.com/harshsingh-io/testline_quiz_app',
      websiteLink: '#',
      screenshots: [
        'https://github.com/harshsingh-io/certifications-and-achievements/blob/main/testlineQuizMockup.png?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/1.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/2.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/3.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/4.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/dark_theme/5.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/1.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/2.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/3.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/4.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/5.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/light_theme/6.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/1.jpg?raw=true',
        'https://github.com/harshsingh-io/testline_quiz_app/blob/main/assets/screenshots/2.jpg?raw=true',
      ],
      demoVideo: '14pQjzmEMRyg7yI5N2PDnCxA04VvqxWYE',
      featured: true,
    },
    {
      id: 'kanbanboard',
      name: 'Trello Clone: KanbanBoard',
      shortDescription:
        'A fully functional Kanban board with drag-and-drop functionality',
      description:
        'A fully functional Kanban board with drag-and-drop functionality. Organize tasks, manage projects, and collaborate with team members with this comprehensive project management tool.',
      technologies: ['Android', 'Kotlin', 'Firebase', 'Retrofit', 'MVVM'],
      appStoreLink: '#',
      playStoreLink: '#',
      githubLink: 'https://github.com/harshsingh-io/KanbanBoard',
      websiteLink: '',
      screenshots: [
        require('../../../assets/P6.webp'),
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/intro.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/signup.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/login.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/mainactivity.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/navigation.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/editprofile.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/taskandcard.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/searchmember.jpg?raw=true',
        'https://github.com/harshsingh-io/KanbanBoard/blob/main/Sample/boardmembers.jpg?raw=true',
      ],
      demoVideo: '1fwTLTl2HqU00ISOEnXdZZmKgwmUE15fG',
      featured: true,
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
      websiteLink: '',
      screenshots: [
        require('../../../assets/EcoSync.webp'),
        'https://github.com/harshsingh-io/EcoSync/blob/main/Splash_screen.png?raw=true',
        'https://github.com/harshsingh-io/EcoSync/blob/main/Authentication_page.png?raw=true',
        'https://github.com/harshsingh-io/EcoSync/blob/main/Sign_in.png?raw=true',
        'https://github.com/harshsingh-io/EcoSync/blob/main/HomePage.png?raw=true',
        'https://github.com/harshsingh-io/EcoSync/blob/main/StatisticPage.png?raw=true',
        'https://github.com/harshsingh-io/EcoSync/blob/main/UserProfile.png?raw=true',
      ],
      demoVideo: '',
      featured: false,
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
      websiteLink: '',
      screenshots: [
        require('../../../assets/P4.webp'),
        'https://github.com/harshsingh-io/WeatherCast/blob/main/Screenshots/Screenshot_20230902-220225.png?raw=true',
      ],
      demoVideo: '',
      featured: true,
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
        'https://github.com/harshsingh-io/quizie/blob/master/Screenshot_MainScreen.png?raw=true',
        'https://github.com/harshsingh-io/quizie/blob/master/Screenshot_DefaultQuestionScreen.png?raw=true',
        'https://github.com/harshsingh-io/quizie/blob/master/Screenshot_RightAnswer.png?raw=true',
        'https://github.com/harshsingh-io/quizie/blob/master/Screenshot_ScreenOnWrongAnswer.png?raw=true',
        'https://github.com/harshsingh-io/quizie/blob/master/Screenshot_ResultScreen.png?raw=true',
      ],
      demoVideo: '',
      featured: false,
    },
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
      screenshots: [require('../../../assets/P3.webp')],
      demoVideo: '#',
      featured: false,
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
      screenshots: [require('../../../assets/P2.webp')],
      featured: true,
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
      screenshots: [require('../../../assets/doodleit.webp')],
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

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1)
      } else {
        setSlidesPerView(2)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Navigation functions for the image slider in modal
  const nextImage = () => {
    if (!selectedProject || isAnimating) return

    setDirection('next')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.screenshots.length - 2 ? 0 : prevIndex + 1
      )
      setIsAnimating(false)
    }, 300)
  }

  const prevImage = () => {
    if (!selectedProject || isAnimating) return

    setDirection('prev')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.screenshots.length - 2 : prevIndex - 1
      )
      setIsAnimating(false)
    }, 300)
  }

  // Function to directly navigate to a specific image when clicking a dot
  const goToImage = (index) => {
    if (isAnimating || index === currentImageIndex || !selectedProject) return

    setDirection(index > currentImageIndex ? 'next' : 'prev')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsAnimating(false)
    }, 300)
  }

  // Project slider navigation functions
  const nextSlide = () => {
    if (isSliding) return

    const filteredProjs = filteredProjects()
    const maxSlide = Math.ceil(filteredProjs.length / slidesPerView) - 1

    if (currentSlide >= maxSlide) return

    setIsSliding(true)
    setDirection('next')

    setTimeout(() => {
      setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
      setIsSliding(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isSliding) return

    if (currentSlide <= 0) return

    setIsSliding(true)
    setDirection('prev')

    setTimeout(() => {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
      setIsSliding(false)
    }, 300)
  }

  const goToSlide = (index) => {
    if (isSliding || index === currentSlide) return

    setDirection(index > currentSlide ? 'next' : 'prev')
    setIsSliding(true)

    setTimeout(() => {
      setCurrentSlide(index)
      setIsSliding(false)
    }, 300)
  }

  // Reset slide when tab changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeTab])

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowVideo(false)
    setIsAnimating(false)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  // Preload images when a project is selected
  useEffect(() => {
    if (selectedProject && selectedProject.screenshots) {
      selectedProject.screenshots.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }
  }, [selectedProject])

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

  // Calculate slider display values
  const getSliderStyle = () => {
    return {
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: isSliding ? 'transform 0.3s ease-out' : 'none',
    }
  }

  const getVisibleProjects = () => {
    const filtered = filteredProjects()
    const totalSlides = Math.ceil(filtered.length / slidesPerView)
    const dots = Array.from({ length: totalSlides }, (_, i) => i)
    return { filtered, totalSlides, dots }
  }

  const { filtered, totalSlides, dots } = getVisibleProjects()

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

        {/* Project Slider instead of Grid */}
        <div className="projects-slider-container">
          <div
            className={`projects-slider sliding-${direction}`}
            ref={sliderRef}
            style={getSliderStyle()}
          >
            {filtered.map((project) => (
              <div
                className="slider-item"
                key={project.id || project.name}
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => openProjectDetails(project)}
                />
              </div>
            ))}
          </div>

          {/* Slider Navigation */}
          {filtered.length > slidesPerView && (
            <div className="slider-navigation">
              <button
                className={`slider-nav-button prev ${
                  currentSlide === 0 ? 'disabled' : ''
                }`}
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <FaChevronLeft />
              </button>
              <button
                className={`slider-nav-button next ${
                  currentSlide >= totalSlides - 1 ? 'disabled' : ''
                }`}
                onClick={nextSlide}
                disabled={currentSlide >= totalSlides - 1}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {/* Slider Pagination */}
          {filtered.length > slidesPerView && (
            <div className="slider-pagination">
              {dots.map((dot, index) => (
                <div
                  key={index}
                  className={`slider-dot ${
                    index === currentSlide ? 'active' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={closeProjectDetails}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeProjectDetails}>
                <FaTimes />
              </button>

              <div className="modal-body">
                <div className="modal-phone-container">
                  <div className="modal-phone">
                    <div className="phone-notch-modal"></div>
                    <div className="phone-screen-modal">
                      {(selectedProject.demoVideo ||
                        selectedProject.demoVideoId) && (
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

                      <div className="screen-content-modal">
                        {showVideo ? (
                          selectedProject.demoVideoId ? (
                            <iframe
                              src={`https://drive.google.com/file/d/${selectedProject.demoVideoId}/preview`}
                              width="100%"
                              height="100%"
                              allow="autoplay"
                              className="app-video-modal"
                              frameBorder="0"
                            ></iframe>
                          ) : selectedProject.demoVideo ? (
                            <video
                              src={selectedProject.demoVideo}
                              controls
                              className="app-video-modal"
                              poster={selectedProject.screenshots[0]}
                            />
                          ) : null
                        ) : (
                          <div
                            className={`screenshot-slider-modal ${
                              isAnimating ? `sliding-${direction}-modal` : ''
                            }`}
                          >
                            <img
                              src={
                                selectedProject.screenshots[
                                  currentImageIndex + 1
                                ] || selectedProject.screenshots[0]
                              }
                              alt={`${selectedProject.name} screenshot ${
                                currentImageIndex + 2
                              }`}
                              className="app-screenshot-modal"
                              key={currentImageIndex}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!showVideo && selectedProject.screenshots.length > 2 && (
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

                  {!showVideo && selectedProject.screenshots.length > 2 && (
                    <div className="pagination-dots-modal">
                      {selectedProject.screenshots.slice(1).map((_, index) => (
                        <div
                          key={index}
                          className={`pagination-dot-modal ${
                            index === currentImageIndex ? 'active' : ''
                          }`}
                          onClick={() => goToImage(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="project-details-modal">
                  <h3 className="modal-title">{selectedProject.name}</h3>

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
                    {selectedProject.appStoreLink &&
                    selectedProject.appStoreLink !== '#' ? (
                      <a
                        href={selectedProject.appStoreLink}
                        className="app-store-link-modal"
                      >
                        App Store
                      </a>
                    ) : (
                      <span className="app-store-link-modal disabled">
                        App Store
                      </span>
                    )}

                    {selectedProject.playStoreLink &&
                    selectedProject.playStoreLink !== '#' ? (
                      <a
                        href={selectedProject.playStoreLink}
                        className="play-store-link-modal"
                      >
                        Google Play
                      </a>
                    ) : (
                      <span className="play-store-link-modal disabled">
                        Google Play
                      </span>
                    )}
                  </div>

                  <div className="additional-links-modal">
                    {selectedProject.githubLink &&
                    selectedProject.githubLink !== '#' ? (
                      <a
                        href={selectedProject.githubLink}
                        className="github-link-modal"
                      >
                        <FaGithub /> View Code
                      </a>
                    ) : (
                      <span className="github-link-modal disabled">
                        <FaGithub /> View Code
                      </span>
                    )}

                    {selectedProject.websiteLink &&
                    selectedProject.websiteLink !== '#' ? (
                      <a
                        href={selectedProject.websiteLink}
                        className="website-link-modal"
                      >
                        <FaExternalLinkAlt /> Visit Website
                      </a>
                    ) : (
                      <span className="website-link-modal disabled">
                        <FaExternalLinkAlt /> Visit Website
                      </span>
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
