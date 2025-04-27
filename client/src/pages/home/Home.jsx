import React from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Courses from '../../components/courses/Courses'


const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Courses />
    </div>
  )
}

export default Home