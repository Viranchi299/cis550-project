import React, { useState, useEffect } from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Analyze = (props) => {
	const [selectedState, setSelectedState] = useState("");
	const [statesList, setStatesList] = useState([]);
	const [selectedCity, setSelectedCity] = useState("");
	const [cityList, setCitiesList] = useState([]);
	const [houses, setHouses] = useState([]);

	const useMountEffect = (func) => useEffect(func, []);

	// call at very beginning so user can see all the states 
	useMountEffect(loadStates);

	// set state for selected "state name e.g., FL" 
	const handleChangeStateName = (event) => { 
		setSelectedState(event.target.value);
	}

	// set the city for the relevant state, e.g., [Orlando] after FL was selected 
	const handleChangeCityName = (event) => {
		setSelectedCity(event.target.value);
		console.log(selectedCity);
	}

	function loadStates() {
		fetch("http://localhost:8081/homerent/rentpricestate",
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
		console.log("Calling loadCities with:" + selectedState);
		fetch(`http://localhost:8081/homerent/getcitieshousing/${selectedState}`,
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

	function loadHouses() {
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
					<button className="submit-btn" id="decadesSubmitBtn" onClick={loadHouses}>Submit</button>
				</div>
			</div>
		);
	}

	const HousesContainer = () => {
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
		<div className="BestGenres">
			<PageNavbar active="analyze" />
			<div className="container bestgenres-container">
				<div className="jumbotron">
					<div className="h5">States</div>
					<StatesDropDown />
					<br/>
					<div className="h5">Cities</div>
					<CityDropDown />
				</div>
				<div className="jumbotron">
					<HousesContainer />
				</div>
			</div>
		</div>
	);
}
export default Analyze;