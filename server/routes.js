var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- (1A) Average Monthly Rent by City) ---- */
function getAvgHomeValueAndRentByState(req, res) {
  var query = `
    WITH temp(State, AvgMonthlyRent)
    AS ( SELECT State, ROUND(AVG(RentalPriceValue),2) AS 'AvgMonthlyRent'
    FROM RentalPriceByLocation
    WHERE State IN ?
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
  var query = `
    WITH temp(City, State, AvgMonthlyRent)
    AS ( SELECT City, State, ROUND(AVG(RentalPriceValue),2) AS 'AvgMonthlyRent'
    FROM RentalPriceByLocation
    WHERE CITY IN ?
    GROUP BY City
    ORDER BY AvgMonthlyRent DESC )

    SELECT h.City, h.State, ROUND(AVG(h.HomePriceValue),2) AS 'AvgHomeValue',        temp.AvgMonthlyRent
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


/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
    console.log("Inside get Recs function")
    var moviePicked = req.params.movie
    console.log("Movie picked inside function is " + moviePicked)
    var query = `
    with l1 as (
    with list1 as (SELECT genre from Genres g JOIN Movies m ON g.movie_id = m.id WHERE m.title = '${moviePicked}'),
    list1a as (SELECT count(*)as counttt ,0 as mergerr FROM list1),
    list2 as (SELECT movie_id,genre from Genres),
    list3 as (SELECT DISTINCT list2.movie_id,list2.genre FROM list1 JOIN list2 ON list1.genre=list2.genre),
    list4 as (SELECT movie_id, count(movie_id) as count ,0 as merger FROM list3 GROUP BY movie_id),
    list5 as (SELECT * FROM list4 JOIN list1a ON list4.merger=list1a.mergerr)
    SELECT * FROM list5 WHERE count>=counttt
    )
    SELECT title,id,rating,vote_count from l1 JOIN movies m ON l1.movie_id=m.id WHERE NOT(title='${moviePicked}')
    ORDER BY m.rating DESC, m.vote_count DESC
    LIMIT 5;
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
