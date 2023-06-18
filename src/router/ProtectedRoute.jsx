import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../app/auth/authSlicer";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectUser);
  console.log(isAuthenticated, "22");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
