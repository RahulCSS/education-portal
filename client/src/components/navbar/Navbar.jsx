import React from 'react'
import { PersonIcon, SunIcon, ReaderIcon } from "@radix-ui/react-icons"
import './Navbar.css'

const Navbar = () => {
  return (
        <div className="navbar">
                <div className='title'>
                    <img src="./src/assets/brain.png" alt="logo"/>
                    <a>Elevate</a>
                    <a>lms</a>
                </div>
                <ul className="menu">
                    <li>Explore</li>
                    <li>Academy</li>
                    <li>AboutUs</li>
                    <li>ContactUs</li>
                </ul>
            <div className='profile'>
                <a><SunIcon /></a>
                <a><PersonIcon /></a>
                <a><ReaderIcon /></a>
            </div>
        </div>
  )
}

export default Navbar