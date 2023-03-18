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
  console.log(formData.get("urgent"));
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
              <td>title</td>
              <td>
                <input type="text" placeholder={title} defaultValue={title} name="title" />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Urgent</td>
              <td>
                <select defaultValue={urgent} name="urgent">
                  <option value="true">urgent</option>
                  <option value="false">not urgent</option>
                </select>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Created:</td>
              <td>
                <input type="date" defaultValue={createdDate} name="createdOn" />
              </td>
            </tr>
            {/* row 4 */}
            <tr>
              <th>4</th>
              <td>Due:</td>
              <td>
                <input type="date" defaultValue={dueDate} name="dueTo" />
              </td>
            </tr>
            {/* row 5 */}
            <tr>
              <th>5</th>
              <td>Last Edit:</td>
              <td>
                <input type="date" defaultValue={editedDate} name="editedOn" />
              </td>
            </tr>
            {/* row 6 */}
            <tr>
              <th>6</th>
              <td>Status:</td>
              <td>
                <select placeholder="status" defaultValue={status} name="status">
                  <option value="pending">pending</option>
                  <option value="done">done</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>actions</th>
              <td>
                <button
                  className="btn-warning btn"
                  type="button"
                  onClick={e => {
                    navigate(-1);
                  }}
                >
                  cancel
                </button>
              </td>
              <td>
                <button type="submit" className="btn-info btn">
                  save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Form>
  );
};

export default Edit;
