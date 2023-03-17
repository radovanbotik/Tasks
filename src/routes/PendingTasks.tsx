import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getTasks } from "../tasks";
import Task from "../components/Task";

const status = "pending";

export const loader = async () => {
  const tasks = await getTasks();
  const pendingTasks = tasks.filter(taskObj => taskObj.status === status);
  return { pendingTasks };
};

const PendingTasks = () => {
  const { pendingTasks } = useLoaderData();

  return (
    <div>
      {pendingTasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default PendingTasks;
