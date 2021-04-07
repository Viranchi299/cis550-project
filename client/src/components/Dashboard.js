import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import DashboardStateRow from './DashboardStateRow';

// library to convert state abbreviations, e.g. AL to Alabama. 
const allStates = require('us-state-converter');


const Dashboard = () => {
  const [stateRows, setStateRows] = useState([]);
  // custom hook, we only need useEffect to run this function once similar to componentDidMount
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(getAllStatesData);

  function getAllStatesData() {
    fetch("http://localhost:8081/home/homevaluestate",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then((stateList) => {
        console.log(stateList);
        if (!stateList) return;
        let states = stateList.map((state, i) =>
          <DashboardStateRow state={allStates.fullName(state.State)} minHVP={state.MinHVP.toLocaleString(undefined)} 
          MaxHVP={state.MaxHVP.toLocaleString(undefined)}
          AvgHVP={state.AvgHVP.toLocaleString(undefined)} />
        );
        setStateRows(states);
      }, (err) => {
        // Print the error if there is one.
        console.log(err);
      });
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
          <tbody>
          {stateRows}
          </tbody>
    </table>);

  return (
    <div className="Dashboard">
      <PageNavbar active="dashboard" />
      <br></br>
      <div className="jumbotron">
        {stateTableData}
      </div>
    </div>
  );
}

export default Dashboard;