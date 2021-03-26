var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- (1A) Average Monthly Rent by City) ---- */
function getAvgHomeValueAndRentByState(req, res) {
  // var inputState = req.params.state // get multiple options from user?
  var query = `
    WITH temp(State, AvgMonthlyRent)
    AS ( SELECT State, ROUND(AVG(RentalPriceValue),2) AS 'AvgMonthlyRent'
    FROM RentalPriceByLocation
    WHERE State IN 
    GROUP BY State
    ORDER BY AvgMonthlyRent DESC )

    SELECT h.State, ROUND(AVG(h.HomePriceValue),2) AS 'AvgHomeValue', temp.AvgMonthlyRent
    FROM HomePriceByLocation h
    WHERE State IN ?
    LEFT JOIN temp ON h.State = temp.State
    GROUP BY State
    ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- (1B) Average Monthly Rent by City) ---- */
function getAvgHomeValueAndRentByCity(req, res) {
  var inputCity = req.params.city // how can we get multiple options from user?
  var query = `
    WITH temp(City, State, AvgMonthlyRent)
    AS ( SELECT City, State, ROUND(AVG(RentalPriceValue),2) AS 'AvgMonthlyRent'
    FROM RentalPriceByLocation
    WHERE CITY IN ? 
    GROUP BY City
    ORDER BY AvgMonthlyRent DESC )

    SELECT h.City, h.State, ROUND(AVG(h.HomePriceValue),2) AS 'AvgHomeValue', temp.AvgMonthlyRent
    FROM HomePriceByLocation h
    WHERE CITY IN ?
    LEFT JOIN temp ON h.City = temp.City
    GROUP BY City
    ORDER BY City ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Average Salary for LCA and Green Card By State ---- */
function getAvgSalaryLCAAndGCByState(req, res) {
    var inputState = req.params.state // how can we get multiple options from user?
    console.log("State picked inside function is " + inputState)
    var query = `
    WITH lca(State, AvgSalaryLCA, NumDataPointsLCA) 
    AS ( SELECT State, AVG(Salary) AS 'AvgSalaryLCA', COUNT(Salary) AS 'NumDataPointsLCA'
    FROM VisaApplication v
    WHERE PayUnit = 'Year' 
    AND State IN ?
    GROUP BY State ) , 

    gc(State, AvgSalaryGC, NumDataPointsGC)
    AS ( SELECT State, AVG(Salary) AS 'AvgSalaryGC', COUNT(Salary) AS 'NumDataPointsGC'
    FROM GreenCardApplication
    WHERE PayUnit = 'Year'
    AND State IN ?
    GROUP BY State )

    SELECT lca.State, lca.AvgSalaryLCA, lca.NumDataPointsLCA, gc.AvgSalaryGC, gc.NumDataPointsGC
    FROM lca
    LEFT JOIN gc ON lca.State = gc.State
    ORDER BY AvgSalaryLCA DESC, AvgSalaryGC DESC
    `;
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
    });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
  console.log("Inside get decades function")
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}



/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  console.log("Inside best genres per decade function")
  var decadePicked = req.params.decade
  console.log("The decade we're in is " + decadePicked)
	var query = `
  with ta as(
  with t1 as
  (SELECT DISTINCT genre,title,id,imdb_id,rating,release_year,vote_count FROM Movies m JOIN Genres g ON m.id=g.movie_id WHERE FLOOR(release_year/10)*10='${decadePicked}')
  SELECT genre,AVG(rating) as avg_rating FROM t1 GROUP BY genre
  ),
  tb as (SELECT distinct genre, 0 AS avg_rating FROM Genres)
  SELECT tb.genre,IFNULL(ta.avg_rating,0) as avg_rating FROM tb LEFT JOIN ta ON ta.genre = tb.genre
  ORDER BY avg_rating DESC,genre ASC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}


/* Q3 BACKUP CODE: PASSES AUTOGRADER BUT DOESN'T LIST EVERY GENRE EVER AS 0 FOR CERTAIN decades

var query = `
with t1 as
(SELECT DISTINCT genre,title,id,imdb_id,rating,release_year,vote_count FROM Movies m JOIN Genres g ON m.id=g.movie_id WHERE FLOOR(release_year/10)*10='${decadePicked}')
SELECT genre,AVG(rating) as avg_rating FROM t1 GROUP BY genre
ORDER BY avg_rating DESC,genre ASC
`;

*/



//SELECT DISTINCT imdb_id FROM Movies order by newid() LIMIT 15

function randomMoviePosters(req, res) {
  console.log("Inside randomMoviePosters function")
	var query = `
  SELECT DISTINCT imdb_id FROM Movies ORDER BY RAND() LIMIT 15
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  randomMoviePosters: randomMoviePosters
}
