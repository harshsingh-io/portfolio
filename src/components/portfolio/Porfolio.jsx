import React from 'react'
import './portfolio.css'
import CALCI from "../../assets/P1.webp"
import QUIZIE from "../../assets/P5.webp"
import WORKOUT from "../../assets/P3.webp"
import HAPPYPLACE from "../../assets/P2.webp"
import WEATHER from "../../assets/P4.webp"
import TRELLO from "../../assets/P6.webp"

const data = [

  /*
  {
    id:1,
    image: TRELLO,
    title: 'The Ultimate Project Management Tool',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4'
  },
  {
    id:2,
    image: WEATHER,
    title: 'This is a Weather Forcasting App',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4'
  },
  {
    id:3,
    image: HAPPYPLACE,
    title: 'This is a Happy Place App',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4'
  },
  {
    id:4,
    image: WORKOUT,
    title: 'This is a Workout App',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4'
  },*/
  {
    id:5,
    image: QUIZIE,
    title: 'This is a Quiz App',
    github: 'https://github.com/harshsingh-io/quizie',
    demo: '#'
  },
  {
    id:6,
    image: CALCI,
    title: 'This is a Calculator',
    github: 'https://github.com/harshsingh-io/calculator',
    demo: 'https://github.com/harshsingh-io/raw/raw/main/calcidemo.mp4'
  },
  
]

const Porfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
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