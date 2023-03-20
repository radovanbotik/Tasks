import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { createTask, getTasks } from "./tasks";

export const loader = async ({ request }: any) => {
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
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4 text-base-content">
          {/* SEARCH BAR */}
          <li>
            <Form role="search" className="appereance-none">
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="SEARCHACTIVITIES...."
                    name="q"
                    defaultValue={q}
                    id="q"
                    className="input w-full max-w-xs"
                    onChange={e => {
                      const isfirstSearch = q == null;
                      submit(e.currentTarget.form, {
                        replace: !isfirstSearch,
                      });
                    }}
                  />

                  {isSearching ? (
                    <button className="loading btn-square btn"></button>
                  ) : (
                    <button className="btn-square btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </Form>
          </li>
          {/* ADD NEW */}
          <li>
            <Form method="post">
              <button type="submit" className="btn-wide btn">
                new
              </button>
            </Form>
          </li>
          {/* LINKS */}
          <div className="btn-group btn-group-vertical gap-2">
            {tasks.map(task => (
              <li key={task.id}>
                <NavLink
                  to={`tasks/${task.id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "btn-accent btn" : isPending ? "btn-ghost btn" : "btn-primary btn"
                  }
                >
                  {task.title}
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
      </div>
      {/* PAGE CONTENT */}
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        {isLoading ? <button className="loading btn-square btn"></button> : <Outlet />}
        <label htmlFor="my-drawer-2" className="btn-primary drawer-button btn lg:hidden">
          Open drawer
        </label>
      </div>
    </div>
  );
};

export default RootLayout;
