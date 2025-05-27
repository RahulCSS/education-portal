import React from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import MainLayout from './layouts/Mainlayout';
import Home from './pages/home/home'
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup'
import Toast from './components/toast/Toast';
import Admin from './pages/admin/admin';
import ProtectedRoute from './route/ProtectedRoute';
import Tutor from './pages/tutor/Tutor';
import Student from './pages/student/Student';
import CourseDetail from './components/tutorpage/course/CourseDetail';


const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
            <Route path="/student" element={<Student />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Tutor']} />}>
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/tutor/course/:courseId" element={<CourseDetail />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
    </div>
  )
}

export default App