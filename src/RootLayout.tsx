import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { createTask, getTasks } from "./tasks";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let tasks = await getTasks();
  if (q) {
    tasks = tasks.filter(task => task.title.startsWith(q));
  }
  return { tasks, q };
};

export const action = async () => {
  const task = await createTask();
  const { id } = task;
  return redirect(`/tasks/${id}/edit`);
};

const RootLayout = () => {
  const { tasks, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isLoading = Boolean(navigation.state === "loading");
  const isSearching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <div className="flex h-full min-h-screen w-full">
      <div className="p-4">
        sidebar
        <div className="flex">
          <Form role="search" className="bg-red-900 p-4">
            <input
              type="text"
              placeholder="SEARCHACTIVITIES...."
              name="q"
              defaultValue={q}
              id="q"
              onChange={e => {
                const isfirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isfirstSearch,
                });
              }}
            />
          </Form>
          {isSearching && <p>LOADING RESULTS...</p>}
          <Form method="post">
            <button type="submit">new</button>
          </Form>
        </div>
        <div className="flex flex-col">
          {tasks.map(task => (
            <NavLink
              to={`tasks/${task.id}`}
              key={task.id}
              className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
            >
              {task.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full p-4">{isLoading ? <div>Loading...</div> : <Outlet />}</div>
    </div>
  );
};

export default RootLayout;
