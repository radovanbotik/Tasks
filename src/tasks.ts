import axios from "axios";

const URL = "https://64142c6e7d342ac7c4e4e933.mockapi.io/task";

type Task = {
  dueTo: Date;
  editedOn: Date;
  createdOn: Date;
  id: string;
  title: string;
  urgent: string;
  status: string;
};

type GetTasksResponse = {
  data: Task[];
};

const getTasks = async () => {
  const { data, status } = await axios<GetTasksResponse>({
    method: "get",
    url: URL,
  });
  return data;
};

const getTask = async ({ id }: { id: string }): Promise<Task> => {
  const { data } = await axios<Task>({
    method: "get",
    url: `${URL}/${id}`,
  });
  return data;
};

const createTask = async (): Promise<Task> => {
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
  return resp.data;
};

const updateTask = async ({ task, id }: { task: Pick<Task, "urgent"> | Task; id: string }) => {
  const { data } = await axios<Task>({
    method: "put",
    url: `${URL}/${id}`,
    data: task,
  });
  return data;
};

const deleteTask = async (taskId: string): Promise<void> => {
  await axios({
    method: "delete",
    url: `${URL}/${taskId}`,
  });
};

export { getTask, getTasks, createTask, updateTask, deleteTask };
