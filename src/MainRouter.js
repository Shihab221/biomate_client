import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";
import AllUsers from "./components/admin/AllUsers";
import AllCourses from "./components/admin/AllCourses";
import EditCourse from "./components/courses/EditCourse";
import EditProfile from "./components/user/EditUserProfile";
import AddCourse from "./components/courses/AddCourse";
import Courses from "./components/courses/Courses";
import CreateUser from "./components/user/CreateUser";
import UnathorizedUser from "./components/utils/UnathorizedUser";
import LoggedOutUser from "./components/user/LoggedOutUser";
import Footer from "./components/Footer";
import CourseDetails from "./CourseDetails";
import Payment from "./components/Payment";
import Login from "./components/user/Login";
import PaymentCompleted from "./components/admin/PaymentCompleted";

function MainRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginOrSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/details" element={<CourseDetails />} /> */}
        <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/courses" element={<AllCourses />} />
        <Route path="/editCourse" element={<EditCourse />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin/createUser" element={<CreateUser />} />
        <Route path="/unathorizedUser" element={<UnathorizedUser />} />
        <Route path="/loggedoutUser" element={<LoggedOutUser />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentcompleted" element={<PaymentCompleted />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default MainRouter;
