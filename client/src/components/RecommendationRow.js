import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Recommendations.css";
import { Button } from "react-bootstrap";

const RecommendationRow = (props) => {
  let urlSearch = props.Employer.replace(/ /g, "+");
  urlSearch = "https://duckduckgo.com/?q=!ducky+" + urlSearch + "+careers";
  console.log("search is:");
  console.log(urlSearch);

  return (
    <div className="movieResults" id="testing">
      {/* use default class names from css styling to get them to align for now, will update! */}
      <div className="genre">
        <Button href={urlSearch}>{props.Employer}</Button>
      </div>
      <div className="rating">${props.Salary}</div>
    </div>
  );
};
export default RecommendationRow;

//   <div className="genre">{props.Employer}</div>
//   <div className="rating">${props.Salary}</div>
{
  /* <Button href="http://www.imdb.com">Link</Button>{" "} */
}
