import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RootLayout, { loader as rootLoader, action as rootAction } from "./RootLayout";
import Delete, { action as deleteAction } from "./routes/Delete";
import Edit, { loader as editLoader, action as editAction } from "./routes/Edit";
import IndexView from "./routes/IndexView";
import Task, { loader as taskLoader, action as taskAction } from "./routes/Task";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <IndexView />,
          },
          {
            path: "tasks/:taskId",
            element: <Task />,
            loader: taskLoader,
            action: taskAction,
          },
          {
            path: "tasks/:taskId/edit",
            element: <Edit />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "tasks/:taskId/delete",
            action: deleteAction,
            element: <Delete />,
            errorElement: <div>error white deleting, try again.</div>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
