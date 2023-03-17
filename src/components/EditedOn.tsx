import React from "react";
import moment from "moment";

const EditedOn = ({ editedOn }) => {
  const editDate = moment(editedOn).format("Do MMMM");

  return <div>edited: {editDate}</div>;
};

export default EditedOn;
