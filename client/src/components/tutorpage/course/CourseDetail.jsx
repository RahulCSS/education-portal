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
  PlusIcon,
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
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: "",
      tutor: userId,
      imageUrl:"",
      videoUrl:""
    });
    const [isFocused, setIsFocused] = useState({
      istitle: false,
      isemail: false,
      isprice: false,
      istutor: false,
    });

  // Handlers
  const toggleMode = () => {
    setLightMode(!lightMode);
  };
  const toogleshowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  }
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

  // API
  const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      const formDataImage = new FormData();
      formDataImage.append("image", file);
  
      try{
        const response = await UploadImage(formDataImage);
  
        if (response.success) {
          dispatch(showToast({ message: "Image uploaded", type: "success" }));
          setFormData((prev) => ({
            ...prev,
            imageUrl: response.data.secure_url,
          }));
          } else {
            dispatch(showToast({ message: data.message, type: "error" }));
          }
      } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
      }
    };

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

  const handleSubmit = () => {

  }

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
            <h1>{course.title}</h1>
            <img src={course.imageUrl} alt="Course Preview" />
            <div className="course-details">
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
            <div className="courses-container">
            <div className="courses">
                    <h1>Modules</h1>
                    <div className="add-course-details">
                      <span className="add-course">
                        <PlusIcon /> Add Module
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
                            <div className="course-form file-input-form">
                              <label htmlFor="course-image" className="file-input-label">Upload Image </label>
                              <input
                                id="course-image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="file-input"
                              />
                              {formData.imageUrl && (
                                <div className="image-preview">
                                  <img src={formData.imageUrl} alt="Course Preview" />
                                </div>
                              )}
                            </div>
                            <div className="course-form file-input-form">
                              <label htmlFor="course-image" className="file-input-label">Upload Video </label>
                              <input
                                id="course-image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="file-input"
                              />
                              {formData.imageUrl && (
                                <div className="image-preview">
                                  <img src={formData.imageUrl} alt="Course Preview" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="course-form-section">
                            <div className="course-form">
                              <button>Add New Module</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
      </div>
    </div>
  );
};

export default CourseDetail;
