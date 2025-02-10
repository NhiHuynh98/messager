import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Main from "../Main";
import ListFriend from "../ListFriend/ListFriend";

const AuthRequired = () => {
  // const isAuthenticated = !!localStorage.getItem("authToken")
  const isAuthenticated = true


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    // <Main>
    //   <Outlet/>
    // </Main>
    <ListFriend>
      <Outlet/>
    </ListFriend>
  );
};

export default AuthRequired;
