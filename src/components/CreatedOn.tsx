import React from "react";
import moment from "moment";

const CreatedOn = ({ createdOn }) => {
  const creationDate = moment(createdOn).format("Do MMMM");
  return <div>created: {creationDate}</div>;
};

export default CreatedOn;
