import React,{ useEffect, useState } from 'react'
import './Students.css'
import { GetAllStudents } from '../../../apicalls/admin'
import { showToast } from '../../../store/toastSlice'
import { useDispatch } from 'react-redux';

const Students = () => {
  const dispatch = useDispatch();

  const formatMonthYear = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Local State
  const [ AllStudents, setAllStudents ] = useState([]);

  // API
  const getAllStudents = async ()=> {
    try{
      const response = await GetAllStudents();
      if(response.success === true ){
        setAllStudents(response.data);
      }
    } catch(error){
      dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
  };

  useEffect(()=>{
    getAllStudents();
  },[]);

  return (
    <div className="students-container">
      <div className="students"> 
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Joined on</th>
          </tr>
        </thead>
        <tbody>
        {AllStudents.length === 0 ? (
          <tr>
              <td colSpan="6">No students found.</td>
            </tr>
          ) : (
            AllStudents.map((student)=>
              (
                <tr key={student._id}>
                  <td>{student.fullname}</td>
                  <td>{student.email}</td>
                  <td className={student.phone ? '' : 'center'}>{student.phone || '-'}</td>
                  <td className={student.address.state ? '' : 'center'}>{student.address?.state || '-'}</td>
                  <td>{formatMonthYear(student.createdAt)}</td>
                </tr>
              )))
            }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Students