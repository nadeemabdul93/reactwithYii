import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <div style={{width:"100%"}}>
        <Outlet />{" "}
      </div>
      <div> Footer</div>
    </div>
  );
};

export default PublicLayout;
