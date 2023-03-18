import axios from "axios";

const URL = "https://64142c6e7d342ac7c4e4e933.mockapi.io/task";

type Task = {
  DueTo: Date;
  EditedOn: Date;
  CreatedOn: Date;
  id: string;
  name: string;
  urgent: boolean;
};

const getTasks = async () => {
  const resp = await axios({
    method: "get",
    url: URL,
  });
  const tasks: Task[] = resp.data;
  return tasks;
};

const getTask = async taskId => {
  const resp = await axios({
    method: "get",
    url: `${URL}/${taskId}`,
  });
  const task = resp.data;
  return task;
};

const createTask = async () => {
  let id = Math.random().toString(36).substring(2, 9);
  let task = {
    id,
    createdOn: Date.now(),
    editedOn: Date.now(),
    dueTo: Date.now(),
    status: "pending",
    title: "new task",
  };
  const resp = await axios({
    method: "post",
    url: URL,
    data: task,
  });
  const newTask = resp.data;
  return newTask;
};

const updateTask = async (updates, taskId) => {
  const resp = await axios({
    method: "put",
    url: `${URL}/${taskId}`,
    data: updates,
  });
  const updatedTask = resp.data;
  return updatedTask;
};

const deleteTask = async taskId => {
  const resp = await axios({
    method: "delete",
    url: `${URL}/${taskId}`,
  });
  const deletedTask = resp.data;
  return deletedTask;
};

export { getTask, getTasks, createTask, updateTask, deleteTask };
