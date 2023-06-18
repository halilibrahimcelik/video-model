import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      Login <button onClick={() => navigate("/video-form")}>Route</button>{" "}
    </div>
  );
};

export default Login;
