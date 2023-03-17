import React from "react";
import TaskTitle from "./TaskTitle";
import UrgentFlag from "./UrgentFlag";
import CreatedOn from "./CreatedOn";
import EditedOn from "./EditedOn";
import DueTo from "./DueTo";
import Options from "./Options";
import Button from "./Button";
import Checkbox from "./Checkbox";

const Task = ({ title, urgent, dueTo, editedOn, createdOn }) => {
  return (
    <div className="flex h-20 items-center justify-evenly gap-8">
      <Checkbox />
      <TaskTitle title={title} />
      <UrgentFlag urgent={urgent} />
      <CreatedOn createdOn={createdOn} />
      <EditedOn editedOn={editedOn} />
      <DueTo dueTo={dueTo} />
      <Button>Edit</Button>
      <Button>Delete</Button>
      <Options />
    </div>
  );
};

export default Task;
