import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  cleanSignupMessage,
  setFilter,
  fetchUsers,
  fetchCourses,
  cleanFilterTerm,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  setCloseAccountForm,
  setCloseAccountModal,
  userToken,
  reLoginUser,
  getUserToken,
  cleanReloginStatus,
  cleanStore,
  getSignedOutUserStatus,
  setUserToken,
  getCourses,
  getUsers,
  setStoreStatus,
  setClearSignoutUserMessage,
} from "../../features/eLearningSlice";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import logo from "../../assets/biomatelogo.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserData);
  const signoutUserStatus = useSelector(getSignedOutUserStatus);
  const courses = useSelector(getCourses);
  const users = useSelector(getUsers);
  const signedOutUserStatus = useSelector(getSignedOutUserStatus);
  const token = useSelector(getUserToken);

  const routes = [
    "/dashboard",
    "/admin/users",
    "/admin/courses",
    "/editCourse",
    "/editProfile",
    "/addCourse",
    "/courses",
    "/admin/createUser",
    "/unathorizedUser",
  ];

  useEffect(() => {
    if (token === "Request failed with status code 401") {
      navigate("/");
      dispatch(setStoreStatus({ message: "cleaned" }));
    }

    if (loggedUser === "signout") {
      dispatch(cleanStore());
      dispatch(setStoreStatus({ message: "cleaned" }));
    }
    if (
      Object.keys(loggedUser).length === 0 &&
      !token?.message &&
      token.length !== 12
    ) {
      dispatch(userToken());
    }

    if (
      token?.message &&
      Object.keys(loggedUser).length === 0 &&
      token.length !== 12 &&
      token !== "user reloged" &&
      loggedUser !== "signout"
    ) {
      dispatch(reLoginUser(jwtDecode(token.message)._id));
      dispatch(setUserToken("user reloged"));
    }
    if (loggedUser?.relogin) {
      if (loggedUser.user.role === "admin" && Object.keys(users).length === 0) {
        const users = {
          firstItem: 0,
          lastItem: 12,
        };

        dispatch(fetchUsers(users));
      }

      if (
        loggedUser.user.role === "admin" &&
        Object.keys(courses).length === 0
      ) {
        const courses = {
          firstItem: 0,
          lastItem: 12,
        };
        dispatch(fetchCourses(courses));
      }
      dispatch(cleanReloginStatus());
    }
    if (!routes.includes(window.location.pathname)) {
      navigate("/");
    }
  }, [
    token,
    signoutUserStatus,
    loggedUser,
    token,
    signedOutUserStatus.message,
  ]);

  const login = () => {
    dispatch(setClearSignoutUserMessage());

    if (window.location !== "/") {
      navigate("/");
    }
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  const signup = () => {
    dispatch(setClearSignoutUserMessage());
    if (window.location !== "/") {
      navigate("/");
    }
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  const redirectToDashboard = () => {
    if (loggedUser?.user) {
      dispatch(cleanFilterTerm());

      if (loggedUser?.user && loggedUser.user.role === "admin") {
        const users = {
          firstItem: 0,
          lastItem: 12,
        };

        dispatch(fetchUsers(users));
      }
      const courses = {
        firstItem: 0,
        lastItem: 12,
        filterTerm: undefined,
      };

      dispatch(fetchCourses(courses));
      dispatch(setFilter(""));

      dispatch(setEditUserProfileForm(false));
      dispatch(setEditUserPasswordForm(false));
      dispatch(setCloseAccountForm(false));
      dispatch(setCloseAccountModal(false));

      window.location.pathname !== "/" && navigate("/dashboard");
    }
  };

  return (
    <div className="bg-slate-900 px-4 py-2 border-gray-700 flex flex-col sm:flex-row items-center justify-between">
      <img src={logo} alt="logoimage" className="w-24 h-auto sm:pt-0 pt-4" />

      <div className="container mx-auto flex flex-col sm:flex-row justify-end mt-1 space-y-2 sm:space-y-0 text-center">
        <a className="text-white px-2 sm:px-5 " href="/">
          Home
        </a>
        <a className="px-2 sm:px-5" href="/contact">
          Contact Us
        </a>
        {loggedUser?.user && !signedOutUserStatus?.message ? (
          <>
            <a href="/dashboard" className="text-white px-2 sm:px-5">
              Dashboard
            </a>
          </>
        ) : null}

        {!loggedUser.user && (
          <div className="flex flex-col sm:flex-row justify-end space-x-2 space-y-2 sm:space-y-0 sm:space-x-5 -mt-2">
            <button onClick={login} className="text-white ">
              Log In
            </button>
            <button onClick={signup} className="text-white ">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
