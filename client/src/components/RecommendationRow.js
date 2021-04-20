import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RecommendationRow = (props) => {
  return (
    <div className="movieResults">
      {/* use default class names from css styling to get them to align for now, will update! */}
      <div className="genre">{props.Employer}</div>
      <div className="rating">${props.Salary}</div>
    </div>
  );
};
export default RecommendationRow;
