import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  cleanFilterTerm,
  cleanReloginStatus,
  cleanStore,
  fetchCourses,
  fetchUsers,
  getCourses,
  getLoggedUserData,
  getMentorCourses,
  getUsers,
  getUserToken,
  reLoginUser,
  setCloseAccountForm,
  setCloseAccountModal,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  setLoggedUserStatus,
  setLoggedUserToEdit,
  setUserToken,
  signoutUser,
  userToken,
} from "../../features/eLearningSlice";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardUser,
  faHouse,
  faGear,
  faRightFromBracket,
  faUserGroup,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import ButtonGroupWithIcons from "./LeftSidePanelButtons";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  userIcon: {
    fontSize: "48px",
    marginTop: "60px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px",
    },
  },
  buttons: {
    fontSize: "24px",
    marginTop: "30px",
    textTransform: "none",
  },
  userInfo: {
    marginTop: "20px",
    color: "blue",
    fontSize: "28px",
  },
}));

const DashboardLeftPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mentorCourses = useSelector(getMentorCourses);
  const users = useSelector(getUsers);
  const courses = useSelector(getCourses);
  const token = useSelector(getUserToken);

  const loggedUser = useSelector(getLoggedUserData);

  const redirectToDashboard = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountModal(false));
    dispatch(setCloseAccountForm(false));
    navigate("/dashboard");
  };

  const displayAllUsers = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountModal(false));
    dispatch(setCloseAccountForm(false));
    const users = {
      firstItem: 0,
      lastItem: 12,
    };
    dispatch(cleanFilterTerm());
    dispatch(fetchUsers(users));
    navigate("/admin/users");
  };

  const displayAllCourses = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountModal(false));
    dispatch(setCloseAccountForm(false));
    const courses = {
      firstItem: 0,
      lastItem: 12,
    };

    const users = {
      firstItem: 0,
      lastItem: 12,
    };
    dispatch(cleanFilterTerm());
    dispatch(fetchUsers(users));
    dispatch(fetchCourses(courses));
    navigate("/admin/courses");
  };

  const viewAllAvailableCourses = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountModal(false));
    dispatch(setCloseAccountForm(false));
    const courses = {
      firstItem: 0,
      lastItem: 12,
    };
    dispatch(cleanFilterTerm());
    dispatch(fetchCourses(courses));
    navigate("/courses");
  };

  const editUser = () => {
    dispatch(setLoggedUserToEdit(loggedUser.user));
    dispatch(setEditUserProfileForm(true));
  };

  const signout = () => {
    dispatch(signoutUser());
    dispatch(setLoggedUserStatus());
    window.location.reload();
    navigate("/");
  };

  const adminButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      displayAllUsers,
      displayAllCourses,
      editUser,
      signout,
    ],
    buttons: ["Dashboard", "Users", "Courses", "Edit profile", "Logout"],
    icons: [faHouse, faUserGroup, faCube, faGear, faRightFromBracket],
  };

  const userButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      loggedUser?.user && loggedUser.user.role === "student"
        ? viewAllAvailableCourses
        : null,
      editUser,
      signout,
    ],
    buttons: [
      "Dashboard",
      loggedUser?.user && loggedUser.user.role === "student" ? "Courses" : null,
      "Edit Profile",
      "Logout",
    ],
    icons: [
      faHouse,
      loggedUser?.user && loggedUser.user.role === "student"
        ? faChalkboardUser
        : null,
      faGear,
      faRightFromBracket,
    ],
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  const handlePaymentCompleted = () => {
    navigate("/paymentcompleted");
  };

  return (
    <>
      <div className="bg-white m-0 p-0 border-r border-gray-600 max-w-[260px]">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faUser}
            className="border rounded-full w-16 h-16 p-4 mt-6 bg-slate-600"
            color="primary"
          />
          <h5 className=" py-5 text-slate-700 font-bold text-xl font-gnr">
            {loggedUser?.user
              ? `${formatUserData(loggedUser.user.firstName)} ${formatUserData(
                  loggedUser.user.lastName
                )}`
              : null}
          </h5>
        </div>

        <div className="flex justify-center items-center">
          <ButtonGroupWithIcons
            className="text-green-500"
            buttons={
              loggedUser?.user && loggedUser.user.role === "admin"
                ? adminButtonsAndIcons.buttons
                : userButtonsAndIcons.buttons.filter(Boolean)
            }
            clickEvents={
              loggedUser?.user && loggedUser.user.role === "admin"
                ? adminButtonsAndIcons.clickEvents
                : userButtonsAndIcons.clickEvents.filter(Boolean)
            }
            icons={
              loggedUser?.user && loggedUser.user.role === "admin"
                ? adminButtonsAndIcons.icons
                : userButtonsAndIcons.icons.filter(Boolean)
            }
          />
        </div>

        {loggedUser?.user && loggedUser.user.role === "student" ? (
          <>
            <div className="text-white flex flex-col items-center">
              <h5 variant="h6" className="text-slate-900 flex text-center">
                Completed
                <br />
                courses :
                <br />
                {loggedUser.user.completedCourses.length}
              </h5>
              <h5 variant="h6" className="text-slate-900 flex text-center">
                In progress :
                <br />
                {loggedUser.user?.enrolledInCourses
                  ? [...new Set(loggedUser.user.enrolledInCourses)].length -
                    loggedUser.user.completedCourses.length
                  : "0"}
              </h5>
            </div>
          </>
        ) : loggedUser?.user && loggedUser.user.role === "mentor" ? (
          <>
            <h5 variant="h6" className="text-slate-900 flex text-center">
              Total number <br />
              of courses
              <br />
              {mentorCourses.totalNumOfCourses}
            </h5>
          </>
        ) : loggedUser?.user && courses?.data && users?.data ? (
          <>
            <div className="text-slate-400 flex flex-col items-center pt-5 pb-10">
              <h5 variant="h6" className="font-poppins">
                Total Users
                <span className="text-sky-300">: {users.totalNumOfUsers}</span>
              </h5>
              <h5 variant="h6" className=" flex text-center font-poppins">
                Total courses
                <span className="text-sky-300">
                  {" "}
                  : {courses.totalNumOfCourses}
                </span>
              </h5>
            </div>
          </>
        ) : null}
        {loggedUser && loggedUser.user && loggedUser.user.role === "admin" ? (
          <button
            className="border bg-slate-800 text-slate-400 p-2 items-center justify-center w-full hover:bg-green-500 hover:text-slate-900 hover:font-bold"
            onClick={handlePaymentCompleted}
          >
            Payment Completed
          </button>
        ) : null}
      </div>
    </>
  );
};

export default DashboardLeftPanel;
