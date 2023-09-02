import React from 'react'
import './testimonials.css'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import AVTR1 from '../../assets/mayurbhaia.webp'
import AVTR2 from '../../assets/adityabhaia.webp'
import AVTR3 from '../../assets/aishwarbhaia.webp'
import AVTR4 from '../../assets/mokshadi.webp'

// import Swiper core and required modules
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const data = [
  {
    avatar: AVTR1,
    name: 'Mayur Rathi \n (Organizer GDG Cloud Bhopal)',
    review: 'By far the best profile I have seen, good work 👏.You may share your #100daysofcode journey here and inspire community to learn in public.🥳 #inspirecommunity.Maybe I myself will learn from this 100DaysOfCode.😬This is something which I never started, being honest.I would be following your journey closely.💯'
  },
  {
    avatar: AVTR2,
    name: 'Aditya Shah \n (Organizer GDG Cloud Bhopal)',
    review: 'On implementing some Optimization in Portfolio website.His Words : "Hi Harsh! Kudos on achievement of this score. Glad to know that my session was helpful to you! Godspeed."'
  },
  {
    avatar: AVTR4,
    name: 'Moksha Jain \n (SWE at Walmart Global Tech India)',
    review: 'It looks like Harsh Singh is a hardworking and dedicated student who is eager to learn and grow in his career. He is also very appreciative of the guidance and support of his senior, Moksha Di SIRT. I am impressed by Harsh Singh\'s progress in DSA. He has clearly been putting in a lot of effort, and it is paying off. I am also glad that he is taking the initiative to reach out to his senior for help and advice. This shows that he is serious about his learning and development. I would like to commend Harsh Singh for his hard work and dedication. He is an inspiration to other students, and I am confident that he will achieve great things in his career.'
  },
  {
    avatar: AVTR3,
    name: 'Aishwar Sharma \n (SWE at Apisero Inc)',
    review: 'Harsh, bohot badhiya! You have covered an impressive range of topics in your DSA progress over the last two months. Your dedication and hard work are evident in the vast array of algorithms and data structures you have learned and implemented. With such comprehensive knowledge, I\'m confident that you\'ll secure a placement at Big MNC. Take care and keep up the excellent work! ✨'
  },
]
const Testimonials = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
  return (
    <section id='testimonials'>
      <h5><AnimatedLetters
  letterClass={letterClass}
  strArray={['W', 'h', 'a', 't', ' ', 'S', 'e', 'n', 'i', 'o', 'r', 's', ' ', 'S', 'a', 'i', 'd']}
  idx={15}
/>
</h5>
      <h2><AnimatedLetters
  letterClass={letterClass}
  strArray={['A', 'p', 'p', 'r', 'e', 'c', 'i', 'a', 't', 'i', 'o', 'n']}
  idx={15}
/>
</h2>

      <Swiper className="container testimonials__container" 
      // install Swiper modules
      modules={[Pagination]}
      spaceBetween={40}
      slidesPerView={1}
      pagination={{ clickable: true }}>
        {
          data.map(({avatar, name,review},index)=>{
            return (
              <SwiperSlide key={index} className='testimonial'>
          <div className="client__avatar">
            <img src={avatar} alt="Avatar One" />
          </div>
          <h4 className='client__name'>{name}</h4>
            <small className='client__review'>
              {review}
           </small>
        </SwiperSlide>
            )
          })
        }
      </Swiper>

    </section>
    )
}

export default Testimonials

/*<article className='testimonial'>
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className='client__name'>Ernest Aciever</h5>
            <small className='client__review'>
            Working with Ian was better than expected and we had really high
expectations. He is an incredibly talented developer but what really makes him stand out is his work ethic and steady approach. Time after time, and without us asking, he added enhancements and improvements that resulted in a better end product for us and our clients.
            </small>
        </article>
        <article className='testimonial'>
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className='client__name'>Ernest Aciever</h5>
            <small className='client__review'>
            Working with Ian was better than expected and we had really high
expectations. He is an incredibly talented developer but what really makes him stand out is his work ethic and steady approach. Time after time, and without us asking, he added enhancements and improvements that resulted in a better end product for us and our clients.
            </small>
        </article>
        <article className='testimonial'>
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className='client__name'>Ernest Aciever</h5>
            <small className='client__review'>
            Working with Ian was better than expected and we had really high
expectations. He is an incredibly talented developer but what really makes him stand out is his work ethic and steady approach. Time after time, and without us asking, he added enhancements and improvements that resulted in a better end product for us and our clients.
            </small>
        </article>
        <article className='testimonial'>
          <div className="client__avatar">
            <img src={AVTR1} alt="Avatar One" />
          </div>
          <h5 className='client__name'>Ernest Aciever</h5>
            <small className='client__review'>
            Working with Ian was better than expected and we had really high
expectations. He is an incredibly talented developer but what really makes him stand out is his work ethic and steady approach. Time after time, and without us asking, he added enhancements and improvements that resulted in a better end product for us and our clients.
            </small>
        </article> */