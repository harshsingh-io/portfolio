import React, { useState } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa'
import './mobile-showcase.css'

const MobileShowcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  // App details from your projects - using the AI Fashion App as featured
  const appDetails = {
    name: 'AI Fashion Stylist App',
    description:
      'An AI-powered fashion application that provides personalized clothing recommendations based on user preferences, body type, and current fashion trends. Features smart outfit suggestions and style assistance.',
    technologies: ['Flutter', 'TensorFlow', 'AI/ML', 'FastAPI'],
    appStoreLink: '#',
    playStoreLink: '#',
    githubLink: 'https://github.com/yourusername/ai-fashion-app',
    websiteLink: 'https://demo.example.com/ai-fashion-app',
    screenshots: [
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/1.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/2.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/4.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/5.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/6.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/7.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/8.jpg?raw=true',
      'https://github.com/harshsingh-io/lulu_stylist_app/blob/main/screenshots/9.jpg?raw=true',
    ],
    demoVideoId: '1tngnYXZliwu5czziU4tnQ8ymeX5zZpxT',
  }

  // No need for the letter animation effect here as it's handled in the parent component

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === appDetails.screenshots.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? appDetails.screenshots.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="mobile-showcase-container">
      <div className="container">
        <div className="showcase-content">
          {/* Phone mockup with screenshots */}
          <div className="phone-mockup-container">
            <div className="phone-mockup">
              {/* Phone frame */}
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  {/* Toggle button at the top */}
                  <div className="media-toggle">
                    <div className="toggle-buttons">
                      <button
                        className={`toggle-button ${
                          !showVideo ? 'active' : ''
                        }`}
                        onClick={() => setShowVideo(false)}
                      >
                        Images
                      </button>
                      <button
                        className={`toggle-button ${showVideo ? 'active' : ''}`}
                        onClick={() => setShowVideo(true)}
                      >
                        Video
                      </button>
                    </div>
                  </div>

                  {/* App screenshot or video */}
                  <div className="screen-content">
                    {showVideo ? (
                      <iframe
                        src={`https://drive.google.com/file/d/${appDetails.demoVideoId}/preview`}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        className="app-video"
                        frameBorder="0"
                      ></iframe>
                    ) : (
                      <img
                        src={appDetails.screenshots[currentImageIndex]}
                        alt={`${appDetails.name} screenshot ${
                          currentImageIndex + 1
                        }`}
                        className="app-screenshot"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              {!showVideo && appDetails.screenshots.length > 1 && (
                <div className="image-navigation">
                  <button className="nav-button prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <button className="nav-button next" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </div>
              )}

              {/* Pagination dots */}
              {!showVideo && appDetails.screenshots.length > 1 && (
                <div className="pagination-dots">
                  {appDetails.screenshots.map((_, index) => (
                    <div
                      key={index}
                      className={`pagination-dot ${
                        index === currentImageIndex ? 'active' : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* App details */}
          <div className="app-details">
            <h3 className="app-title">{appDetails.name}</h3>

            <p className="app-description">{appDetails.description}</p>

            <div className="technologies">
              <h4 className="technologies-title">Technologies Used</h4>
              <div className="technology-badges">
                {appDetails.technologies.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="download-links">
              <a href={appDetails.appStoreLink} className="app-store-link">
                App Store
              </a>
              <a href={appDetails.playStoreLink} className="play-store-link">
                Google Play
              </a>
            </div>

            <div className="additional-links">
              <a href={appDetails.githubLink} className="github-link">
                <FaGithub /> View Code
              </a>
              <a href={appDetails.websiteLink} className="website-link">
                <FaExternalLinkAlt /> Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileShowcase
