import React, { useState, loadStates, useEffect } from 'react';
import '../style/Analyze.css';
import '../style/AnalyzeView.css';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, makeStyles, withStyles, Typography } from "@material-ui/core";

const AnalyzeView = (props) => {

    const [selectedState, setSelectedState] = useState("");
    const [statesList, setStatesList] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [cityList, setCitiesList] = useState([]);
    const [houses, setHouses] = useState([]);

    console.log("rendering analyze view with choice as: " + props.dataset);
    console.log("states list length " + statesList.length);

    useEffect(() => {
        loadStates();
    }, [statesList.length]);


    function loadStates() {
        const dataset = props.dataset;
        const endpoints = {
            "Home": "/homerent/getstateshousing",
            "Rent": "/homerent/rentpricestate",
            "Salary": "/salary/salarystate"
        }
        fetch(`http://localhost:8081${endpoints[dataset]}`,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
                // Convert the response data to a JSON.
                return res.json();
            }, err => {
                // Print the error if there is one.
                console.log(err);
            }).then((stateNames) => {
                console.log(stateNames);
                if (!stateNames) return;
                let stateNameDivs = stateNames.map((state, i) =>
                    <option value={state.State}>{state.State}</option>
                );
                setStatesList(stateNameDivs);
            }, (err) => {
                // Print the error if there is one.
                console.log(err);
            });
    }

    function loadCities() {
        const dataset = props.dataset;
        const endpoints = {
            "Home": "/homerent/getcitieshousing/",
            "Rent": "/homerent/getcitiesrent/",
            "Salary": "/salary/getcitiessalary/"
        }
        console.log("Calling loadCities with:" + selectedState);
        fetch(`http://localhost:8081${endpoints[dataset]}${selectedState}`,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
                // Convert the response data to a JSON.
                return res.json();
            }, err => {
                // Print the error if there is one.
                console.log(err);
            }).then((cityList) => {
                console.log(cityList);
                if (!cityList) return;
                let cityDivs = cityList.map((city, i) =>
                    <option value={city.City}>{city.City}</option>
                );
                //Set the state of the genres list to the value returned by the HTTP response from the server.
                setCitiesList(cityDivs);
            }, (err) => {
                // Print the error if there is one.
                console.log(err);
            });
    }

    function loadResults() {
        return props.dataset === "Home" ? loadHomes : props.dataset === "Rent" ? loadRentals : loadSalaries
    }

    function loadRentals() {
        return;
    }

    function loadSalaries() {
        return;
    }

    function loadHomes() {
        fetch(`http://localhost:8081/homerent/${selectedState}&${selectedCity}`,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
                // Convert the response data to a JSON.
                return res.json();
            }, err => {
                // Print the error if there is one.
                console.log(err);
            }).then((houses) => {
                if (!houses) return;
                let houseRows = houses.map((house, i) =>
                    <BestGenreRow
                        City={house.City}
                        State={house.State}
                        MinHVP={house.MinHVP}
                        MaxHVP={house.MaxHVP}
                        AvgHVP={house.AvgHVP} />
                );
                console.log(houses);
                //Set the state of the genres list to the value returned by the HTTP response from the server.
                setHouses(houseRows);
                console.log(houseRows);
            }, (err) => {
                // Print the error if there is one.
                console.log(err);
            });
    }


    // set state for selected "state name e.g., FL" 
    const handleChangeStateName = (event) => {
        setSelectedState(event.target.value);
    }

    // set the city for the relevant state, e.g., [Orlando] after FL was selected 
    const handleChangeCityName = (event) => {
        setSelectedCity(event.target.value);
        console.log(selectedCity);
    }



    const StatesDropDown = () => {
        return (
            <div className="years-container">
                <div className="dropdown-container">
                    <select value={selectedState} onChange={handleChangeStateName} className="dropdown" id="decadesDropdown">
                        <option select value> -- select a state -- </option>
                        {statesList}
                    </select>
                    <button className="submit-btn" id="decadesSubmitBtn" onClick={loadCities}>Submit</button>
                </div>
            </div>
        );
    }

    const CityDropDown = () => {
        return (
            <div className="citiesContainer">
                <div className="dropdown-container">
                    <select value={selectedCity} onChange={handleChangeCityName} className="dropdown" id="cityDropdown">
                        <option select value> -- select a city -- </option>
                        {cityList}
                    </select>
                    {/* call loadResults using () since function will return a function to assign to onClick */}
                    <button className="submit-btn" id="decadesSubmitBtn" onClick={loadResults()}>Submit</button>
                </div>
            </div>
        );
    }

    const HousesContainer = (props) => {
        return (
            <div className="movies-container">
                <div className="movie">
                    <div className="header"><strong>City</strong></div>
                    <div className="header"><strong>State</strong></div>
                    <div className="header"><strong>{props.col1}</strong></div>
                    <div className="header"><strong>{props.col2}</strong></div>
                    <div className="header"><strong>{props.col3}</strong></div>
                </div>
                <div className="movies-container" id="results">
                    {houses}
                </div>
            </div>
        );
    }


    const SalariesContainer = () => {
        return (
            <div className="movies-container">
                <div className="movie">
                    <div className="header"><strong>City</strong></div>
                    <div className="header"><strong>State</strong></div>
                    <div className="header"><strong>Min House Price</strong></div>
                    <div className="header"><strong>Max House Price</strong></div>
                    <div className="header"><strong>Average House Price</strong></div>
                </div>
                <div className="movies-container" id="results">
                    {houses}
                </div>
            </div>
        );
    }


    return (
        <div className="container bestgenres-container">
            <div className="jumbotron">
                <Button className="category" variant="contained" color="primary" onClick={(e) => props.showChoices(true)}> Change Category </Button>
                <div className="h5">States</div>
                <StatesDropDown />
                <br />
                <br />
                <div className="h5">Cities</div>
                <CityDropDown />
            </div>
            <div className="jumbotron">
                {props.dataset === "Home" ?
                    (<HousesContainer col1={"Min House Price"}
                        col2={"Max House Price"}
                        col3={"Average House Price"} />) :
                        props.dataset === "Rent" ?
                        (<HousesContainer col1={"Min Rental Price"}
                        col2={"Max Rental Price"}
                        col3={"Average Rental Price"} />)
                        : <SalariesContainer />}
            </div>
        </div>
    );
}
export default AnalyzeView;