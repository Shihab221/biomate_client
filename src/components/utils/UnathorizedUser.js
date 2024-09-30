// const UnathorizedUser = () => {
//   return (
//     <div className="text-slate-900">
//       <h1>Coursse details page</h1>
//       <h1>Course title</h1>
//       <p>course description</p>
//     </div>
//   );
// };

// export default UnathorizedUser;

import React, { useState, useEffect } from "react";
import axios from "./axiosInstance";
import { useParams } from "react-router-dom";

const UnathorizedUser = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`api/course/${courseId}`)
      .then((response) => {
        setCourse(response.data.course);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-slate-900">
      <h1>Course Details Page</h1>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default UnathorizedUser;
