import React from 'react'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import './portfolio.css'
import CALCI from '../../assets/P1.webp'
import QUIZIE from '../../assets/P5.webp'
import WORKOUT from '../../assets/P3.webp'
import DOODLEIT from '../../assets/doodleit.webp'
import HAPPYPLACE from '../../assets/P2.webp'
import WEATHER from '../../assets/P4.webp'
import TRELLO from '../../assets/P6.webp'
import ECOSYNC from '../../assets/EcoSync.webp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectCoverflow } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const featuredProjects = [
  {
    id: 1,
    image: '/api/placeholder/800/600',
    title: 'AI Fashion App',
    github: 'https://github.com/yourusername/ai-fashion-app',
    demo: 'https://demo.example.com/ai-fashion-app',
  },
  {
    id: 2,
    image: '/api/placeholder/800/600',
    title: 'AI Fashion App Backend',
    github: 'https://github.com/yourusername/ai-fashion-backend',
    demo: 'https://demo.example.com/ai-fashion-backend',
  },
  {
    id: 3,
    image: '/api/placeholder/800/600',
    title: 'Fruit & Vegetable Freshness Analysis',
    github: 'https://github.com/yourusername/freshness-analysis',
    demo: 'https://demo.example.com/freshness-analysis',
  },
  {
    id: 4,
    image: '/api/placeholder/800/600',
    title: 'ML Model Deployment',
    github: 'https://github.com/yourusername/ml-model-deployment',
    demo: 'https://demo.example.com/ml-deployment',
  },
  {
    id: 5,
    image: '/api/placeholder/800/600',
    title: 'Tensix Media Softech Website',
    github: 'https://github.com/yourusername/tensix-website',
    demo: 'https://demo.example.com/tensix',
  },
  {
    id: 6,
    image: '/api/placeholder/800/600',
    title: 'Empowerverse | Hopecore',
    github: 'https://github.com/yourusername/empowerverse',
    demo: 'https://demo.example.com/empowerverse',
  },
  {
    id: 7,
    image: '/api/placeholder/800/600',
    title: 'Testline Quiz App',
    github: 'https://github.com/yourusername/testline-quiz',
    demo: 'https://demo.example.com/testline',
  },
]

const otherProjects = [
  {
    id: 1,
    image: TRELLO,
    title: 'Trello Clone: KanbanBoard',
    github: 'https://github.com/harshsingh-io/KanbanBoard',
    demo: 'https://github.com/harshsingh-io/KanbanBoard/blob/main/README.md#demo',
    description:
      'A fully functional Kanban board with drag-and-drop functionality',
  },
  {
    id: 2,
    image: ECOSYNC,
    title: 'EcoSync: Electricity Tracking App',
    github: 'https://github.com/harshsingh-io/EcoSync',
    demo: 'https://github.com/harshsingh-io/EcoSync/blob/main/README.md#demo',
    description: 'Monitor and optimize your electricity usage in real-time',
  },
  {
    id: 3,
    image: WEATHER,
    title: 'WeatherCast: Weather Forecasting App',
    github: 'https://github.com/harshsingh-io/WeatherCast',
    demo: 'https://github.com/harshsingh-io/WeatherCast/blob/main/README.md#demo',
    description: 'Real-time weather updates with beautiful visualizations',
  },
  {
    id: 4,
    image: HAPPYPLACE,
    title: 'MemoryWhisper: HappyPlace App',
    github: 'https://github.com/harshsingh-io/MemoryWhisper',
    demo: 'https://github.com/harshsingh-io/MemoryWhisper/tree/main#demo',
    description: 'Capture and preserve your precious memories',
  },
  {
    id: 5,
    image: WORKOUT,
    title: 'BodySync: Workout App',
    github: 'https://github.com/harshsingh-io/BodySync',
    demo: 'https://github.com/harshsingh-io/BodySync/blob/main/README.md#demo',
    description: 'Your personal fitness companion with custom workout plans',
  },
  {
    id: 6,
    image: DOODLEIT,
    title: 'DoodleIt: Drawing App',
    github: 'https://github.com/harshsingh-io/DoodleIt',
    demo: 'https://github.com/harshsingh-io/DoodleIt/blob/main/README.md#demo',
    description: 'Express your creativity with this digital drawing tool',
  },
  {
    id: 7,
    image: QUIZIE,
    title: 'Quizie: Quiz App',
    github: 'https://github.com/harshsingh-io/quizie',
    demo: 'https://github.com/harshsingh-io/quizie/blob/main/README.md#demo',
    description: 'Test your knowledge with interactive quizzes',
  },
  {
    id: 8,
    image: CALCI,
    title: 'Calculator',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/calculator/blob/main/README.md#demo',
    description: 'A sleek and functional calculator application',
  },
]

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <section id="portfolio">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'M',
            'y',
            ' ',
            'R',
            'e',
            'c',
            'e',
            'n',
            't',
            ' ',
            'W',
            'o',
            'r',
            'k',
          ]}
          idx={15}
        />
      </h5>

      {/* Featured Projects Section */}
      {/* <h2 className="section-title">
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'F',
            'e',
            'a',
            't',
            'u',
            'r',
            'e',
            'd',
            ' ',
            'P',
            'r',
            'o',
            'j',
            'e',
            'c',
            't',
            's',
          ]}
          idx={15}
        />
      </h2> */}
      {/* <div className="container portfolio__container featured__container">
        {featuredProjects.map(({ id, image, title, github, demo }) => {
          return (
            <article key={id} className="portfolio__item featured__item">
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a
                  href={github}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <a
                  href={demo}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </article>
          )
        })}
      </div> */}

      {/* Other Projects Section with Swiper */}
      {
        <h2 className="section-title other-projects-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']}
            idx={15}
          />
        </h2>
      }
      <Swiper
        className="container other-projects__container"
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        initialSlide={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {otherProjects.map(
          ({ id, image, title, github, demo, description }, index) => {
            return (
              <SwiperSlide key={id} className="other-project__slide">
                <article
                  className={`portfolio__item other-project__item ${
                    activeIndex === index ? 'active' : ''
                  }`}
                >
                  <div className="portfolio__item-image">
                    <img src={image} alt={title} />
                  </div>
                  <h3>{title}</h3>
                  <p className="project-description">{description}</p>
                  <div className="portfolio__item-cta">
                    <a
                      href={github}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                    <a
                      href={demo}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            )
          }
        )}
      </Swiper>
    </section>
  )
}

export default Portfolio
