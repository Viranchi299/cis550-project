import React, { useState, loadStates, useEffect } from "react";
import "../style/Analyze.css";
import "../style/AnalyzeView.css";
import BestGenreRow from "./BestGenreRow";
import RecommendationRow from "./RecommendationRow";
import "../style/BestGenres.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, makeStyles, withStyles, Typography } from "@material-ui/core";
import PageNavbar from "./PageNavbar";

const Recommendations = (props) => {
  const [selectedState, setSelectedState] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityList, setCitiesList] = useState([]);
  const [results, setResults] = useState([]);
  const [minSalary, setMinSalary] = useState([0]);
  const [maxSalary, setMaxSalary] = useState([1000000000]);

  console.log("rendering analyze view with choice as: " + props.dataset);
  console.log("states list length " + statesList.length);

  useEffect(() => {
    loadStates();
  }, [statesList.length]);

  //added to not require submit button
  //   useEffect(() => {
  //     loadCities();
  //   });

  function loadStates() {
    const dataset = props.dataset;

    const endpoints = {
      Home: "/home/getstateshousing",
      Rent: "/rent/getstatesrent",
      Salary: "/salary/salarystate",
    };
    fetch(`http://localhost:8081/home/getstateshousing`, {
      method: "GET", // The type of HTTP request.
    })
      // fetch(`http://localhost:8081${endpoints[dataset]}`, {
      //   method: "GET", // The type of HTTP request.
      // })
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
        (stateNames) => {
          console.log(stateNames);
          if (!stateNames) return;
          let stateNameDivs = stateNames.map((state, i) => (
            <option value={state.State}>{state.State}</option>
          ));
          setStatesList(stateNameDivs);
          console.log("Set states list!");
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  function loadCities() {
    const dataset = props.dataset;
    const endpoints = {
      Home: "/home/getcitieshousing/",
      Rent: "/rent/getcitiesrent/",
      Salary: "/salary/getcitiessalary/",
    };
    console.log("Calling loadCities with:" + selectedState);
    fetch(`http://localhost:8081/home/getcitieshousing/${selectedState}`, {
      method: "GET", // The type of HTTP request.
    })
      // console.log("Calling loadCities with:" + selectedState);
      // fetch(`http://localhost:8081${endpoints[dataset]}${selectedState}`, {
      //   method: "GET", // The type of HTTP request.
      // })
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
        (cityList) => {
          console.log(cityList);
          if (!cityList) return;
          let cityDivs = cityList.map((city, i) => (
            <option value={city.City}>{city.City}</option>
          ));
          //Set the state of the genres list to the value returned by the HTTP response from the server.
          setCitiesList(cityDivs);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  function loadRentals() {
    return;
  }

  function loadSalaries() {
    return;
  }

  function loadResults() {
    fetch(
      `http://localhost:8081/salary/getEmployerSalary/${selectedState}&${selectedCity}&0&10000000`,
      {
        method: "GET", // The type of HTTP request.
      }
    )
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
        (houses) => {
          if (!houses) return;
          let houseRows = houses.map((house, i) => (
            <RecommendationRow
              Employer={house.Employer}
              Salary={Math.round(house.AvgSalary)}
            />
          ));
          console.log("Houses:");
          console.log(houses);
          //Set the state of the genres list to the value returned by the HTTP response from the server.
          setResults(houseRows);
          console.log(houseRows);
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  // // set state for selected "state name e.g., FL"
  // const handleChangeStateName = (event) => {
  //     setSelectedState(event.target.value);
  // }

  // // set the city for the relevant state, e.g., [Orlando] after FL was selected
  // const handleChangeCityName = (event) => {
  //     setSelectedCity(event.target.value);
  //     console.log(selectedCity);
  // }

  const statesDropDown = (
    <div className="years-container">
      <div className="dropdown-container">
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
          }}
          className="dropdown"
          id="decadesDropdown"
        >
          <option select value>
            {" "}
            -- select a state --{" "}
          </option>
          {statesList}
        </select>
        <button
          className="submit-btn"
          id="decadesSubmitBtn"
          onClick={loadCities}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const cityDropdown = (
    <div className="citiesContainer">
      <div className="dropdown-container">
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
          className="dropdown"
          id="cityDropdown"
        >
          <option select value>
            {" "}
            -- select a city --{" "}
          </option>
          {cityList}
        </select>
        {/* call loadResults using () since function will return a function to assign to onClick */}
        <button
          className="submit-btn"
          id="decadesSubmitBtn"
          onClick={loadResults()}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const EmployersContainer = (props) => {
    return (
      <div className="movies-container">
        <div className="movie">
          <div className="header">
            <strong>Employer</strong>
          </div>
          <div className="header">
            <strong></strong>
          </div>
          <div className="header">
            <strong>{props.col1}</strong>
          </div>
          <div className="header">
            <strong>{props.col2}</strong>
          </div>
          <div className="header">
            <strong>{props.col3}</strong>
          </div>
        </div>
        <div className="movies-container" id="results">
          {results}
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageNavbar active="recommendations" />
      <div className="container bestgenres-container">
        <div className="jumbotron">
          <Button className="category" variant="contained" color="primary">
            {" "}
            Employer Recommendations
          </Button>
          <div className="h5">States</div>
          {statesDropDown}
          <br />
          <br />
          <div className="h5">Cities</div>
          {cityDropdown}
        </div>
        <div className="jumbotron">
          <EmployersContainer col1={"Average Salary"} />
        </div>
      </div>
    </div>
  );
};
export default Recommendations;
