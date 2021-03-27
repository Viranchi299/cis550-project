import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecommendationsRow = () => {

	return (
		<div className="movieResults">
			<div className="title">{props.title}</div>
			<div className="id">{props.id}</div>
			<div className="rating">{props.rating}</div>
			<div className="votes">{props.votes}</div>
		</div>
	);
}
export default RecommendationsRow;