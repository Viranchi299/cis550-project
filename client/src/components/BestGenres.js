import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/decades",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(decadesList => {
      if (!decadesList) return;  //decadesList = list of decades JSON objects
			console.log(decadesList)

      // Map each object in decadesList to an HTML option element:
      let decadesOptions = decadesList.map((decadeObj, i) =>
			<option value={decadeObj.decade}>{decadeObj.decade}</option>
			//decadeObj.decade
      );
			console.log(decadesOptions)



      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        decades: decadesOptions
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }



	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		var myDecade = this.state.selectedDecade
		console.log("Sending an http request for the following decade: " + myDecade)
		//console.log("Decade " + this.state.movieName + " was selected");
		//var movieName = this.state.movieName
		//console.log("Tried to print this movie name: " + movieName)
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/decades/"+myDecade,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(movieList => {
      if (!movieList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      console.log("This is the movieList")
      console.log(movieList)
      let movieDivs = movieList.map((movieObj, i) =>
      <div><BestGenreRow genre={movieObj.genre} rating={movieObj.avg_rating}/> </div>
      );
      console.log(movieDivs);

      //Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        genres: movieDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

	}





	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}
