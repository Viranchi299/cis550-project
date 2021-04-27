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

  /* ----  ---- */

  render() {
    return (
      <div>
        <body
          background="https://www.legalshield.com/sites/default/files/styles/large_1366w/public/image/2020-08/House.jpg?itok=znvQkY-q"
          style={{ backgroundSize: "100%" }}
        >
          <div>
            <PageNavbar active="home" />
          </div>

          <div
            style={{
              height: "950px",
            }}
          >
            <div class="lander">
              <h1 id="title">Relocation Buddy</h1>
              <h2>Helping you find your new home</h2>
            </div>
            <div
              style={{
                height: "100px",
              }}
            ></div>
          </div>
        </body>
      </div>
    );
  }
}
