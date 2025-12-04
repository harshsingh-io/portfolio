import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'


const CustomDialog = ({ isOpen, onClose, title, date, content }) => {
  if (!isOpen) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-header-text">
            <h2>{title}</h2>
            <div className="dialog-date">{date}</div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
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
          <div className="timeline-date">{date}</div>
          <div className="timeline-header-wrapper">
            <div className="company-logo">
              <img src={logo} alt={company} />
            </div>
            <div className="timeline-info">
              <h3>{role}</h3>
              <h4>{company}</h4>
            </div>
          </div>
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
      date: 'August 2025 - Present',
      role: 'SDE-1 Data and AI Automation',
      company: 'MathonGo',
      logo: '', // Placeholder as logo URL was not in source
      description: 'Engineered automated tagging systems and orchestrated large-scale data migrations.',
      details: [
        {
          title: 'Key Responsibilities',
          points: [
            'Engineered an automated tagging system using Google Gemini 2.5 Pro API processing 8 years of CAT exam data',
            'Orchestrated migration of 160,000+ questions and media assets to MongoDB and AWS S3',
            'Developed ETL pipelines using Python and Google Drive API managing 1,000+ educational resources',
            'Reduced manual content management time by 80% and migration time from weeks to hours'
          ],
        },
        {
          title: 'Technical Achievements',
          points: [
            'Achieved high-accuracy classification across 4 educational domains',
            'Maintained 100% referential integrity during large-scale asset migration',
            'Processed 950+ files automatically using AI-driven pipelines',
            'Optimized content workflows reducing manual intervention significantly'
          ],
        },
      ],
    },
    {
      date: 'February 2025 - July 2025',
      role: 'AI Engineer (Freelance)',
      company: 'Outlier',
      logo: 'https://github.com/harshsingh-io/portfolio/blob/master/src/assets/outlier.svg?raw=true',
      description: 'Enhanced multi-language code generation models through instruction-tuning and expert evaluation.',
      details: [
        {
          title: 'Key Responsibilities',
          points: [
            'Enhanced performance of multi-language code generation models (Java, Python, Kotlin)',
            'Designed sophisticated prompts and curated large-scale instruction-tuning datasets',
            'Served as coding subject-matter expert in human-in-the-loop AI training pipeline',
            'Authored "gold-standard" solutions to reduce model hallucinations'
          ],
        },
        {
          title: 'Technical Achievements',
          points: [
            'Evaluated and ranked thousands of AI-generated code samples',
            'Systematically identified and corrected language-specific errors',
            'Provided critical feedback to improve instruction-following capabilities',
            'Improved model reasoning and accuracy through detailed code rewrites'
          ],
        },
      ],
    },
    {
      date: 'November 2024 - January 2025',
      role: 'Software Engineer Intern',
      company: 'Persist Ventures',
      logo: 'https://github.com/harshsingh-io/portfolio/blob/master/src/assets/persistVentures.svg?raw=true',
      description: 'Spearheaded frontend development of AI-powered Flutter applications and full-stack fashion platforms.',
      details: [
        {
          title: 'Project Overview',
          points: [
            'Spearheaded frontend development of three AI-powered Flutter applications',
            'Engineered full-stack AI fashion stylist platform (Lulu) from concept to deployment',
            'Contributed to a combined 155,000+ downloads on Google Play Store',
            'Architected scalable microservices backend with FastAPI'
          ],
        },
        {
          title: 'Technical Implementation',
          points: [
            'Implemented dual-database system (PostgreSQL/MongoDB) reducing latency by 40%',
            'Integrated OpenAI API for intelligent fashion recommendations',
            'Developed RESTful API endpoints for user management and AI chat interface',
            'Achieved 40% faster response times through backend optimization'
          ],
        },
      ],
    },
    {
      date: 'January 2024 - September 2024',
      role: 'Software Engineer Intern',
      company: 'BlueMango Labs',
      logo: 'https://github.com/harshsingh-io/portfolio/blob/master/src/assets/blueMangoLogo.webp?raw=true',
      description: 'Spearheaded end-to-end development of SuperAstro app and expert portals.',
      details: [
        {
          title: 'Key Achievements',
          points: [
            'Spearheaded end-to-end development of SuperAstro app\'s entire UI',
            'Developed complete expert portal with analytics dashboard',
            'Scaled backend infrastructure to support 5x concurrent users',
            'Architected scalable cross-platform mobile app structure'
          ],
        },
        {
          title: 'Technical Contributions',
          points: [
            'Utilized AWS S3, DynamoDB, and MQTT protocol for infrastructure',
            'Built consultation management system using Flutter and FastAPI',
            'Implemented scalable backend solutions for high traffic support',
            'Optimized application performance across platforms'
          ],
        },
      ],
    }
  ]

  return (
    <section id="experience">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={[
            'M',
            'y',
            ' ',
            'J',
            'o',
            'u',
            'r',
            'n',
            'e',
            'y',
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-container::after {
          content: '';
          position: absolute;
          width: 4px;
          background: linear-gradient(
            180deg,
            rgba(77, 122, 255, 0.3) 0%,
            var(--color-primary) 50%,
            rgba(77, 122, 255, 0.3) 100%
          );
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
          border-radius: 3rem;
          box-shadow: 0 0 20px rgba(77, 122, 255, 0.3);
        }

        .timeline-item {
          padding: 10px 50px;
          position: relative;
          width: 50%;
          margin-bottom: 4rem;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          right: -10px;
          background: var(--color-bg);
          border: 4px solid var(--color-primary);
          top: 25px;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 0 4px var(--color-bg),
                      0 0 20px rgba(77, 122, 255, 0.5);
          transition: all 0.3s ease;
        }

        .timeline-item:hover::after {
          transform: scale(1.3);
          box-shadow: 0 0 0 4px var(--color-bg),
                      0 0 30px rgba(77, 122, 255, 0.8);
        }

        .left {
          left: 0;
        }

        .right {
          left: 50%;
        }

        .right::after {
          left: -10px;
        }

        .timeline-header-wrapper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .timeline-info {
          flex: 1;
        }

        .company-logo {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          padding: 0.8rem;
          background: rgba(77, 122, 255, 0.1);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(77, 122, 255, 0.2);
          transition: all 0.3s ease;
        }

        .company-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(1.1);
        }

        .timeline-content:hover .company-logo {
          transform: scale(1.05);
          background: rgba(77, 122, 255, 0.2);
          border-color: var(--color-primary);
        }

        .timeline-content {
          padding: 2.5rem;
          background: linear-gradient(
            135deg,
            rgba(45, 60, 122, 0.4) 0%,
            rgba(35, 47, 95, 0.3) 100%
          );
          border: 1px solid rgba(77, 122, 255, 0.2);
          border-radius: 1.2rem;
          backdrop-filter: blur(10px);
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .timeline-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 1.2rem;
          background: linear-gradient(
            135deg,
            rgba(77, 122, 255, 0.1) 0%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .timeline-content:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(77, 122, 255, 0.3);
          border-color: var(--color-primary);
        }

        .timeline-content:hover::before {
          opacity: 1;
        }

        .timeline-date {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(77, 122, 255, 0.1);
          border-radius: 2rem;
          border: 1px solid rgba(77, 122, 255, 0.3);
        }

        .timeline-content h3 {
          color: var(--color-white);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          letter-spacing: 0.5px;
        }

        .timeline-content h4 {
          color: var(--color-primary);
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0;
          opacity: 0.9;
        }

        .timeline-content p {
          color: var(--color-light);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 0.5rem;
          margin-top: 1.5rem;
        }

        .read-more-btn {
          background: linear-gradient(
            135deg,
            var(--color-primary) 0%,
            var(--color-primary-variant) 100%
          );
          color: var(--color-white);
          padding: 0.9rem 2rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .read-more-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .read-more-btn:hover::before {
          left: 100%;
        }

        .read-more-btn:hover {
          background: linear-gradient(
            135deg,
            var(--color-primary-variant) 0%,
            var(--color-primary) 100%
          );
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(77, 122, 255, 0.4);
        }

        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
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
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .dialog-header-text {
          flex: 1;
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

        .close-btn {
          background: rgba(77, 122, 255, 0.1);
          color: var(--color-light);
          width: 36px;
          height: 36px;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(77, 122, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 1;
          padding: 0;
        }

        .close-btn:hover {
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
          transform: rotate(90deg);
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
        
        
        @media screen and (max-width: 1024px) {
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

          .timeline-header-wrapper {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }

          .company-logo {
            width: 70px;
            height: 70px;
          }

          .timeline-content {
            padding: 2rem;
          }

          .timeline-content h3 {
            font-size: 1.3rem;
          }

          .timeline-date {
            font-size: 0.75rem;
            padding: 0.35rem 0.85rem;
          }

          .read-more-btn {
            font-size: 0.7rem;
            padding: 0.75rem 1.5rem;
            letter-spacing: 1px;
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

          .timeline-content {
            padding: 1.5rem;
          }

          .timeline-content h3 {
            font-size: 1.2rem;
          }

          .timeline-date {
            font-size: 0.7rem;
            padding: 0.3rem 0.75rem;
            margin-bottom: 1rem;
          }

          .read-more-btn {
            font-size: 0.65rem;
            padding: 0.7rem 1.2rem;
            letter-spacing: 0.8px;
            width: 100%;
          }

          .company-logo {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience
