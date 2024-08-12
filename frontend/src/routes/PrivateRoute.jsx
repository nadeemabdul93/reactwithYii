import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const PrivateRoute = () => {
  const location = useLocation();
  const authToken = sessionStorage.getItem('token');
  return (
    <>
      {authToken ? (
        <Outlet />
      ) : (
        <Navigate to="/site" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
