import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectUser, selectUserId } from "../app/auth/authSlicer";

const ProtectedRoute = () => {
  const isAuthenticated =
    useSelector(selectUserId) || JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
