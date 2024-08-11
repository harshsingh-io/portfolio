import React from 'react'
import CV from '../../assets/Harsh_Singh_Resume.pdf'

const Resume = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <iframe
        src={CV}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  )
}

export default Resume
