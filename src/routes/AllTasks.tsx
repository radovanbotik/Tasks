import React from "react";
import { useLoaderData, useNavigation, Outlet } from "react-router-dom";
import Task from "../components/Task";
import { getTasks } from "../tasks";

type Task = {
  DueTo: Date;
  EditedOn: Date;
  CreatedOn: Date;
  id: string;
  name: string;
  urgent: boolean;
};

export const loader = async () => {
  const tasks = await getTasks();
  return { tasks };
};

const AllTasks = () => {
  const { tasks } = useLoaderData();

  return (
    <div>
      {tasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default AllTasks;
