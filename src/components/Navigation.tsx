import React from "react";
import { Link, Form } from "react-router-dom";
import Button from "./Button";

const Navigation = () => {
  return (
    <div className="navbar justify-between bg-base-100">
      <Link to="/tasks" className="btn-ghost btn text-xl normal-case">
        Tasks
      </Link>

      <Form method="post">
        <button className="btn" type="submit">
          create new task
        </button>
      </Form>
    </div>
  );
};

export default Navigation;
