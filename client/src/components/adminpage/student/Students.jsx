import React,{ useEffect, useState } from 'react'
import './Students.css'
import { GetAllStudents } from '../../../apicalls/admin'
import { showToast } from '../../../store/toastSlice'
import { useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon, CaretSortIcon, ReloadIcon } from "@radix-ui/react-icons"

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
      <div className="students-table">
      <div className="table-controls">
        <div className="count">
        <label>
          Count per page:
          <select>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
        </div>
        <div className="reload-icon"><ReloadIcon />Reload</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <span className="th-content">
                Fullname <CaretSortIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                E-Mail <CaretSortIcon />
              </span>
            </th>
            <th>
                Phone
            </th>
            <th>
                Location
            </th>
            <th>
              <span className="th-content">
                Joined On <CaretSortIcon />
              </span>
            </th>
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
      <div className="student-pagination">
        <span className="paginate"><ChevronLeftIcon /></span>
        <span className="pagecount">Page 1 of 10</span>
        <span className="paginate"><ChevronRightIcon /></span>
      </div>
      </div>
    </div>
  )
}

export default Students