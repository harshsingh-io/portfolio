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
      console.log('Contributions Data:', contributionsData)
      const totalContributions = '1000+'
      console.log('Total Contributions:', totalContributions)

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/harshsingh-io/repos`
      )

      const reposData = await reposResponse.json()
      console.log('Repositories Data:', reposData)
      const totalRepos = reposData.length
      console.log('Total Repositories:', totalRepos)

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
        From the moment I wrote my first line of code, I knew that software
        development was where I belonged. My journey began with a deep
        fascination for how technology can transform ideas into reality, and
        this curiosity has only grown stronger over the years.
        <span onClick={toggleShowMore} className="btn-text">
          {showMore ? ' Read Less' : ' Read More'}
        </span>
      </p>
    </>
  )

  const fullText = (
    <>
      <p>
        From the moment I wrote my first line of code, I knew that software
        development was where I belonged. My journey began with a deep
        fascination for how technology can transform ideas into reality, and
        this curiosity has only grown stronger over the years.
      </p>
      <p>
        I currently work as an SDE Intern at BlueMango Labs, where I’ve had the
        privilege of leading projects that significantly impact user experience
        and system efficiency. One of my proudest achievements was redesigning
        the user interface for key apps, which resulted in a 25% increase in
        user retention. I also implemented Domain-Driven Design principles that
        boosted our development speed by 30%, and integrated advanced backend
        technologies that allowed our systems to handle 10x more concurrent
        users without a hitch.
      </p>
      <p>
        But it's not just about the code—it's about creating something
        meaningful. Whether it’s building a Trello clone to enhance team
        collaboration or developing an app that helps users save on electricity
        costs, I strive to craft solutions that are both efficient and
        user-friendly.
      </p>
      <p>
        When I’m not coding, I enjoy mentoring aspiring developers and
        contributing to open-source projects. These experiences have reinforced
        my belief that technology should be accessible and empowering for
        everyone. Outside of the tech world, you can often find me running long
        distances, where I find the solitude and rhythm help spark new ideas.
      </p>
      <p>
        If you’re seeking someone who combines technical expertise with a
        passion for continuous improvement, let’s connect. I’m always excited to
        discuss new projects and explore challenging opportunities.
      </p>
      <p>
        Skills: Android Development, Kotlin, Java, Software Architecture, UI/UX
        Design, Backend Integration, Problem Solving
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
              alt="Harsh Singh, Software Engineer specializing in Android and Backend Development"
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>{experienceMonths} months</small>
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
