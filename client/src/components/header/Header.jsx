import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header-container">
        <div className="header">
            <img src="./src/assets/homepage-poster.jpg" alt="Image"/>
            <div className="header_float">
            <p>Learning that gets you</p>
            <p>Skills for your present (and your future). Get started.</p>
            </div>
        </div>
    </div>
  )
}

export default Header