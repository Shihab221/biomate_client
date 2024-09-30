// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://biomate-server-49d3.vercel.app/api/allcourses")
//       .then((response) => {
//         setCourses(response.data.courses);
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error);
//       });
//   }, []);

//   const handleClick = (courseId) => () => {
//     navigate(`/coursedetails/${courseId}`);
//   };

//   return (

//     <div className="bg-white ">
//       <ul className="flex flex-col items-center justify-center md:flex-row ">
//         {courses.map((course) => (
//           <li
//             key={course._id}
//             className="mx-5 my-10 px-5 py-4 max-w-[560px] bg-slate-200 border rounded-md border-slate-500 flex flex-col items-center justify-center "
//           >
//             <img
//               alt="courseimage"
//               src={course.courseImage}
//               className="w-[520px] h-auto rounded-md my-2 items-center justify-center"
//             />
//             <h2 className="text-slate-800 font-bold text-lg ">
//               {course.title}
//             </h2>
//             <p className="text-gray-800 line-clamp-4 ">{course.description}</p>

//             <button
//               className="border border-slate-900 mt-3 py-1 px-4 rounded-full text-slate-900 text-sm hover:bg-slate-900 hover:text-green-400 hover:scale-105 transition-all"
//               onClick={handleClick(course._id)}
//             >
//               Enroll
//             </button>
//             {/* <h6>{course._id}</h6> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseList;

import React, { useState, useEffect } from "react";
import axios from "./utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"; // Ensure you have this component

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("api/allcourses")
      .then((response) => {
        setCourses(response.data.courses);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(true); // Set loading to false in case of error
      });
  }, []);

  const handleClick = (courseId) => () => {
    navigate(`/coursedetails/${courseId}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white">
          <ul className="flex flex-col items-center justify-center md:flex-row">
            {courses.map((course) => (
              <li
                key={course._id}
                className="mx-5 my-10 px-5 py-4 max-w-[560px] bg-slate-200 border rounded-md border-slate-500 flex flex-col items-center justify-center"
              >
                <img
                  alt="courseimage"
                  src={`https://biomate-server-49d3.vercel.app/${course.courseImage}`}
                  className="w-[520px] h-auto rounded-md my-2 items-center justify-center"
                />
                <h2 className="text-slate-800 font-bold text-lg">
                  {course.title}
                </h2>
                <p className="text-gray-800 line-clamp-4">
                  {course.description}
                </p>

                <button
                  className="border border-slate-900 mt-3 py-1 px-4 rounded-full text-slate-900 text-sm hover:bg-slate-900 hover:text-green-400 hover:scale-105 transition-all"
                  onClick={handleClick(course._id)}
                >
                  Enroll
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CourseList;
