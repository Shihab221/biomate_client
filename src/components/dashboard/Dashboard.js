import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  cleanReloginStatus,
  fetchCourses,
  fetchUserData,
  fetchUsers,
  getCloseAccountFormStatus,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  getLoggedUserData,
  getMentorCourses,
  getSelectedFilterTerm,
  getUserToken,
  reLoginUser,
  setUserToken,
  userToken,
} from "../../features/eLearningSlice";
import { Typography, useMediaQuery, Alert, Grid } from "@mui/material";
import CloseAccountForm from "../user/DeleteAccountForm";
import DeleteAccountModal from "../user/DeleteAccountModal";
import EditUserDataButtons from "./DashboardButtons";
import EditProfile from "../user/EditUserProfile";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import EditUserPassword from "../user/EditUserPassword";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const editUserProfile = useSelector(getEditUserFormStatus);
  const editUserPassword = useSelector(getEditUserPasswordFormStatus);
  const closeAccount = useSelector(getCloseAccountFormStatus);
  const filterTerm = useSelector(getSelectedFilterTerm);
  const mentorCourses = useSelector(getMentorCourses);
  const loggedUser = useSelector(getLoggedUserData);
  const token = useSelector(getUserToken);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  return (
    <div className="container">
      <div className="w-full">
        {loggedUser?.user && filterTerm && loggedUser.user.role === "mentor" ? (
          mentorCourses.data.length > 1 ? (
            <Typography variant="h5" className="text-left ml-2">
              There are {mentorCourses.data.length} results for the term{" "}
              <span className="font-bold underline">{filterTerm}</span>
            </Typography>
          ) : (
            <Typography variant="h5" className="text-left ml-2">
              There is {mentorCourses.data.length} result for the term{" "}
              <span className="font-bold underline">{filterTerm}</span>
            </Typography>
          )
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <DashboardLeftPanel />
        </div>
        <EditProfile />
        <div className="col-span-1 md:col-span-2 hidden md:block">
          <DashboardRightPanel />
        </div>
      </div>
      {!editUserProfile && !editUserPassword && !closeAccount ? (
        <div className="hidden md:block col-span-2">
          {!iPadAirScreen && !iPadMiniScreen && !surfaceDuo ? (
            <DashboardRightPanel />
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1 hidden md:block">
            <EditUserDataButtons />
          </div>
          <div className="col-span-1 md:col-span-2">
            {editUserProfile ? <EditProfile /> : null}
            {editUserPassword ? <EditUserPassword /> : null}
            {closeAccount ? <CloseAccountForm /> : null}
          </div>
          <div className="col-span-1 md:col-span-1 hidden md:block">
            {!iPadAirScreen && !iPadMiniScreen && !surfaceDuo ? (
              <EditUserDataButtons />
            ) : null}
          </div>
        </div>
      )}
      <DeleteAccountModal />
    </div>
  );
};

export default Dashboard;
