import React from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import MainLayout from './layouts/Mainlayout';
import Home from './pages/home/home'
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App