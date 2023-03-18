import React from "react";
import { redirect } from "react-router-dom";
import { deleteTask } from "../tasks";

export const action = async ({ params }) => {
  //   throw new Error("error while deleting");
  await deleteTask(params.taskId);
  return redirect("/");
};

const Delete = () => {
  return <div></div>;
};

export default Delete;
