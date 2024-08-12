import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const PublicRoute = () => {
  const location = useLocation();
  const authToken = sessionStorage.getItem('token');
  console.log("PublicRoute");
  return (
    <>
      {authToken ? (
        <Navigate to="/site/dashboard" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
