import React from "react";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import Loader from "../Components/Loader/Loader";
import Forbidden from "../Components/Forbidden/forbidden";

const AdminRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (role != "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoutes;
