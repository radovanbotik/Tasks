import React from "react";
import Task from "../components/Task";
import { createTask } from "../tasks";

const NewTask = () => {
  const currentDate = new Date();

  const dummy = {
    title: "newjob",
    urgent: false,
    dueTo: currentDate,
    editedOn: currentDate,
    createdOn: currentDate,
  };

  return (
    <div>
      <Task {...dummy} />
    </div>
  );
};

export default NewTask;
