import React, { useEffect, useState } from "react";
import './CourseDetail.css'
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetCoursebyId } from "../../../apicalls/course";
import {
  AvatarIcon,
  RowsIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { LogoutUser } from "../../../apicalls/user";
import { showToast } from "../../../store/toastSlice";
import { clearUser } from "../../../store/userSlice";
import { useNavigate } from "react-router";

const formatMonthYear = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

const CourseDetail = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  // Local State
  const [lightMode, setLightMode] = useState(true);
  const [course, setCourse] = useState(null);
  const [ showUserMenu, setShowUserMenu ] = useState(false);

  // Handlers
  const toggleMode = () => {
    setLightMode(!lightMode);
  };
  const toogleshowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  }

  const handleLogout = async () => {
    if (userId) {
      try {
        const response = await LogoutUser(userId);
        if (response.success === true) {
          dispatch(clearUser());
          dispatch(
            showToast({ message: `${response.message}`, type: "success" })
          );
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          dispatch(showToast({ message: `${response.message}`, type: "info" }));
        }
      } catch (error) {
        dispatch(showToast({ message: `${error.message}`, type: "error" }));
      }
    } else {
      dispatch(showToast({ message: "User not logged in", type: "info" }));
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await GetCoursebyId(courseId);
      if (response.success) {
        setCourse(response.data);
      } else {
        dispatch(showToast({ message: response.message, type: "info" }));
      }
    } catch (err) {
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [userId]);

  if (!course) return <div>Loading course details...</div>;

  return (
    <div className="admin-container">
      <div className="admin-grid">
        <div className="sidebar">
          <div className="avatar">
            <AvatarIcon />
            <p>LMS Tutor</p>
          </div>
          <div className="course-title">
            <img src={course.imageUrl} alt="Course Preview" />
            <h2>{course.title}</h2>
            <div>
            <p>
            <strong>Description:</strong> {course.description}
            </p>
            <p>
            <strong>Price:</strong> ₹{course.price}
            </p>
            <p>
            <strong>Created At:</strong>{" "}
            {formatMonthYear(course.createdAt)}
            </p>
            </div>
          </div>
          
        </div>
          <div className="topbar">
            <div className="admin-menu">
              <span onClick={toogleshowUserMenu}>
                <RowsIcon />
              </span>
              <span>Menu</span>
              <div className={`user-menu ${showUserMenu ? 'open' : ''}`} >
                <ul>
                <li>My Profile</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            </div>
            <a onClick={toggleMode}>
                      <div className="icon-wrapper">
                        <span className={`icon ${lightMode ? "visible" : ""}`}>
                          <SunIcon />
                        </span>
                        <span className={`icon ${!lightMode ? "visible" : ""}`}>
                          <MoonIcon />
                        </span>
                      </div>
                    </a>
          </div>
          <div className="content">
            <span className="corner top-left"></span>
            <span className="corner top-right"></span>
            <span className="corner bottom-left"></span>
            <span className="corner bottom-right"></span>
            
          </div>
      </div>
    </div>
  );
};

export default CourseDetail;
