import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import outlierLogo from '../../assets/outlier.svg'
import persistLogo from '../../assets/persistVentures.svg'
import gdgLogo from '../../assets/Google_logo_lockup_color.png'
import blueMangoLogo from '../../assets/blueMangoLogo.webp'

const CustomDialog = ({ isOpen, onClose, title, date, content }) => {
  if (!isOpen) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <div className="dialog-date">{date}</div>
        </div>
        <div className="dialog-body">
          {content.map((section, index) => (
            <div key={index} className="detail-section">
              <h4>{section.title}</h4>
              <ul>
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="dialog-footer">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const TimelineItem = ({
  date,
  role,
  company,
  description,
  details,
  logo,
  isLeft,
}) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <div className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
        <div className="timeline-content">
          <div className="company-logo">
            <img src={logo} alt={company} />
          </div>
          <div className="timeline-date">{date}</div>
          <h3>{role}</h3>
          <h4>{company}</h4>
          <p>{description}</p>
          <button onClick={() => setShowDialog(true)} className="read-more-btn">
            READ MORE
          </button>
        </div>
      </div>

      <CustomDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title={`${role} at ${company}`}
        date={date}
        content={details}
      />
    </>
  )
}

const Experience = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const timelineEvents = [
    {
      date: 'Sep 2024 - Present',
      role: 'AI Engineer',
      company: 'Outlier',
      logo: outlierLogo,
      description: 'Specializing in RLHF implementation for large language models with focus on code generation and analysis capabilities.',
      details: [
        {
          title: 'Key Responsibilities',
          points: [
            'Drive RLHF training methodologies improving code generation accuracy by 30%',
            'Develop robust feedback mechanisms processing over 100k code samples daily',
            'Implement cross-language alignment techniques reducing errors by 40%',
            'Design comprehensive human feedback frameworks for fine-tuning large language models',
          ],
        },
        {
          title: 'Technical Achievements',
          points: [
            'Architect reward modeling systems for optimizing code generation capabilities',
            'Create specialized alignment strategies across multiple programming languages',
            'Engineer automated RLHF pipelines for high-quality preference data collection',
            'Achieve 95% alignment with human preferences across evaluation benchmarks',
          ],
        },
      ],
    },
    {
      date: 'Nov 2024 - Dec 2024',
      role: 'Full Stack Engineer',
      company: 'Persist Ventures',
      logo: persistLogo,
      description:
        'Developed AI-powered fashion styling platform with FastAPI backend and Flutter frontend.',
      details: [
        {
          title: 'Project Overview',
          points: [
            'Led development of AI-powered personal styling platform',
            'Implemented microservices architecture with FastAPI',
            'Designed dual database system using PostgreSQL and MongoDB',
            'Built intuitive mobile interface using Flutter',
          ],
        },
        {
          title: 'Technical Implementation',
          points: [
            'Integrated OpenAI for intelligent fashion advice',
            'Implemented secure JWT authentication system',
            'Created comprehensive API endpoints for wardrobe management',
            'Developed real-time chat interface for AI stylist interaction',
          ],
        },
      ],
    },
    {
      date: 'Jan 2024 - Sep 2024',
      role: 'Software Engineer Intern',
      company: 'BlueMango Labs',
      logo: blueMangoLogo,
      description:
        'Full-stack mobile development focusing on SuperAstro and Kosmic apps.',
      details: [
        {
          title: 'Key Achievements',
          points: [
            'Increased user engagement by 35% through Firebase notifications',
            'Optimized system performance by 50% using Domain-Driven Design',
            'Scaled backend to support 10x concurrent users',
            'Led internationalization expanding userbase by 40%',
          ],
        },
        {
          title: 'Technical Contributions',
          points: [
            'Implemented real-time chat and live streaming features',
            'Integrated AWS S3 and DynamoDB for scalable storage',
            'Developed offline message caching with SQLite',
            'Created robust deployment processes using Ruby scripts',
          ],
        },
      ],
    },
    {
      date: 'Aug 2023 - Aug 2024',
      role: 'Android Lead',
      company: 'Google Developer Group',
      logo: gdgLogo,
      description:
        'Led Android development initiatives and managed community engagement.',
      details: [
        {
          title: 'Leadership & Management',
          points: [
            'Managed team of 10 volunteers and grew membership by 500+',
            'Organized 5+ tech events with 550+ participants each',
            'Led Android development workshops and training sessions',
            'Coordinated with other GDG chapters for collaborative events',
          ],
        },
        {
          title: 'Technical Contributions',
          points: [
            'Conducted Android development workshops',
            'Created learning resources and documentation',
            'Mentored junior developers in mobile development',
            'Facilitated knowledge sharing sessions',
          ],
        },
      ],
    },
  ]

  return (
    <section id="experience">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'W',
            'h',
            'a',
            't',
            ' ',
            'S',
            'k',
            'i',
            'l',
            'l',
            's',
            ' ',
            'I',
            ' ',
            'H',
            'a',
            'v',
            'e',
          ]}
          idx={15}
        />
      </h5>
      <h2>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'M',
            'y',
            ' ',
            'E',
            'x',
            'p',
            'e',
            'r',
            'i',
            'e',
            'n',
            'c',
            'e',
          ]}
          idx={15}
        />
      </h2>

      <div className="timeline-section">
        <div className="timeline-container">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} {...event} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>

      <style jsx>{`
        #experience {
          padding: 2rem 0;
          width: var(--container-width-lg);
          margin: 0 auto;
        }

        .timeline-section {
          margin-top: 4rem;
          padding: 2rem 0;
        }

        .timeline-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        .timeline-container::after {
          content: '';
          position: absolute;
          width: 6px;
          background: var(--color-primary);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
          border-radius: 3rem;
          background: linear-gradient(
            180deg,
            var(--color-primary) 0%,
            var(--color-primary-variant) 100%
          );
        }

        .timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          margin-bottom: 3rem;
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 25px;
          right: -17px;
          background: var(--color-bg);
          border: 4px solid var(--color-primary);
          top: 15px;
          border-radius: 50%;
          z-index: 1;
        }

        .left {
          left: 0;
        }

        .right {
          left: 50%;
        }

        .right::after {
          left: -16px;
        }

        .timeline-content {
          padding: 2rem;
          background: linear-gradient(
            145deg,
            var(--color-bg-variant) 0%,
            rgba(45, 60, 122, 0.3) 100%
          );
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          position: relative;
          transition: var(--transition);
        }

        .timeline-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(77, 122, 255, 0.1);
        }

        .timeline-date {
          color: var(--color-primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .timeline-content h3 {
          color: var(--color-white);
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }

        .timeline-content h4 {
          color: var(--color-primary);
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .timeline-content p {
          color: var(--color-light);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .read-more-btn {
          background: linear-gradient(
            90deg,
            var(--color-primary) 0%,
            var(--color-primary-variant) 100%
          );
          color: var(--color-white);
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          border: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1rem;
        }

        .read-more-btn:hover {
          background: linear-gradient(
            90deg,
            var(--color-primary-variant) 0%,
            var(--color-primary) 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(77, 122, 255, 0.2);
        }

        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .dialog-content {
          background: linear-gradient(
            145deg,
            var(--color-bg-variant) 0%,
            rgba(45, 60, 122, 0.3) 100%
          );
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-primary);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 90vw;
          width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: dialogEnter 0.3s ease-out;
        }

        @keyframes dialogEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .dialog-header {
          margin-bottom: 1.5rem;
        }

        .dialog-header h2 {
          color: var(--color-primary);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .dialog-date {
          color: var(--color-light);
          font-size: 0.9rem;
        }

        .dialog-body {
          margin: 2rem 0;
        }

        .detail-section {
          margin-bottom: 1.5rem;
        }

        .detail-section h4 {
          color: var(--color-primary);
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
        }

        .detail-section ul {
          list-style-type: disc;
          margin-left: 1.5rem;
        }

        .detail-section li {
          color: var(--color-light);
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .dialog-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .close-btn {
          background: linear-gradient(
            90deg,
            var(--color-primary) 0%,
            var(--color-primary-variant) 100%
          );
          color: var(--color-white);
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          border: none;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .close-btn:hover {
          background: linear-gradient(
            90deg,
            var(--color-primary-variant) 0%,
            var(--color-primary) 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(77, 122, 255, 0.2);
        }

        /* Add scrollbar styling */
        .dialog-content::-webkit-scrollbar {
          width: 8px;
        }

        .dialog-content::-webkit-scrollbar-track {
          background: var(--color-bg);
          border-radius: 4px;
        }

        .dialog-content::-webkit-scrollbar-thumb {
          background: var(--color-primary-variant);
          border-radius: 4px;
        }

        .dialog-content::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary);
        }
        @media screen and (max-width: 768px) {
          .timeline-container::after {
            left: 31px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
          }

          .timeline-item::after {
            left: 15px;
            top: 15px;
          }

          .right {
            left: 0%;
          }
        }

        @media screen and (max-width: 600px) {
          #experience {
            width: var(--container-width-sm);
          }
          .dialog-content {
            padding: 1.5rem;
            width: 95vw;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience
