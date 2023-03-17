import React, { useState } from "react";
import Button from "./Button";
import NavLink from "./NavLink";

const TaskNavigation = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="btn-group">
        <NavLink path="all">All</NavLink>
        <NavLink path="done">Done</NavLink>
        <NavLink path="pending">Pending</NavLink>
      </div>
    </div>
  );
};

export default TaskNavigation;
