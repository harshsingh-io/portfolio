import React, { useEffect, useState } from 'react'
import './about.css'
import AnimatedLetters from '../AnimatedLetters'
import { FaAward } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { GoProject } from 'react-icons/go'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [showMore, setShowMore] = useState(false)
  const [experienceMonths, setExperienceMonths] = useState(0)
  const [contributions, setContributions] = useState(0)
  const [repositories, setRepositories] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Calculate experience in months
    const startDate = new Date(2024, 0) // January 2024 (0-based index for months)
    const currentDate = new Date()
    const experience =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      startDate.getMonth()
    setExperienceMonths(experience)

    // Fetch GitHub data
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      // Fetch contributions (simplified approach)
      const contributionsResponse = await fetch(
        `https://api.github.com/users/harshsingh-io/events`
      )
      const contributionsData = await contributionsResponse.json()
      const totalContributions = '1000+'

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/harshsingh-io/repos`
      )

      const reposData = await reposResponse.json()
      const totalRepos = reposData.length

      setContributions(totalContributions)
      setRepositories(totalRepos)
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
    }
  }

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const initialText = (
    <>
      <p>
        I'm a versatile Software Engineer who thrives at the intersection of Mobile Development, Backend Engineering, and Data Systems. My journey in software development is driven by a passion for building scalable, production-ready solutions that solve real-world problems.
        <span onClick={toggleShowMore} className="btn-text">
          {showMore ? ' Read Less' : ' Read More'}
        </span>
      </p>
    </>
  )

  const fullText = (
    <>
      <p>
        I'm a versatile Software Engineer who thrives at the intersection of Mobile Development, Backend Engineering, and Data Systems. My journey in software development is driven by a passion for building scalable, production-ready solutions that solve real-world problems.
      </p>
      <p>
        <strong>Mobile Development:</strong> I specialize in crafting intuitive mobile experiences using Android (Kotlin, Java) and Flutter. At BlueMango Labs, I led UI redesigns that increased user retention by 25% and implemented real-time features including chat and live streaming. I believe great mobile apps combine performance with delightful user experiences.
      </p>
      <p>
        <strong>Backend Engineering:</strong> I build robust backend systems with Python and FastAPI, integrating databases like PostgreSQL, DynamoDB, and SQLite. I've architected systems that scale to handle 10x more concurrent users and implemented Domain-Driven Design principles that accelerated development by 30%. My focus is on clean architecture, API design, and system reliability.
      </p>
      <p>
        <strong>Data Engineering:</strong> I work with data pipelines, MQTT protocols, and cloud services (AWS, Firebase) to build data-driven applications. My experience includes optimizing data flows, implementing efficient caching strategies, and ensuring data consistency across distributed systems.
      </p>
      <p>
        Currently, I'm working as an AI Engineer at Outlier, implementing RLHF methodologies that improve code generation accuracy by 30%, and recently built an AI-powered fashion platform at Persist Ventures with a full-stack architecture.
      </p>
      <p>
        Beyond technical skills, I'm passionate about mentoring developers, contributing to open-source, and continuous learning. Whether it's mobile apps, backend APIs, or data systems, I approach every challenge with curiosity and a commitment to excellence.
        <span onClick={toggleShowMore} className="btn-text">
          {showMore ? ' Read Less' : ' Read More'}
        </span>
      </p>
    </>
  )

  return (
    <section id="about">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['G', 'e', 't', ' ', 'T', 'o', ' ', 'K', 'n', 'o', 'w']}
          idx={15}
        />
      </h5>
      <h2>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
          idx={15}
        />
      </h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img
              src={
                'https://github.com/harshsingh-io/portfolio/blob/master/src/assets/harsh-about.JPEG?raw=true'
              }
              alt="Harsh Singh - Software Engineer specializing in Mobile, Backend and Data Engineering"
              loading="lazy"
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>{experienceMonths}+ months</small>
            </article>
            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Contributions</h5>
              <small>{contributions} Contributions</small>
            </article>
            <article className="about__card">
              <GoProject className="about__icon" />
              <h5>Projects</h5>
              <small>{repositories}+ Projects</small>
            </article>
          </div>

          {showMore ? fullText : initialText}

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
