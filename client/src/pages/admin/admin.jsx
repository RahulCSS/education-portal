import React from 'react'
import './admin.css'
import Dashboard from '../../components/adminpage/dashboard/Dashboard';

const Admin = () => {
  const menu = [
    'Dashboard',
    'Students',
    'Tutors',
    'Courses',
    'Announcements',
    'Queires',
  ]
  return (
    <div className="admin-container">
      <div className="admin-grid">
        <div className="sidebar">
          <p>LMS Admin</p>
          {menu.map((items,index)=> {
            return <span key={index}>{items}</span>
          })}
        </div>
          <div className="topbar">
            Menu
          </div>
          <div className="content">
            <Dashboard />
          </div>
      </div>
    </div>
  )
}

export default Admin;