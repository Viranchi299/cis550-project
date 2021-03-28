import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

const Dashboard = (props) => {
  const [stateDivs, setStateDivs] = useState(true);
  // custom hook, we only need useEffect to run this function once similar to componentDidMount
  const useMountEffect = (func) => useEffect(func, []);

  function getStates() {
    fetch("http://localhost:8081/homerent/homevaluestate",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(stateList => {
        console.log(stateList);
        if (!stateList) return;
        let states = stateList.map((state, i) =>
          <div><DashboardMovieRow state={state.State} minHVP={state.MinHVP} MaxHVP={state.MaxHVP} /> </div>
        );
        setStateDivs(states);
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  useMountEffect(getStates);

  const StateContainer = () => {
    return (
      <div className="jumbotron">
          <div className="movies-container">
            <div className="movies-header">
              <div className="header"><strong>State Name</strong></div>
              <div className="header"><strong>Min_HVP</strong></div>
              <div className="header"><strong>Max HVP</strong></div>
            </div>
            <div className="results-container" id="results">
              {stateDivs}
            </div>
          </div>
        </div>
    )
  }


  return (
    <div className="Dashboard">
      <PageNavbar active="dashboard" />
        <br></br>
        <StateContainer/>
      </div>
  );
}

export default Dashboard;