import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token found:", token);

  // if token not found -> This will redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // otherwise allow we will allow access to the user
  return children;
};

export default ProtectedRoute;
