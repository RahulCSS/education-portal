import React, { useEffect, useState } from "react";
import "./Courses.css";
import { GetCoursebyId } from "../../../apicalls/course";
import { AddCourse } from "../../../apicalls/course";
import { showToast } from "../../../store/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CaretSortIcon,
  ReloadIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

const formatMonthYear = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

const Courses = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const userName = useSelector((state) => state.user.fullname);

  // Local State
  const [allCourses, setAllCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    tutor: "",
  });
  const [isFocused, setIsFocused] = useState({
    istitle: false,
    isemail: false,
    isprice: false,
    istutor: false,
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    sortBy: "fullname",
    sortOrder: "asc",
  });

  // Handlers
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

    if (value.length > 0) {
      setIsFocused({
        ...isFocused,
        [`is${name}`]: true,
      });
    } else if (value.length == 0) {
      setIsFocused({
        ...isFocused,
        [`is${name}`]: false,
      });
    }
  };

  // Handles submission of formdata
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AddCourse(formData);
      if (response.success === true) {
        dispatch(
          showToast({ message: `${response.message}`, type: "success" })
        );
        setFormData({
          title: "",
          description: "",
          price: "",
          tutor: "",
        });
        setIsFocused({
          istitle: false,
          isemail: false,
          isprice: false,
          istutor: false,
        });
        getCourses();
      } else {
        dispatch(showToast({ message: `${response.message}`, type: "info" }));
      }
    } catch (error) {
      dispatch(showToast({ message: `${error.message}`, type: "error" }));
    }
  };

  // API
  const getCourses = async () => {
    const payload = {
      ...queryParams,
      userId: userId,
    };
    try {
      const response = await GetCoursebyId(payload);
      if (response.success === true) {
        setAllCourses(response.data);
        setTotalPages(response.totalpages == 0 ? 1 : response.totalpages);
      }
    } catch (error) {
      dispatch(showToast({ message: `${error.message}`, type: "error" }));
    }
  };

  useEffect(() => {
    getCourses();
  }, [queryParams]);

  return (
    <div className="courses-container">
      <div className="courses">
        <h1>Courses</h1>
        <div className="add-course-details">
          <span className="add-course">
            <PlusIcon /> Add Course
          </span>
          <div className="add-course-form">
            <form onSubmit={handleSubmit}>
              <div className="course-form-section">
                <div className="course-form">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    maxLength="32"
                    title="Please enter course title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  ></input>
                  <label
                    className={isFocused.istitle ? "focused" : ""}
                    htmlFor="title"
                  >
                    Title
                  </label>
                </div>
                <div className="course-form">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    title="Please enter course description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></input>
                  <label
                    className={isFocused.isdescription ? "focused" : ""}
                    htmlFor="description"
                  >
                    Description
                  </label>
                </div>
              </div>
              <div className="course-form-section">
                <div className="course-form">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    title="Please enter course price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  ></input>
                  <label
                    className={isFocused.isprice ? "focused" : ""}
                    htmlFor="price"
                  >
                    Price
                  </label>
                </div>
              </div>
              <div className="course-form-section">
                <div className="course-form">
                  <button>Add New Course</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="courses-catalogue">
          <div className="catalogue-controls">
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
                    Title{" "}
                    <CaretSortIcon
                      onClick={() => {
                        handleSortByOrder("fullname");
                      }}
                    />
                  </span>
                </th>
                <th>
                  <span className="th-content">
                    Description{" "}
                    <CaretSortIcon
                      onClick={() => {
                        handleSortByOrder("email");
                      }}
                    />
                  </span>
                </th>
                <th>Price</th>
                <th>Tutor</th>
                <th>
                  <span className="th-content">
                    Created On{" "}
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
              {allCourses.length === 0 ? (
                <tr className="no-courses">
                  <td colSpan="6">No Courses found</td>
                </tr>
              ) : (
                allCourses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>{course.price}</td>
                    <td>{userName}</td>
                    <td>{formatMonthYear(course.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="course-pagination">
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

export default Courses;
