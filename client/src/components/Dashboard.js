import React, { useEffect, useState } from "react";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, makeStyles, withStyles, Typography } from "@material-ui/core";
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

  // custom hook, we only need useEffect to run this function once similar to componentDidMount
  const useMountEffect = (func) => useEffect(func, []);

  let choice = "salary"; //test

  useMountEffect(getAllStatesHousePriceData);
  useMountEffect(getAllStatesSalaryData);

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
      </div>

      <div>
        <MapChart
          setTooltipContent={setContent}
          statesQueryRes={statesQueryRes}
        />
        <ReactTooltip html={true}> {content} </ReactTooltip>
      </div>
    </div>
  );
};

export default Dashboard;
