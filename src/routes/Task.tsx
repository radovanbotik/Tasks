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
  return (
    <div>
      <h2>task: {task.title}</h2>
      {/* <h2>urgent: {task.urgent}</h2> */}
      <h2>createdOn: {task.createdOn}</h2>
      <h2>editedOn: {task.editedOn}</h2>
      <h2>dueTo: {task.dueTo}</h2>
      <h2>status: {task.status}</h2>
      <Favorite task={task} />
      <Link to="edit">edit</Link>
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
        <button type="submit">delete task</button>
      </Form>
    </div>
  );
};

function Favorite({ task }) {
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
        {urgent ? "urgent" : "not urgent"}
      </button>
    </fetcher.Form>
  );
}

export default Task;
