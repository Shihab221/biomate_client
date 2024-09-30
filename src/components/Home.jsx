import React from "react";
import coverphoto from "../assets/biobanner.jpg";
import RunningCourses from "./RunningCourses";
import Features from "./Features";
import Social from "./Social";
import mentor from "../assets/mentor.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-10 space-y-5 sm:space-y-0 px-5 sm:px-10 py-10 my-10">
        <div className="flex flex-col text-center items-center sm:items-start justify-center sm:w-[500px] space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-500 text-start">
            Welcome to <br />
            <div className="text-slate-900 pt-4 pb-2 text-4xl sm:text-5xl lg:text-6xl font-bold">
              BIO
              <span className="bg-green-700 text-white rounded-md px-2 ml-1">
                Mate
              </span>
            </div>
          </h2>
          <p className="text-gray-800 my-3 sm:my-5 font-montserrat text-base sm:text-lg">
            Let's make together 'Biology' More Easier
          </p>
          <Link to="/login">
            <button className="border border-slate-900 mt-3 py-2 px-4 rounded-full text-slate-900 text-sm sm:text-base hover:bg-slate-900 hover:text-green-400 hover:scale-105 transition-all">
              Register Now
            </button>
          </Link>
        </div>
        <div className="pt-10 sm:pt-0">
          <img
            src={coverphoto}
            alt="coverphoto"
            className="max-w-full sm:max-w-md mx-auto"
          />
        </div>
      </div>
      <div className="font-roboto py-10 mt-10">
        <h2 className="px-5 py-5 text-slate-900 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
          Running <span className="text-green-600">Courses</span>
        </h2>
      </div>
      <RunningCourses />
      <Features />
      {/* Bio */}
      <div className="items-center w-full flex flex-col py-10 pt-20">
        <h2 className="text-slate-800 text-3xl font-bold">
          Meet our <span className="text-green-500">Mentor</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-evenly space-y-5 sm:space-y-0 sm:space-x-4 py-10">
          <img
            src={mentor}
            alt="biobannerimage"
            className="w-full sm:w-[480px] h-auto rounded-md p-5"
          />
          <p className="text-slate-500 max-w-sm pt-5 pl-5 sm:pt-0 flex items-center text-lg sm:text-xl font-bold text-center sm:text-left">
            Instructor
            <br />
            Ismum Ahmed
            <br /> Sir Salimullah Medical College, Dhaka <br />
          </p>
        </div>
      </div>

      <Social />
    </div>
  );
};

export default Home;
