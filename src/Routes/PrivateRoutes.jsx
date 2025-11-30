import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";

import Loader from "../Components/Loader/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
