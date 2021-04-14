import React from "react";
import PageNavbar from "./PageNavbar";
import RecommendationsRow from "./RecommendationsRow";
import PosterIcon from "./PosterIcon";
import "../style/Recommendations.css";
import "../style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Posters extends React.Component {
  constructor(props) {
    super(props);

    // State maintained by this React component is the selected movie name,
    // and the list of recommended movies.
    this.state = {
      moviePosters: [],
      titlesList: [],
      yoyo: [],
      imdbData: [],
    };

    // this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
    // this.submitMovie = this.submitMovie.bind(this);
  }

  handleMovieNameChange(e) {
    this.setState({
      movieName: e.target.value,
    });
  }

  async componentDidMount() {
    var titlesArray = [];
    var dataArray = [];

    var url = "http://localhost:8081/Posters/random";
    const resp = await fetch(url);
    const data = await resp.json();
    console.log("Benawad data:");
    console.log(data);
    //var title = data.Title
    //console.log("Benawad title:" + title)
    this.setState({
      imdbData: [...data],
    });
    const { imdbData } = this.state;
    console.log("myimdbdata");
    console.log(imdbData);

    for (var i = 0; i < 15; i++) {
      var url =
        "http://www.omdbapi.com/?apikey=cba429e1&i=" + imdbData[i].imdb_id;
      //console.log(url)
      var resp20 = await fetch(url);
      var data20 = await resp20.json();
      if (data20.Website === "N/A") {
        data20.Website = "http://imdb.com/title/" + imdbData[i].imdb_id;
      }
      dataArray.push(data20);
    }

    console.log("FINAL DATA");
    console.log(dataArray);

    let fDivs = dataArray.map((item, i) => (
      <PosterIcon
        title={item.Title}
        plot={"(" + item.Year + ") | " + item.Runtime + " | " + item.Rated}
        poster={item.Poster}
        production={item.Production}
        link={item.Website}
      />
    ));

    this.setState({
      moviePosters: fDivs,
    });
  }

  /* ----  ---- */

  render() {
    return (
      <div>
        <div>
          <PageNavbar active="home" />
        </div>

        {/* <div class="col-lg-6">
          <h1>Adding placeholder text</h1>
        </div>
        <div>
          <img src="https://media.istockphoto.com/photos/rear-view-of-loving-couple-walking-towards-house-picture-id905902112?k=6&m=905902112&s=612x612&w=0&h=G4W08ESuoEXAS74tpXdngyueaRrnBj49HSfGwoYThgo=" /> */}
      </div>
    );
  }
}
