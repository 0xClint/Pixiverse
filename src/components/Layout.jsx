import React from "react";
import { UserLoginModal } from ".";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <UserLoginModal />
    </>
  );
};

export default Layout;
