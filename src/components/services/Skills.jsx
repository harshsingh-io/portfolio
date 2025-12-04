import React, { useState, useEffect } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import './services.css'

// Import all skill icons
import java from '../../assets/skills/java.svg'
import kotlin from '../../assets/skills/kotlin.svg'
import flutter from '../../assets/skills/flutter.svg'
import python from '../../assets/skills/python.svg'
import android from '../../assets/skills/android.svg'
import firebase from '../../assets/skills/firebase.svg'
import aws from '../../assets/skills/aws.svg'

import restapi from '../../assets/skills/restapi.svg'
import fastapi from '../../assets/skills/fastapi.svg'
import postgresql from '../../assets/skills/postgresql.svg'
import dynamodb from '../../assets/skills/amazondynamodb.svg'
import sqlite from '../../assets/skills/sqlite.svg'
import mqtt from '../../assets/skills/mqtt.svg'
import sqlalchemy from '../../assets/skills/sqlalchemy.svg'

import git from '../../assets/skills/git.svg'
import androidstudio from '../../assets/skills/androidstudio.svg'
import cicd from '../../assets/skills/cicd.svg'
import docker from '../../assets/skills/docker.svg'
import agile from '../../assets/skills/agile.svg'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const mobileSkills = [
    { name: 'Kotlin', icon: kotlin, isGold: true },
    { name: 'Java', icon: java, isGold: true },
    { name: 'Android SDK', icon: android, isGold: true },
    { name: 'Flutter', icon: flutter, isGold: true },
    { name: 'Firebase', icon: firebase, isGold: true },
    { name: 'Android Studio', icon: androidstudio, isGold: true },
  ]

  const backendSkills = [
    { name: 'Python', icon: python, isGold: true },
    { name: 'FastAPI', icon: fastapi, isGold: true },
    { name: 'REST APIs', icon: restapi, isGold: true },
    { name: 'PostgreSQL', icon: postgresql, isGold: true },
    { name: 'SQLite', icon: sqlite, isGold: true },
    { name: 'SQLAlchemy', icon: sqlalchemy, isGold: true },
  ]

  const dataEngSkills = [
    { name: 'AWS', icon: aws, isGold: true },
    { name: 'DynamoDB', icon: dynamodb, isGold: true },
    { name: 'MQTT', icon: mqtt, isGold: true },
    { name: 'Docker', icon: docker, isGold: false },
    { name: 'CI/CD', icon: cicd, isGold: false },
    { name: 'Git', icon: git, isGold: true },
    { name: 'Agile', icon: agile, isGold: false },
  ]

  const SkillBadge = ({ name, icon, isGold }) => (
    <div className="skill-badge">
      <div className={`skill-badge__card ${isGold ? 'gold' : 'silver'}`}>
        <img src={icon} alt={name} className="skill-badge__icon" />
        <span className="skill-badge__title">{name}</span>
      </div>
    </div>
  )

  return (
    <section id="skills">
      <h5>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['M', 'y', ' ', 'S', 'k', 'i', 'l', 'l', 's']}
          idx={15}
        />
      </h5>
      <h2>What I Can Do</h2>

      <div className="skills__container">
        <div className="skills__category">
          <h3>Mobile Development</h3>
          <div className="skills__list">
            {mobileSkills.map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                isGold={skill.isGold}
              />
            ))}
          </div>
        </div>

        <div className="skills__category">
          <h3>Backend Engineering</h3>
        <div className="skills__list">
            {backendSkills.map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                isGold={skill.isGold}
              />
            ))}
          </div>
        </div>

        <div className="skills__category">
          <h3>Data Engineering & DevOps</h3>
        <div className="skills__list">
            {dataEngSkills.map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                isGold={skill.isGold}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
