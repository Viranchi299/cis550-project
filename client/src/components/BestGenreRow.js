import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.genre}</div>
				<div className="rating">{this.props.rating}</div>
			</div>
		);
	}
}
