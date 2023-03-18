import React from "react";
import { useLoaderData, Link, Form, useFetcher } from "react-router-dom";
import { getTask, updateTask } from "../tasks";

export const loader = async ({ params }) => {
  const task = await getTask(params.taskId);
  console.log(task);
  return { task };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  //convert to boolean
  const urgentUpdate = { urgent: formData.get("urgent") === "true" ? true : false };
  return updateTask(urgentUpdate, params.taskId);
};

const Task = () => {
  const { task } = useLoaderData();
  const { id, title, urgent, createdOn, editedOn, dueTo, status } = task;
  console.log(urgent);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>data</th>
            <th>info</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Task</td>
            <td>{title}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Urgent</td>
            <td>
              {/* <Urgent task={task} /> */}
              {urgent === "true" ? "yes" : "no"}
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Created:</td>
            <td>{createdOn}</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>4</th>
            <td>Due:</td>
            <td>{dueTo}</td>
          </tr>
          {/* row 5 */}
          <tr>
            <th>5</th>
            <td>Last Edit:</td>
            <td>{editedOn}</td>
          </tr>
          {/* row 6 */}
          <tr>
            <th>6</th>
            <td>Status:</td>
            <td>{status}</td>
          </tr>
          <tr>
            <th>actions</th>
            <td>
              <Form
                method="post"
                action="delete"
                onSubmit={e => {
                  //press cancel === prevent default === do nothing
                  //press ok === destroy
                  if (!confirm("please confirm you want to delete this task.")) {
                    e.preventDefault();
                  }
                }}
              >
                <button type="submit" className="btn-warning btn">
                  delete task
                </button>
              </Form>
            </td>
            <td>
              <Link to="edit" className="btn-info btn">
                edit
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function Urgent({ task }) {
  const fetcher = useFetcher();
  let urgent = task.urgent;
  if (fetcher.formData) {
    urgent = fetcher.formData.get("urgent") === "true" ? true : false;
  }

  return (
    <fetcher.Form method="post">
      <button
        name="urgent"
        value={urgent ? "false" : "true"}
        aria-label={urgent ? "flag as not urgent" : "flag as urgent"}
      >
        {urgent === "true" ? "urgent" : "not urgent"}
      </button>
    </fetcher.Form>
  );
}

export default Task;
