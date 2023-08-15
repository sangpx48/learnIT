import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "../../App.css";

import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
