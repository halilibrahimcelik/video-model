import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../app/auth/authSlicer";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectLoggedIn);

  const isAuthenticated =
    JSON.parse(localStorage.getItem("isLoggedIn")) || isLoggedIn;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
