import React, { useState } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
} from 'react-icons/fa'
import './mobile-showcase.css'

const MobileShowcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // App details from your projects - using the AI Fashion App as featured
  const appDetails = {
    name: 'AI Fashion Stylist App',
    description:
      'An AI-powered fashion application that provides personalized clothing recommendations based on user preferences, body type, and current fashion trends. Features smart outfit suggestions and style assistance.',
    technologies: ['Flutter', 'TensorFlow', 'AI/ML', 'FastAPI'],
    appStoreLink: '#',
    playStoreLink: '#',
    githubLink: 'https://github.com/harshsingh-io/lulu_stylist_app',
    websiteLink: '#',
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
    if (isAnimating) return // Prevent rapid clicking

    setDirection('next')
    setIsAnimating(true)

    // After animation duration, update the image index
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === appDetails.screenshots.length - 1 ? 0 : prevIndex + 1
      )
      setIsAnimating(false)
    }, 300) // Match this with CSS transition duration
  }

  const prevImage = () => {
    if (isAnimating) return // Prevent rapid clicking

    setDirection('prev')
    setIsAnimating(true)

    // After animation duration, update the image index
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? appDetails.screenshots.length - 1 : prevIndex - 1
      )
      setIsAnimating(false)
    }, 300) // Match this with CSS transition duration
  }

  // Function to directly navigate to a specific image when clicking a dot
  const goToImage = (index) => {
    if (isAnimating || index === currentImageIndex) return

    setDirection(index > currentImageIndex ? 'next' : 'prev')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsAnimating(false)
    }, 300)
  }

  // Preload images for smoother transitions
  React.useEffect(() => {
    appDetails.screenshots.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [appDetails.screenshots])

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
                        title={`${appDetails.name} demo video`}
                      ></iframe>
                    ) : (
                      <div
                        className={`screenshot-slider ${
                          isAnimating ? `sliding-${direction}` : ''
                        }`}
                        onClick={() => setIsModalOpen(true)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={appDetails.screenshots[currentImageIndex]}
                          alt={`${appDetails.name} screenshot ${
                            currentImageIndex + 1
                          }`}
                          className="app-screenshot"
                          key={currentImageIndex}
                        />
                      </div>
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
                      onClick={() => goToImage(index)}
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
              {appDetails.appStoreLink && appDetails.appStoreLink !== '#' ? (
                <a href={appDetails.appStoreLink} className="app-store-link">
                  App Store
                </a>
              ) : (
                <span className="app-store-link disabled">App Store</span>
              )}

              {appDetails.playStoreLink && appDetails.playStoreLink !== '#' ? (
                <a href={appDetails.playStoreLink} className="play-store-link">
                  Google Play
                </a>
              ) : (
                <span className="play-store-link disabled">Google Play</span>
              )}
            </div>

            <div className="additional-links">
              {appDetails.githubLink && appDetails.githubLink !== '#' ? (
                <a href={appDetails.githubLink} className="github-link">
                  <FaGithub /> View Code
                </a>
              ) : (
                <span className="github-link disabled">
                  <FaGithub /> View Code
                </span>
              )}

              {appDetails.websiteLink && appDetails.websiteLink !== '#' ? (
                <a href={appDetails.websiteLink} className="website-link">
                  <FaExternalLinkAlt /> Visit Website
                </a>
              ) : (
                <span className="website-link disabled">
                  <FaExternalLinkAlt /> Visit Website
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal/Lightbox */}
      {isModalOpen && (
        <div className="screenshot-modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Add toggle buttons at the top of modal - styled like the pill in the image */}
            <div className="modal-media-toggle">
              <div className="app-style-toggle">
                <button
                  className={`app-toggle-option ${!showVideo ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowVideo(false)
                  }}
                >
                  Images
                </button>
                <button
                  className={`app-toggle-option ${showVideo ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowVideo(true)
                  }}
                >
                  Video
                </button>
              </div>
            </div>

            <div className="modal-phone-frame">
              <div className="modal-phone-notch"></div>
              {showVideo ? (
                <iframe
                  src={`https://drive.google.com/file/d/${appDetails.demoVideoId}/preview`}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  className="modal-video"
                  frameBorder="0"
                  title={`${appDetails.name} demo video modal`}
                ></iframe>
              ) : (
                <div
                  className={`modal-screenshot-container ${
                    isAnimating ? `sliding-${direction}` : ''
                  }`}
                >
                  <img
                    src={appDetails.screenshots[currentImageIndex]}
                    alt={`${appDetails.name} screenshot ${
                      currentImageIndex + 1
                    }`}
                    className="modal-screenshot"
                  />
                </div>
              )}
            </div>

            {/* Only show navigation for images */}
            {!showVideo && (
              <>
                {/* Navigation buttons for modal */}
                <div className="modal-image-navigation">
                  <button
                    className="modal-nav-button prev"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="modal-nav-button next"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Pagination dots for modal */}
                <div className="modal-pagination-dots">
                  {appDetails.screenshots.map((_, index) => (
                    <div
                      key={index}
                      className={`modal-pagination-dot ${
                        index === currentImageIndex ? 'active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToImage(index)
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              className="modal-close"
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(false)
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileShowcase
