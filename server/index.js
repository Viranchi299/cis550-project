const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


/* ---- (Home vs Rent Info) ---- */
app.get('/homevsrent/state', routes.getState);
app.get('/homevsrent/city', routes.getCity);
app.get('/homevsrent/:state&:city', routes.getAvgHomeValueAndRent);


/* ---- Q1b (Dashboard) ---- */
app.get('/salary/:genre', routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.





/* ---- Q2 (Recommendations) ---- */
app.get('/recommendations/:movie', routes.getRecs);





/* ---- (Best Genre) ---- */
app.get('/decades', routes.getDecades);






/* ---- Q3b (Best Genre) ---- */
app.get('/decades/:decade', routes.bestGenresPerDecade);



/* ---- EXTRA CREDIT ---- */
app.get('/Posters/random', routes.randomMoviePosters);








app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
