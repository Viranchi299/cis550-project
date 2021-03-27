import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GenreButton = ({id, onClick, genre}) => {

		return (
			<div className="genre" id={id} onClick={onClick}>
			{genre}
			</div>
		);
}
export default GenreButton;