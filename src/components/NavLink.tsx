import React from "react";
import { NavLink as Link } from "react-router-dom";

const NavLink = ({ path, children }) => {
  return (
    <Link className="btn" to={path}>
      {children}
    </Link>
  );
};

export default NavLink;
