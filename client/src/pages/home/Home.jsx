import React from 'react'
import './Home.css'
import Header from '../../components/homepage/header/Header'
import Library from '../../components/homepage/library/Library'


const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Library />
    </div>
  )
}

export default Home