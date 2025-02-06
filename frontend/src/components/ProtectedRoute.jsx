import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import your context

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Destructure currentUser from the context

  if (!currentUser) {
    return <Navigate to="/login" />; // If no user is logged in, redirect to login
  }

  return children; // If user exists, render the children (protected route)
};

export default ProtectedRoute;
