import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { action as createTaskAction } from "./RootLayout";
import AllTasks, { loader as allTasksLoader } from "./routes/AllTasks";
import DoneTasks, { loader as doneTasksLoader } from "./routes/DoneTasks";
import EditTask from "./routes/EditTask";
import NewTask from "./routes/NewTask";
import PendingTasks, { loader as pendingTasksLoader } from "./routes/PendingTasks";

const router = createBrowserRouter([
  {
    path: "/tasks",
    element: <RootLayout />,
    action: createTaskAction,
    children: [
      {
        path: "all",
        element: <AllTasks />,
        loader: allTasksLoader,
      },
      {
        path: "done",
        element: <DoneTasks />,
        loader: doneTasksLoader,
      },
      {
        path: "pending",
        element: <PendingTasks />,
        loader: pendingTasksLoader,
      },
      {
        path: "newtask",
        element: <NewTask />,
      },
      {
        path: ":taskId/edit",
        element: <EditTask />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
