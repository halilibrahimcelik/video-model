import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import VideoForm from "../pages/VideoForm";
import VideoList from "../pages/VideoList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="video-form" element={<VideoForm />} />
          <Route path="video-list" element={<VideoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
