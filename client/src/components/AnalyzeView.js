import React, { useState, loadStates, useEffect } from "react";
import "../style/Analyze.css";
import "../style/AnalyzeView.css";
import BestGenreRow from "./BestGenreRow";
import SalaryRow from "./SalaryRow";
import "../style/BestGenres.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, makeStyles, withStyles, Typography } from "@material-ui/core";

const AnalyzeView = (props) => {
  console.log("props:");
  console.log(props);

  const [selectedState, setSelectedState] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityList, setCitiesList] = useState([]);
  const [results, setResults] = useState([]);

  console.log("rendering analyze view with choice as: " + props.dataset);
  console.log("states list length " + statesList.length);

  useEffect(() => {
    loadStates();
  }, [statesList.length]);

  function loadStates() {
    const dataset = props.dataset;
    const endpoints = {
      Home: "/home/getstateshousing",
      Rent: "/rent/getstatesrent",
      Salary: "/salary/salarystate",
    };
    fetch(`http://localhost:8081${endpoints[dataset]}`, {
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
        (stateNames) => {
          console.log(stateNames);
          if (!stateNames) return;
          let stateNameDivs = stateNames.map((state, i) => (
            <option value={state.State}>{state.State}</option>
          ));
          setStatesList(stateNameDivs);
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
    fetch(`http://localhost:8081${endpoints[dataset]}${selectedState}`, {
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

  function loadResults() {
    return props.dataset === "Home"
      ? loadHomes
      : props.dataset === "Rent"
      ? loadRentals
      : loadSalaries;
  }

  function loadRentals() {
    return;
  }

  function loadSalaries() {
    {
      fetch(`http://localhost:8081/salary/salarystate`, {
        method: "GET", // The type of HTTP request.
      })
        // fetch(
        //   `http://localhost:8081/salary/getEmployerSalary/CA&Sunnyvale&0&10000000`,
        //   {
        //     method: "GET", // The type of HTTP request.
        //   }
        // )
        .then(
          (res) => {
            // Convert the response data to a JSON.
            console.log("RESPONSE");
            console.log(res);
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
              <SalaryRow
                State={house.State}
                MinSalary={house.MinSalary}
                MaxSalary={house.MaxSalary}
                AvgSalary={house.AvgSalary}
              />
            ));
            console.log("Houses");
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
  }

  function loadHomes() {
    fetch(`http://localhost:8081/home/${selectedState}&${selectedCity}`, {
      method: "GET", // The type of HTTP request.
    })
      // fetch(
      //   `http://localhost:8081/salary/getEmployerSalary/CA&Sunnyvale&0&10000000`,
      //   {
      //     method: "GET", // The type of HTTP request.
      //   }
      // )
      .then(
        (res) => {
          // Convert the response data to a JSON.
          console.log("RESPONSE");
          console.log(res);
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
            <BestGenreRow
              City={house.City}
              State={house.State}
              MinHVP={house.MinHVP}
              MaxHVP={house.MaxHVP}
              AvgHVP={house.AvgHVP}
            />
          ));
          console.log("Houses");
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

  function loadRentals() {
    fetch(`http://localhost:8081/rent/${selectedState}&${selectedCity}`, {
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
        (rentals) => {
          if (!rentals) return;
          let houseRows = rentals.map((house, i) => (
            <BestGenreRow
              City={house.City}
              State={house.State}
              MinHVP={house.MinRent}
              MaxHVP={house.MaxRent}
              AvgHVP={house.AvgRent}
            />
          ));
          console.log("RENTALS");
          console.log(rentals);
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
          type="button"
          class="btn btn-outline-primary"
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
          type="button"
          class="btn btn-outline-primary"
          id="decadesSubmitBtn"
          onClick={loadResults()}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const HousesContainer = (props) => {
    return (
      <div className="movies-container">
        <div className="movie">
          <div className="header">
            <strong>City</strong>
          </div>
          <div className="header">
            <strong>State</strong>
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

  const SalariesContainer = (props) => {
    return (
      <div className="movies-container">
        <div className="movie">
          {/* <div className="header">
            <strong>City</strong>
          </div> */}
          <div className="header">
            <strong>State</strong>
          </div>
          <div className="header">
            <strong>Min Salary</strong>
          </div>
          <div className="header">
            <strong>Max Salary</strong>
          </div>
          <div className="header">
            <strong>Average Salary</strong>
          </div>
        </div>
        <div className="movies-container" id="results">
          {results}
        </div>
      </div>
    );
  };

  return (
    <div className="container bestgenres-container">
      <div className="jumbotron">
        <Button
          className="category"
          variant="contained"
          color="primary"
          onClick={() => props.showChoices(true)}
        >
          {" "}
          Change Category{" "}
        </Button>
        {/* <div>
          <div className="h5">States</div>
          {statesDropDown}
          <br />
          <br />
          <div className="h5">Cities</div>
          {cityDropdown}
        </div> */}

        {props.dataset === "Home" || props.dataset === "Rent" ? (
          <div>
            <div className="h5">States</div>
            {statesDropDown}
            <br />
            <br />
            <div className="h5">Cities</div>
            {cityDropdown}
          </div>
        ) : (
          <div>
            <button
              type="button"
              class="btn btn-outline-primary"
              id="decadesSubmitBtn"
              onClick={loadResults()}
            >
              Load State Salaries
            </button>
          </div>
        )}
      </div>
      <div className="jumbotron">
        {props.dataset === "Home" ? (
          <HousesContainer
            col1={"Min House Price"}
            col2={"Max House Price"}
            col3={"Average House Price"}
          />
        ) : props.dataset === "Rent" ? (
          <HousesContainer
            col1={"Min Rental Price"}
            col2={"Max Rental Price"}
            col3={"Average Rental Price"}
          />
        ) : (
          <SalariesContainer />
        )}
      </div>
    </div>
  );
};
export default AnalyzeView;
