import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectUser, selectUserId } from "../app/auth/authSlicer";

const ProtectedRoute = () => {
  const userID = useSelector(selectUserId);

  const isAuthenticated =
    JSON.parse(localStorage.getItem("isLoggedIn")) || userID;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
