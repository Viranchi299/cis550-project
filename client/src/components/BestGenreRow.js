import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BestGenreRow = (props) => {
		return (
			<div className="movieResults">
				{/* use default class names from css styling to get them to align for now, will update! */}
				<div className="genre">{props.City}</div>
				<div className="rating">{props.State}</div>
				<div className="rating">{props.MinHVP}</div>
				<div className="rating">{props.MaxHVP}</div>
				<div className="rating">{props.AvgHVP}</div>
			</div>
		);
}
export default BestGenreRow;