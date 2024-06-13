import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken } from "../store/authSlice";

const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector(selectToken);

  return token ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
