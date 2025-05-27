import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toastSlice";
import { GetCoursebyId } from "../../../apicalls/course";

const CourseDetail = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);

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

  if (!course) return <div>Loading course details...</div>;

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>
        <strong>Description:</strong> {course.description}
      </p>
      <p>
        <strong>Price:</strong> ₹{course.price}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(course.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default CourseDetail;
