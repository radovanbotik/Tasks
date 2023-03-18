import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../tasks";
import moment from "moment";

export const loader = async ({ params }) => {
  const task = await getTask(params.taskId);
  return { task };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateTask(updates, params.taskId);
  return redirect(`/tasks/${params.taskId}`);
};

const Edit = () => {
  const navigate = useNavigate();
  const { task } = useLoaderData();
  const { title, urgent, createdOn, editedOn, dueTo, status } = task;

  const formatDate = date => {
    return moment(date).format("YYYY-MM-D");
  };

  const createdDate = formatDate(createdOn);
  const editedDate = formatDate(editedOn);
  const dueDate = formatDate(dueTo);

  return (
    <Form method="post">
      <input type="text" placeholder={title} defaultValue={title} name="title" />
      <label htmlFor="">
        urgent:
        <input type="checkbox" defaultChecked={urgent} name="urgent" />
      </label>
      <label htmlFor="">
        created on
        <input type="date" defaultValue={createdDate} name="createdOn" />
      </label>
      <label htmlFor="">
        edited on
        <input type="date" defaultValue={editedDate} name="editedOn" />
      </label>
      <label htmlFor="">
        due to
        <input type="date" defaultValue={dueDate} name="dueTo" />
      </label>
      <select placeholder="status" defaultValue={status} name="status">
        <option value="pending">pending</option>
        <option value="done">done</option>
      </select>

      <button type="submit">save</button>
      <button
        type="button"
        onClick={e => {
          navigate(-1);
        }}
      >
        cancel
      </button>
    </Form>
  );
};

export default Edit;
