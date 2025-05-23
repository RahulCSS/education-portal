import React, { useEffect, useState, useCallback } from "react";
import "./Tutors.css";
import { GetTutors } from "../../../apicalls/admin";
import { SignupTutor } from "../../../apicalls/admin";
import { showToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CaretSortIcon,
  ReloadIcon,
  PlusIcon,
  CrossCircledIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  CheckCircledIcon
} from "@radix-ui/react-icons";
import { CheckEmail } from "../../../apicalls/user";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const Tutors = () => {
  const dispatch = useDispatch();

  // Data
  const formatMonthYear = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  // Local State
  const [allTutors, setAllTutors] = useState([]);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    sortBy: "fullname",
    sortOrder: "asc",
  });
  const [totalPages, setTotalPages] = useState(10);
  const [formData, setFormData] = useState({
      fullname: '',
      email: '',
      password: '',
  });
  const [passwordVisible,setPasswordVisible] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [isEmailTaken, setisEmailTaken] = useState(false);
  const [isFocused, setIsFocused] = useState({
      isfullname: false,
      isemail: false,
      ispassword: false,
    });

  //Handlers
  const handleSelect = (key, value) => {
    setQueryParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePagination = (change) => {
    if (change === "dec" && queryParams.page > 1) {
      handleSelect("page", queryParams.page - 1);
    } else if (change === "inc" && queryParams.page < totalPages) {
      handleSelect("page", queryParams.page + 1);
    }
  };

  const handleSortByOrder = (field) => {
    setQueryParams((prev) => {
      if (prev.sortBy !== field) {
        return { ...prev, sortBy: field, sortOrder: "asc", page: 1 };
      }
      const newOrder = prev.sortOrder === "asc" ? "desc" : "asc";
      return { ...prev, sortOrder: newOrder, page: 1 };
    });
  };

  const handleReload = () => {
    setQueryParams({
      page: 1,
      limit: 5,
      sortBy: "fullname",
      sortOrder: "asc",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
        ...formData,
        [name]: value,
      };
    
    setFormData(updatedFormData);

    if(value.length > 0){
        setIsFocused({
            ...isFocused,
            [`is${name}`]: true,
        });
    } else if(value.length == 0){
        setIsFocused({
            ...isFocused,
            [`is${name}`]: false,
        });
    }
  };

  const togglevisiblity = () =>{
    setPasswordVisible(!passwordVisible);
  }

  // Handles submission of formdata
  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          const response = await SignupTutor(formData);
          if(response.success === true){
              dispatch(showToast({ message: `${response.message}`, type: 'success' }));
              setFormData({
                fullname: '',
                email: '',
                password: '',
              });
              setIsFocused({
                isfullname: false,
                isemail: false,
                ispassword: false,
              });
          }else{
              dispatch(showToast({ message: `${response.message}`, type: 'info' }));
          }
      }catch(error){
          dispatch(showToast({ message: `${error.message}`, type: 'error'}));
      }
    };

  // API
  const getTutors = async () => {
    try {
      const response = await GetTutors(queryParams);
      if (response.success === true) {
        setAllTutors(response.data);
        setTotalPages(response.totalpages == 0 ? 1: response.totalpages);
      }
    } catch (error) {
      dispatch(showToast({ message: `${error.message}`, type: "error" }));
    }
  };

  // Check of email already exists
  const checkEmail = async (email) => {
    setEmailChecked(false);
    if (!email) return;

    try {
      const response = await CheckEmail(email);
      const exists = response.success;
      setisEmailTaken(exists);
      setEmailChecked(true);
    } catch (error) {
      console.error("Email check failed", error);
      setEmailStatus("Error");
      setEmailChecked(true);
    }
  };

  // Debounce the API call
  const debouncedCheckEmail = useCallback(debounce(checkEmail, 3000), []);

  useEffect(() => {
    getTutors();
  }, [queryParams]);

  useEffect(() => {
    debouncedCheckEmail(formData.email);
  }, [formData.email, debouncedCheckEmail]);

  return (
    <div className="tutors-container">
      <div className="tutors">
        <h1>Tutors</h1>
        <div className="add-tutor-details">
          <span className="add-tutor">
            <PlusIcon /> Add Tutor
          </span>
          <div className="add-tutor-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
              <div className="form">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  maxLength="32"
                  title="Please enter your full name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  ></input>
                <label
                  className={isFocused.isfullname ? "focused" : ""}
                  htmlFor="fullname"
                  >
                  Full name
                </label>
              </div>
              <div className="form">
                <input
                  id="email"
                  name="email"
                  type="email"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter valid email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  ></input>
                <label
                  className={isFocused.isemail ? "focused" : ""}
                  htmlFor="email"
                  >
                  Email
                </label>
                <span>
                  {emailChecked &&
                    (isEmailTaken ? (
                      <CrossCircledIcon
                      style={{ color: "var(--redresult-color)" }}
                      />
                    ) : (
                      <CheckCircledIcon
                      style={{ color: "var(--greenresult-color)" }}
                      />
                    ))}
                </span>
              </div>
              </div>
              <div className="form-section">
              <div className="form">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  minLength="8"
                  title="Must contain at least one number, one uppercase, lowercase letter and at least 8 characters"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  ></input>
                <label
                  className={isFocused.ispassword ? "focused" : ""}
                  htmlFor="password"
                  >
                  Password
                </label>
                <span className="eye" onClick={togglevisiblity}>
                  {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
              <div className="form">
              <button>Register new Tutor</button>
              </div>
              </div>
            </form>
          </div>
        </div>
        <div className="tutors-table">
          <div className="table-controls">
            <div className="count">
              <label>
                Count per page:
                <select
                  value={queryParams.limit}
                  onChange={(e) => handleSelect("limit", e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </label>
            </div>
            <div className="reload-icon" onClick={handleReload}>
              <ReloadIcon />
              Reload
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  <span className="th-content">
                    Fullname{" "}
                    <CaretSortIcon
                      onClick={() => {
                        handleSortByOrder("fullname");
                      }}
                    />
                  </span>
                </th>
                <th>
                  <span className="th-content">
                    E-Mail{" "}
                    <CaretSortIcon
                      onClick={() => {
                        handleSortByOrder("email");
                      }}
                    />
                  </span>
                </th>
                <th>Phone</th>
                <th>Location</th>
                <th>
                  <span className="th-content">
                    Joined On{" "}
                    <CaretSortIcon
                      onClick={() => {
                        handleSortByOrder("createdAt");
                      }}
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {allTutors.length === 0 ? (
                <tr>
                  <td colSpan="6">No Tutors found.</td>
                </tr>
              ) : (
                allTutors.map((tutor) => (
                  <tr key={tutor._id}>
                    <td>{tutor.fullname}</td>
                    <td>{tutor.email}</td>
                    <td className={tutor.phone ? "" : "center"}>
                      {tutor.phone || "-"}
                    </td>
                    <td className={tutor.address.state ? "" : "center"}>
                      {tutor.address?.state || "-"}
                    </td>
                    <td>{formatMonthYear(tutor.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="tutor-pagination">
          <span className="paginate" onClick={() => handlePagination("dec")}>
            <ChevronLeftIcon />
          </span>
          <span className="pagecount">
            Page {queryParams.page} of {totalPages}
          </span>
          <span className="paginate" onClick={() => handlePagination("inc")}>
            <ChevronRightIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
