import React, { useEffect, useState } from "react";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, makeStyles, withStyles, Typography } from "@material-ui/core";
import { Gradient } from "react-gradient";
import PageNavbar from "./PageNavbar";
import DashboardStateRow from "./DashboardStateRow";

import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

// library to convert state abbreviations, e.g. AL to Alabama.
const allStates = require("us-state-converter");

const Dashboard = () => {
  const [stateRows, setStateRows] = useState([]);

  const [statesQueryRes, setStatesQueryRes] = useState([]);

  const [content, setContent] = useState("");

  const [minVal, setMin] = useState("");
  const [maxVal, setMax] = useState("");

  // custom hook, we only need useEffect to run this function once similar to componentDidMount
  const useMountEffect = (func) => useEffect(func, []);

  let choice = "salary"; //test

  //useMountEffect(getAllStatesHousePriceIndexData);
  //useMountEffect(getAllStatesSalaryData);

  //"http://localhost:8081/home/homevaluestate"

  function getAllStatesHousePriceData() {
    console.log("Hoice");
    console.log(choice);
    fetch("http://localhost:8081/home/homevaluestate", {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (stateList) => {
          console.log("StateList: ");
          console.log(stateList);
          if (!stateList) return;
          // map array of objects to object of objects so we can index by state initial e.g., "AL"...
          const newObj = Object.assign(
            {},
            ...stateList.map((item) => ({
              [item.State]: {
                Min: item.MinHVP,
                Max: item.MaxHVP,
                Avg: item.AvgHVP,
              },
            }))
          );
          setStatesQueryRes(newObj);

          console.log("New obj:");
          console.log(newObj);
          let minAvg = 1000000000; //to-do: set to math.max
          let maxAvg = -1000000000; //to-do: set to math.min

          for (const [key, value] of Object.entries(newObj)) {
            console.log(value.Avg);
            if (value.Avg != null) {
              minAvg = value.Avg < minAvg ? value.Avg : minAvg;
              maxAvg = value.Avg > maxAvg ? value.Avg : maxAvg;
            }
          }

          setMin(Math.floor(minAvg));
          setMax(Math.ceil(maxAvg));
          console.log("Min------------");
          console.log(minAvg);
          console.log("Max-----------");
          console.log(maxAvg);

          let states = stateList.map((state, i) => (
            <DashboardStateRow
              state={
                state.State === "OR"
                  ? "Oregon"
                  : allStates.fullName(state.State)
              }
              minHVP={state.MinHVP.toLocaleString(undefined)}
              MaxHVP={state.MaxHVP.toLocaleString(undefined)}
              AvgHVP={state.AvgHVP.toLocaleString(undefined)}
            />
          ));
          setStateRows(states);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  function getAllStatesRentalData() {
    console.log("Hoice");
    console.log(choice);
    fetch("http://localhost:8081/rent/rentpricestate", {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (stateList) => {
          console.log("StateList: ");
          console.log(stateList);
          if (!stateList) return;
          // map array of objects to object of objects so we can index by state initial e.g., "AL"...
          const newObj = Object.assign(
            {},
            ...stateList.map((item) => ({
              [item.State]: {
                Min: item.MinRent,
                Max: item.MaxRent,
                Avg: item.AvgRent,
              },
            }))
          );
          setStatesQueryRes(newObj);

          console.log("New obj:");
          console.log(newObj);
          let minAvg = 1000000000; //to-do: set to math.max
          let maxAvg = -1000000000; //to-do: set to math.min

          for (const [key, value] of Object.entries(newObj)) {
            console.log(value.Avg);
            if (value.Avg != null) {
              minAvg = value.Avg < minAvg ? value.Avg : minAvg;
              maxAvg = value.Avg > maxAvg ? value.Avg : maxAvg;
            }
          }

          setMin(Math.floor(minAvg));
          setMax(Math.ceil(maxAvg));
          console.log("Min------------");
          console.log(minAvg);
          console.log("Max-----------");
          console.log(maxAvg);

          let states = stateList.map((state, i) => (
            <DashboardStateRow
              state={
                state.State === "OR"
                  ? "Oregon"
                  : allStates.fullName(state.State)
              }
              minHVP={state.MinRent.toLocaleString(undefined)}
              MaxHVP={state.MaxRent.toLocaleString(undefined)}
              AvgHVP={state.AvgRent.toLocaleString(undefined)}
            />
          ));
          setStateRows(states);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  function getAllStatesSalaryData() {
    fetch("http://localhost:8081/salary/salarystate", {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (stateList) => {
          console.log("Salary List: ");
          console.log(stateList);
          if (!stateList) return;
          // map array of objects to object of objects so we can index by state initial e.g., "AL"...
          const newObj = Object.assign(
            {},
            ...stateList.map((item) => ({
              [item.State]: {
                Min: item.MinSalary,
                Max: item.MaxSalary,
                Avg: item.AvgSalary,
              },
            }))
          );
          setStatesQueryRes(newObj);

          console.log("New obj:");
          console.log(newObj);
          let minAvg = 1000000000; //to-do: set to math.max
          let maxAvg = -1000000000; //to-do: set to math.min

          for (const [key, value] of Object.entries(newObj)) {
            console.log(value.Avg);
            if (value.Avg != null) {
              minAvg = value.Avg < minAvg ? value.Avg : minAvg;
              maxAvg = value.Avg > maxAvg ? value.Avg : maxAvg;
            }
          }

          setMin(Math.floor(minAvg));
          setMax(Math.ceil(maxAvg));
          console.log("Min------------");
          console.log(minAvg);
          console.log("Max-----------");
          console.log(maxAvg);

          let states = stateList.map((state, i) => (
            <DashboardStateRow
              state={
                state.State === "OR"
                  ? "Oregon"
                  : allStates.fullName(state.State)
              }
              minSalary={state.MinSalary.toLocaleString(undefined)}
              MaxSalary={state.MaxSalary.toLocaleString(undefined)}
              AvgSalary={state.AvgSalary.toLocaleString(undefined)}
            />
          ));
          setStateRows(states);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  function getAllStatesHousePriceIndexData() {
    console.log("Hoice");
    console.log(choice);
    fetch("http://localhost:8081/homerentsalary/homesalary", {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (stateList) => {
          console.log("StateList: ");
          console.log(stateList);
          if (!stateList) return;
          // map array of objects to object of objects so we can index by state initial e.g., "AL"...
          const newObj = Object.assign(
            {},
            ...stateList.map((item) => ({
              [item.State]: {
                Min: item.AvgAnnualSalary,
                Max: item.AvgHomePrice,
                Avg: item.YearsToBuyHome,
              },
            }))
          );
          console.log("New obj");
          console.log(newObj);
          setStatesQueryRes(newObj);

          console.log("New obj:");
          console.log(newObj);
          let minAvg = 1000000000; //to-do: set to math.max
          let maxAvg = -1000000000; //to-do: set to math.min

          for (const [key, value] of Object.entries(newObj)) {
            console.log(value.Avg);
            if (value.Avg != null) {
              minAvg = value.Avg < minAvg ? value.Avg : minAvg;
              maxAvg = value.Avg > maxAvg ? value.Avg : maxAvg;
            }
          }

          setMin(Math.floor(minAvg));
          setMax(Math.ceil(maxAvg));
          console.log("Min------------");
          console.log(minAvg);
          console.log("Max-----------");
          console.log(maxAvg);

          let states = stateList.map((state, i) => (
            <DashboardStateRow
              state={
                state.State === "OR"
                  ? "Oregon"
                  : allStates.fullName(state.State)
              }
              //added ternary operators to avoid errors with null data
              minHVP={
                state.AvgAnnualSalary
                  ? state.AvgAnnualSalary.toLocaleString(undefined)
                  : ""
              }
              MaxHVP={
                state.AvgHomePrice
                  ? state.AvgHomePrice.toLocaleString(undefined)
                  : ""
              }
              AvgHVP={
                state.YearsToBuyHome
                  ? state.YearsToBuyHome.toLocaleString(undefined)
                  : ""
              }
            />
          ));
          setStateRows(states);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  const stateTableData = (
    <table className="table table-hover table-striped">
      <thead className="table-dark">
        <tr>
          <th scope="col">State Name</th>
          <th scope="col">Minimum Home Value Price</th>
          <th scope="col">Max Home Value Price</th>
          <th scope="col">Average Home Value Price</th>
        </tr>
      </thead>
      <tbody>{stateRows}</tbody>
    </table>
  );

  return (
    <div className="Dashboard">
      <PageNavbar active="dashboard" />
      <br></br>
      {/* <div className="jumbotron"> */}
      {/* {stateTableData} */}
      {/* </div> */}
      <div>
        <div>
          <Button
            className="choice"
            variant="contained"
            onClick={() => getAllStatesHousePriceData()}
          >
            Home Values
          </Button>
          <Button
            className="choice"
            variant="contained"
            onClick={() => getAllStatesRentalData()}
          >
            Rental Values
          </Button>
          <Button
            className="choice"
            variant="contained"
            onClick={() => getAllStatesSalaryData()}
          >
            Salaries
          </Button>
          <Button
            className="choice"
            variant="contained"
            onClick={() => getAllStatesHousePriceIndexData()}
          >
            House Price Index
          </Button>
        </div>
        <br></br>
        <br></br>

        {/* <div
          style={{
            marginLeft: "10px",
            float: "left",
          }}
        >
          <h5>Mean Salaries</h5>
        </div> */}

        <div>
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#ffedea",
              marginLeft: "100px",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#ffcec5",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#ffad9f",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#ff8a75",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#ff5533",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#e2492d",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#be3d26",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#9a311f",
            }}
          />
          <div
            style={{
              width: "30px",
              height: "20px",
              float: "left",
              backgroundColor: "#782618",
            }}
          />
        </div>
        <br></br>
        <div
          style={{
            marginLeft: "100px",
            float: "left",
          }}
        >
          {minVal}
        </div>
        <div
          style={{
            marginRight: "1550px",
            float: "right",
          }}
        >
          {maxVal}
        </div>

        <div>
          <MapChart
            setTooltipContent={setContent}
            statesQueryRes={statesQueryRes}
          />
          <ReactTooltip html={true}> {content} </ReactTooltip>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
