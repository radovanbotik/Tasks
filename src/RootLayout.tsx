import React, { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navigation from "./components/Navigation";
import TaskNavigation from "./components/TaskNavigation";
import { getTasks, createTask } from "./tasks";
import Loader from "./components/Loader";

const loader = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export const action = async () => {
  const newTask = await createTask();
  return { newTask };
};

const RootLayout = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Navigation />
      <TaskNavigation />
      {loading ? <Loader /> : <Outlet />}
    </div>
  );
};

export default RootLayout;
