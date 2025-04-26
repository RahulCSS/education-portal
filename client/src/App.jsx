import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/home/home'
import Navbar from './components/navbar/Navbar';
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App