var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// Housing & Rent Analysis: State-Level breakdown
/* ---- (Get Home Value By State) ---- */
function getHomeValueByState(req, res) {
  var query = `
    SELECT State, 
           ROUND(MIN(HomePriceValue),2) AS 'MinHVP',
           ROUND(MAX(HomePriceValue),2) AS 'MaxHVP',
           ROUND(AVG(HomePriceValue),2) AS 'AvgHVP'
    FROM HomePriceByLocation
    GROUP BY State
    ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}
/* ---- (Get Monthly Rent By State) ---- */
function getRentByState(req, res) {
  var query = `
    SELECT State, 
           ROUND(MIN(RentalPriceValue),2) AS 'MinRent',
           ROUND(MAX(RentalPriceValue),2) AS 'MaxRent',
           ROUND(AVG(RentalPriceValue),2) AS 'AvgRent'
    FROM RentalPriceByLocation
    GROUP BY State
    ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// Housing & Rent Analysis: City-Level breakdown

/* ---- (Get States from Housing set - dropdown) ---- */
function getStatesHousing(req, res) {
  var query = `
    SELECT DISTINCT State
    FROM HomePriceByLocation
    ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Cities from Housing set - dropdown) ---- */
function getCitiesHousing(req, res) {
  var inputState = req.params.state
  var query = `
    SELECT DISTINCT City
    FROM HomePriceByLocation
    WHERE State = ${inputState}
    ORDER BY City ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Home Value By City) ---- */
function getHomeValueByCity(req, res) {
  var inputState = req.params.state
  var inputCity = req.params.city
  var query = `
    SELECT City, 
           State, 
           ROUND(MIN(HomePriceValue),2) AS 'MinHVP',
           ROUND(MAX(HomePriceValue),2) AS 'MaxHVP',
           ROUND(AVG(HomePriceValue),2) AS 'AvgHVP'
    FROM HomePriceByLocation
    WHERE State = ${inputState}
    AND City = ${inputCity}
  `;
  
  connection.query(query_state_only, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Get States from Rent set - dropdown) ---- */
function getStatesRent(req, res) {
  var query = `
    SELECT DISTINCT State
    FROM RentalPriceByLocation
    ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Cities from Rent set - dropdown) ---- */
function getCitiesRent(req, res) {
  var inputState = req.params.state
  var query = `
    SELECT DISTINCT City
    FROM RentalPriceByLocation
    WHERE State = ${inputState}
    ORDER BY City ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Rent By City) ---- */
function getRentByCity(req, res) {
  var inputState = req.params.state
  var inputCity = req.params.city
  var query = `
    SELECT City, 
           State, 
           ROUND(MIN(RentalPriceValue),2) AS 'MinRent',
           ROUND(MAX(RentalPriceValue),2) AS 'MaxRent',
           ROUND(AVG(RentalPriceValue),2) AS 'AvgRent'
    FROM RentalPriceByLocation
    WHERE State = ${inputState}
    AND City = ${inputCity}
  `;
  
  connection.query(query_state_only, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Salary Analysis: State-Level breakdown
// Combines both LCA and Green Card data
/* ---- (Get Salary By State) ---- */
function getSalaryByState(req, res) {
  var query = `
    SELECT State, 
           ROUND(MIN(Salary),2) AS 'MinSalary',
           ROUND(MAX(Salary),2) AS 'MaxSalary',
           ROUND(AVG(Salary),2) AS 'AvgSalary'
    FROM (   
          SELECT State, Salary FROM VisaApplication WHERE PayUnit = 'Year'
          UNION ALL
          SELECT State, Salary FROM GreenCardApplication WHERE PayUnit = 'Year'
          ) temp
    GROUP BY State
    ORDER BY State ASC
  `;
  
  connection.query(query_state_only, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Get States from Salary sets - dropdown) ---- */
function getStatesSalary(req, res) {
  var query = `
    WITH temp(State)
    AS ( SELECT DISTINCT State FROM GreenCardApplication
         UNION
         SELECT DISTINCT State FROM VisaApplication )
         SELECT State FROM temp 
         ORDER BY State ASC
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Employers by Salary Range and State) ---- */
function getEmployersBySalaryRange(req, res) {
	var inputState = req.params.state
  var inputSalaryLow = req.params.salary_low
  var inputSalaryHigh = req.params.salary_high
  var query = `
    WITH temp(Employer, State, AvgSalary)
    AS ( 
          SELECT EmployerName, 
          State,
          ROUND(AVG(Salary),2) AS 'AvgSalary'
          FROM ( 
                SELECT EmployerName, State, Salary FROM VisaApplication WHERE PayUnit = 'Year'
                UNION ALL
                SELECT EmployerName, State, Salary FROM GreenCardApplication WHERE PayUnit = 'Year'
              ) x
          GROUP BY EmployerName
          ORDER BY AvgSalary DESC
        )
    SELECT * FROM temp
    WHERE State = ${inputState}
    AND AvgSalary BETWEEN ${inputSalaryLow} AND ${inputSalaryHigh}
    GROUP BY Employer
    ORDER BY AvgSalary DESC, State ASC
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
	getHomeValueByState: getHomeValueByState,
  getRentByState: getRentByState,
	getStatesHousing: getStatesHousing,
  getCitiesHousing: getCitiesHousing,
  getStatesRent: getStatesRent,
  getCitiesRent: getCitiesRent,
  getHomeValueByCity: getHomeValueByCity,
  getRentByCity: getRentByCity,
  getSalaryByState: getSalaryByState,
  getStatesSalary: getStatesSalary,
  getEmployersBySalaryRange: getEmployersBySalaryRange
	// getDecades: getDecades,
 //  bestGenresPerDecade: bestGenresPerDecade,
 //  randomMoviePosters: randomMoviePosters
}
