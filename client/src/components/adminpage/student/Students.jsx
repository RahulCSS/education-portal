import React,{ useEffect, useState } from 'react'
import './Students.css'
import { GetStudents } from '../../../apicalls/admin'
import { showToast } from '../../../store/toastSlice'
import { useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon, CaretSortIcon, ReloadIcon } from "@radix-ui/react-icons"

const Students = () => {
  const dispatch = useDispatch();

  const formatMonthYear = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Local State
  const [ allStudents, setAllStudents ] = useState([]);
  const [ queryParams, setQueryParams ] = useState({
    page:1,
    limit:5,
    sortBy: 'fullname',
    sortOrder: 'asc'
  });
  const [ totalPages, setTotalPages ] = useState(10);

  //Handlers
  const handleSelect = (key,value) =>{
    setQueryParams((prev)=>({
      ...prev,
      [key] : value,
    }))
  }

  const handlePagination = (change)=>{
    if(change === 'dec' && queryParams.page > 1){
      handleSelect('page', queryParams.page - 1);
    } else if (change === 'inc' && queryParams.page < totalPages) {
      handleSelect('page', queryParams.page + 1);
    }
  };

  const handleSortByOrder = (field) =>{
    setQueryParams((prev) => {
      if (prev.sortBy !== field) {
        return { ...prev, sortBy: field, sortOrder: 'asc', page: 1 };
      }
      const newOrder = prev.sortOrder === 'asc' ? 'desc' : 'asc';
      return { ...prev, sortOrder: newOrder, page: 1 };
    });
  }

  const handleReload = () =>{
    setQueryParams({
      page:1,
      limit:5,
      sortBy: 'fullname',
      sortOrder: 'asc'
    })
  };

  // API
  const getStudents = async ()=> {
    try{
      const response = await GetStudents();
      if(response.success === true ){
        setAllStudents(response.data);
      }
    } catch(error){
      dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
  };

  useEffect(()=>{
    console.log(queryParams);
    getStudents();
  },[queryParams]);

  return (
    <div className="students-container">
      <div className="students">
      <h1>Students</h1>
      <div className="students-table">
      <div className="table-controls">
        <div className="count">
        <label>
          Count per page:
          <select 
          value={queryParams.limit}
          onChange={(e) => handleSelect('limit',e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        </div>
        <div className="reload-icon" onClick={handleReload}><ReloadIcon />Reload</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <span className="th-content">
                Fullname <CaretSortIcon onClick={()=>{handleSortByOrder('fullname')}}/>
              </span>
            </th>
            <th>
              <span className="th-content">
                E-Mail <CaretSortIcon onClick={()=>{handleSortByOrder('email')}}/>
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
                Joined On <CaretSortIcon onClick={()=>{handleSortByOrder('createdAt')}}/>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
        {allStudents.length === 0 ? (
          <tr>
              <td colSpan="6">No students found.</td>
            </tr>
          ) : (
            allStudents.map((student)=>
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
        <span className="paginate" onClick={() => handlePagination('dec')}><ChevronLeftIcon /></span>
        <span className="pagecount">Page {queryParams.page} of {totalPages}</span>
        <span className="paginate" onClick={() => handlePagination('inc')}><ChevronRightIcon /></span>
      </div>
      </div>
    </div>
  )
}

export default Students