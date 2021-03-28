import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const DashboardMovieRow = (props) => {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
		return (
			<div className="movie">
				<div className="state">{props.state}</div>
				<div className="minHVP">{props.minHVP}</div>
				<div className="maxHVP">{props.MaxHVP}</div>
			</div>
		);
}
export default DashboardMovieRow;