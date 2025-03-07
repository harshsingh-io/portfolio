import React from 'react'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Skills from './components/services/Skills'
// import Portfolio from './components/projects/Portfolio'
import MobilePortfolio from './components/mobilePortfolio/MobilePortfolio'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Skills />
      {/* <Portfolio /> */}
      <MobilePortfolio />
      <Contact />
      <Footer />
    </>
  )
}

export default App
