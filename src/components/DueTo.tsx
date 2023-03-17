import React from "react";
import moment from "moment";

const DueTo = ({ dueTo }) => {
  const dueToDate = moment(dueTo).format("Do MMMM");

  return <div>due to:{dueToDate}</div>;
};

export default DueTo;
