import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BestGenreRow = (props) => {
		return (
			<div className="movieResults">
				<div className="genre">{props.genre}</div>
				<div className="rating">{props.rating}</div>
			</div>
		);
}
export default BestGenreRow;