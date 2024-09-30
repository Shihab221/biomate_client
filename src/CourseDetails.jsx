import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import { getLoggedUserData } from "./features/eLearningSlice"; // Import your selector to get user data

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserData); // Get logged user data

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://biomate-server-49d3.vercel.app/api/allcourses/${courseId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleClick = () => {
    if (loggedUser && Object.keys(loggedUser).length > 0) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="text-slate-900 flex flex-col sm:flex-row m-10 px-5 sm:p-10 justify-center">
      <img
        src={`https://biomate-server-49d3.vercel.app/${course.courseImage}`}
        alt="courseimage"
        className="max-w-sm pr-5"
      />
      <div className="px-2 sm:px-10">
        <h1 className="text-3xl pb-5">{course.title}</h1>
        <p>Course level: {course.level}</p>
        <p>Course Duration: {course.duration}</p>
        <p>
          Course Fee:{" "}
          <span className="text-green-500 mx-1 px-1 font-bold rounded-sm bg-gray-200">
            {course.fee}{" "}
          </span>{" "}
          Tk.
        </p>
        <button
          className="flex items-center text-md mt-7 text-slate-800 hover:text-green-400 border border-slate-900 p-2 hover:bg-slate-900 rounded-md"
          onClick={handleClick}
        >
          Enroll Now
        </button>
        <p className="py-5">{course.description}</p>
      </div>
      {/* Render other course details */}
    </div>
  );
};

export default CourseDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const CourseDetails = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await fetch(`https://biomate-server-49d3.vercel.app/api/allcourses/${courseId}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setCourse(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   const handleClick = () => {
//     navigate("/payment"); // Navigate to the /payment route
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!course) {
//     return <div>Course not found</div>;
//   }

//   return (
//     <div className="text-slate-900 flex flex-row m-10 p-10 justify-center">
//       <img
//         src={course.courseImage}
//         alt="courseimage"
//         className="max-w-sm pr-5"
//       />
//       <div className="px-10">
//         <h1 className="text-3xl pb-5">{course.title}</h1>
//         <p>Course level: {course.level}</p>
//         <p>Course Duration: {course.duration}</p>
//         <button
//           className="flex items-center text-md mt-7 text-slate-800 hover:text-green-400 border border-slate-900 p-2 hover:bg-slate-900 rounded-md"
//           onClick={handleClick}
//         >
//           Enroll Now
//         </button>
//         <p className="py-5">{course.description}</p>
//       </div>
//       {/* Render other course details */}
//     </div>
//   );
// };

// export default CourseDetails;
