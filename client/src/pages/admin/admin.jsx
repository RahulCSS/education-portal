import React from 'react'
import './admin.css'
import Dashboard from '../../components/adminpage/dashboard/Dashboard';
import { DashboardIcon, AvatarIcon, PersonIcon, BellIcon, ArchiveIcon, QuestionMarkCircledIcon,  } from "@radix-ui/react-icons"

const Admin = () => {
  const menu = [
    ['Dashboard',<DashboardIcon />],
    ['Students',<AvatarIcon />],
    ['Tutors',<PersonIcon />],
    ['Courses',<ArchiveIcon />],
    ['Announcements',<BellIcon />],
    ['Queires',<QuestionMarkCircledIcon />]
  ];

  return (
    <div className="admin-container">
      <div className="admin-grid">
        <div className="sidebar">
          <p>LMS Admin</p>
          {menu.map((items,index)=> {
            return (
              <div key= {index} className='menu-icon'>
                <a>{items[1]}</a>
                <span>{items[0]}</span>
              </div>
            )
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