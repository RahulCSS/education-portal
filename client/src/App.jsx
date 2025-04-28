import React from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import MainLayout from './layouts/Mainlayout';
import Home from './pages/home/home'
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup'
import Toast from './components/toast/Toast';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toast />
    </div>
  )
}

export default App