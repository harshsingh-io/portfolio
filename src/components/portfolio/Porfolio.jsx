import React from 'react'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import './portfolio.css'
import CALCI from "../../assets/P1.webp"
import QUIZIE from "../../assets/P5.webp"
import WORKOUT from "../../assets/P3.webp"
import DOODLEIT from"../../assets/doodleit.webp"
import HAPPYPLACE from "../../assets/P2.webp"
import WEATHER from "../../assets/P4.webp"
import TRELLO from "../../assets/P6.webp"
import ECOSYNC from "../../assets/EcoSync.webp"

const data = [

  
  {
    id:1,
    image: TRELLO,
    title: 'Trello Clone: KanbanBoard',
    github: 'https://github.com/harshsingh-io/KanbanBoard',
    demo: 'https://github.com/harshsingh-io/KanbanBoard/blob/main/README.md#demo'
  },
  {
    id:2,
    image: ECOSYNC,
    title: 'EcoSync: Electricity Tracking App',
    github: 'https://github.com/harshsingh-io/EcoSync',
    demo: 'https://github.com/harshsingh-io/EcoSync/blob/main/README.md#demo'
  },
  {
    id:3,
    image: WEATHER,
    title: 'WeatherCast: Weather Forcasting App',
    github: 'https://github.com/harshsingh-io/WeatherCast',
    demo: 'https://github.com/harshsingh-io/WeatherCast/blob/main/README.md#demo'
  },
  {
    id:4,
    image: HAPPYPLACE,
    title: 'MemoryWhisper: HappyPlace App',
    github: 'https://github.com/harshsingh-io/MemoryWhisper',
    demo: 'https://github.com/harshsingh-io/MemoryWhisper/tree/main#demo'
  },
  {
    id:5,
    image: WORKOUT,
    title: 'BodySync: Workout App',
    github: 'https://github.com/harshsingh-io/BodySync',
    demo: 'https://github.com/harshsingh-io/BodySync/blob/main/README.md#demo'
  },
  {
    id:6,
    image: DOODLEIT,
    title: 'DoodleIt: Drawing App',
    github: 'https://github.com/harshsingh-io/DoodleIt',
    demo: 'https://github.com/harshsingh-io/DoodleIt/blob/main/README.md#demo'
  },
  {
    id:7,
    image: QUIZIE,
    title: 'Quizie: Quiz App',
    github: 'https://github.com/harshsingh-io/quizie',
    demo: '#https://github.com/harshsingh-io/quizie/blob/main/README.md#demo'
  },
  {
    id:8,
    image: CALCI,
    title: 'Calculator',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/calculator/blob/main/README.md#demo'
  }
  
]

const Porfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
  return (
    <section id='portfolio'>
      <h5><AnimatedLetters
  letterClass={letterClass}
  strArray={['M', 'y', ' ', 'R', 'e', 'c', 'e', 'n', 't', ' ', 'W', 'o', 'r', 'k']}
  idx={15}
/>
</h5>
      <h2><AnimatedLetters
  letterClass={letterClass}
  strArray={['P', 'r', 'o', 'j', 'e', 'c', 't']}
  idx={15}
/>
</h2>
      <div className="container portfolio__container">
        {
          data.map(({id, image, title, github, demo}) => {
            return  (
              
              <article key={id} className='portfolio__item'>
            <div className="portfolio__item-image">
            <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
          <div className="portfolio__item-cta">
            <a href={github} className='btn' target='_blank'>Github</a>
            <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>
          
          )
        })
      }
      </div>
    </section>
    )
}

export default Porfolio

/*

<article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={TRELLO} alt='' />
          </div>
          <h3>The Ultimate Project Management Tool</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={WEATHER} alt='' />
          </div>
          <h3>This is a Weather Forcasting App</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>

        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={HAPPYPLACE} alt='' />
          </div>
          <h3>This is a Happy Place App</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>

        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={WORKOUT} alt='' />
          </div>
          <h3>This is a Workout App</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>

        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={QUIZIE} alt='' />
          </div>
          <h3>This is a Quiz App</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>

        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={CALCI} alt='' />
          </div>
          <h3>This is a Calculator</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/harshsingh-io/calculator" className='btn' target='_blank'>Github</a>
            <a href="https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4" className='btn btn-primary' target='_blank'>Live Demo</a>
          </div>
          </article>
*/