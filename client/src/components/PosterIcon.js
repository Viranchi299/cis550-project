import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class PosterIcon extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- EXTRA CREDIT ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render(props) {
		var link = this.props.link
		console.log("These are the props: "+link)
		return (
			<Card class="cardClass" style={{ width: '20rem', height: '38rem'}}>
			  <Card.Img src={this.props.poster}     onClick={(e) => {
      e.preventDefault();
      window.location.href=link;
      }}/>
			  <Card.Body>
			    <Card.Title>{this.props.title}</Card.Title>
			    <Card.Text>
					{this.props.plot}
			    </Card.Text>
			  </Card.Body>
			</Card>
		);
	}
}


//"https://www.theroadtrip.co.nz/wp-content/uploads/2019/04/picturesque-milford-sound.jpg"
