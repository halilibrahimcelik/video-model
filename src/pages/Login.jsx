import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/register/SignUp";
import SignIn from "../components/register/SignIn";
const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <SignUp />
    </>
  );
};

export default Login;
