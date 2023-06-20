import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../app/auth/authSlicer";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectUser);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
