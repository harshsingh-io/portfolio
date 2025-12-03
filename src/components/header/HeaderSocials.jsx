import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a
        href="https://www.linkedin.com/in/harshsingh-io"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin />
      </a>
      <a
        href="https://github.com/harshsingh-io"
        target="_blank"
        rel="noreferrer"
      >
        <BsGithub />
      </a>
      <a href="https:playstore.com" target="_blank" rel="noreferrer">
        <IoLogoGooglePlaystore />
      </a>
    </div>
  )
}

export default HeaderSocials
