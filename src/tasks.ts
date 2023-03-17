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

const createTask = async () => {
  let id = Math.random().toString(36).substring(2, 9);
  let task = { id, createdOn: Date.now() };
  const resp = await axios({
    method: "post",
    url: URL,
    data: task,
  });
  const newTask = resp.data;
  return newTask;
};

export { getTasks, createTask };
