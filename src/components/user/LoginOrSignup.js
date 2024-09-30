import { useSelector } from "react-redux";
import {
  getSigninUserFormStatus,
  getSignupUserFormStatus,
} from "../../features/eLearningSlice";
import { Grid, Card, CardMedia } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import Home from "../Home";

const LoginOrSignup = () => {
  const displayLoginForm = useSelector(getSigninUserFormStatus);
  const displaySignupForm = useSelector(getSignupUserFormStatus);

  return (
    <Grid container justifyContent={"center"}>
      {!displayLoginForm && !displaySignupForm ? <Home /> : null}

      {displayLoginForm ? <Login /> : null}
      {displaySignupForm ? <Signup /> : null}
    </Grid>
  );
};

export default LoginOrSignup;
