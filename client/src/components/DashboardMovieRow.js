import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const DashboardMovieRow = (props) = () => {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
		return (
			<div className="movie">
				<div className="title">{props.title}</div>
				<div className="rating">{props.rating}</div>
				<div className="votes">{props.vote_count}</div>
			</div>
		);
}
export default DashboardMovieRow;