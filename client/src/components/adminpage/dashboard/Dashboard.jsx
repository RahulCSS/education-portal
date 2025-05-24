import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { AvatarIcon, PersonIcon, ArchiveIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { GetCount } from '../../../apicalls/admin'

const Dashboard = () => {
  const [count,setCount] = useState({
    students:'',
    tutors:'',
    courses:'',
    enrollments:''
  })
  
  //API
  const getCount = async () => {
    try{
      const response = await GetCount();
      if(response.success === true ){
        setCount(response.data);
      }
    }catch(error){
          dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
  };

  useEffect (() => {
    getCount();
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard-count">
          <div className="studentcount counts">
            <span>
              <AvatarIcon />
            </span>
            <div className="counter">
              <span>{count.students}</span>
              <p>Total Students </p>
            </div>
          </div>
          <div className="tutorcount counts">
            <span>
              <PersonIcon />
            </span>
            <div className="counter">
              <span>{count.tutors}</span>
              <p>Total Tutors </p>
            </div>
          </div>
          <div className="coursecount counts">
            <span>
              <ArchiveIcon />
            </span>
            <div className="counter">
              <span>{count.courses}</span>
              <p>Total Course</p>
            </div>
          </div>
          <div className="enrollmentcount counts">
            <span>
              <Pencil2Icon />
            </span>
            <div className="counter">
              <span>{count.enrollments}</span>
              <p>Total Enrollments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard