import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SalaryRow = (props) => {
  return (
    <div className="movieResults">
      {/* use default class names from css styling to get them to align for now, will update! */}
      <div className="genre">{props.State}</div>
      <div className="rating">{props.MinSalary}</div>
      <div className="rating">{props.MaxSalary}</div>
      <div className="rating">{props.AvgSalary}</div>
    </div>
  );
};
export default SalaryRow;
