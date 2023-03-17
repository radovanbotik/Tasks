import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getTasks } from "../tasks";
import Task from "../components/Task";

const status = "done";

export const loader = async () => {
  const tasks = await getTasks();
  const doneTasks = tasks.filter(taskObj => taskObj.status === status);
  return { doneTasks };
};

const DoneTasks = () => {
  const { doneTasks } = useLoaderData();

  return (
    <div>
      {doneTasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default DoneTasks;
