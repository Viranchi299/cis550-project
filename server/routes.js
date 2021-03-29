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
  console.log("calling getHomeValueByState...");
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
    if (err) {
      console.log("WENT WRONG!!!!!!!!!!!!!\n");
      console.log(err);
    }
    else {
      res.json(rows);
    }
  });
  console.log("completed getHomeValueByState");
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
  console.log("calling getStatesHousing...");
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
  // debugging... 
  
  console.log("completed getStatesHousing");
}

/* ---- (Get Cities from Housing set - dropdown) ---- */
function getCitiesHousing(req, res) {
  var inputState = req.params.state
  console.log("state is" + inputState);
  var query = `
    SELECT DISTINCT City
    FROM HomePriceByLocation
    WHERE State = '${inputState}'
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
  console.log("calling getHomeValueByCity...");
  var inputState = req.params.getstateshousing
  var inputCity = req.params.getcitieshousing
  console.log(`input state is: ${inputState} and city is:${inputCity}`);
  var query = `
    SELECT City, 
           State, 
           ROUND(MIN(HomePriceValue),2) AS 'MinHVP',
           ROUND(MAX(HomePriceValue),2) AS 'MaxHVP',
           ROUND(AVG(HomePriceValue),2) AS 'AvgHVP'
    FROM HomePriceByLocation
    WHERE State = '${inputState}'
    AND City = '${inputCity}'
  `;
  
  connection.query(query, function(err, rows, fields) {
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
    WHERE State = '${inputState}'
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
    WHERE State = '${inputState}'
    AND City = '${inputCity}'
  `;
  
  connection.query(query, function(err, rows, fields) {
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
  
  connection.query(query, function(err, rows, fields) {
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

/* ---- (Get States from Salary sets - dropdown) ---- */
function getCitiesSalary(req, res) {
  var inputState = req.params.state
  var query = `
    WITH temp(City)
    AS ( SELECT DISTINCT City FROM GreenCardApplication WHERE State = '${inputState}'
         UNION
         SELECT DISTINCT City FROM VisaApplication WHERE State = '${inputState}' )
    SELECT City FROM temp 
    ORDER BY City ASC
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
  var inputCity = req.params.city
  var inputSalaryLow = req.params.salary_low
  var inputSalaryHigh = req.params.salary_high
  var query = `
    WITH temp(Employer, State, City, AvgSalary)
    AS ( 
          SELECT EmployerName, 
          State,
          City,
          ROUND(AVG(Salary),2) AS 'AvgSalary'
          FROM ( 
                SELECT EmployerName, State, City, Salary FROM VisaApplication WHERE PayUnit = 'Year'
                UNION ALL
                SELECT EmployerName, State, City, Salary FROM GreenCardApplication WHERE PayUnit = 'Year'
              ) x
          GROUP BY EmployerName
          ORDER BY AvgSalary DESC
        )
    SELECT * FROM temp
    WHERE State = '${inputState}'
    AND City = '${inputCity}'
    AND AvgSalary BETWEEN '${inputSalaryLow}' AND '${inputSalaryHigh}'
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

/* ---- (Get Rent vs Salary) ---- */
function getRentVsSalaryByState(req, res) {
  inputState = req.params.state
  var query = `
    WITH s(State, AvgMonthlySalary)
    AS (
        SELECT State, ROUND(AVG(Salary / 12),2) AS 'AvgMonthlySalary'
        FROM (
              SELECT State, Salary FROM VisaApplication WHERE PayUnit = 'Year'
              UNION ALL
              SELECT State, Salary FROM GreenCardApplication WHERE PayUnit = 'Year'
              ) x
        GROUP BY State
        ORDER BY State ASC ),
    r(State, AvgMonthlyRent)
    AS (
        SELECT State, ROUND(AVG(RentalPriceValue),2) AS 'AvgMonthlyRent'
        FROM RentalPriceByLocation
        GROUP BY State
        ORDER BY State ASC
        )   
    SELECT s.State, 
           s.AvgMonthlySalary, 
           r.AvgMonthlyRent, 
           (r.AvgMonthlyRent / s.AvgMonthlySalary * 100) AS '%RentOfMonthlySalary'
    FROM s
    LEFT JOIN r ON s.State = r.State
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Get Home Price vs Salary) ---- */
function getHomeVsSalaryByState(req, res) {
  inputState = req.params.state
  var query = `
    WITH s(State, AvgAnnualSalary)
    AS (
        SELECT State, ROUND(AVG(Salary),2) AS 'AvgAnnualSalary'
        FROM (
              SELECT State, Salary FROM VisaApplication WHERE PayUnit = 'Year'
              UNION ALL
              SELECT State, Salary FROM GreenCardApplication WHERE PayUnit = 'Year'
              ) x
        GROUP BY State
        ORDER BY State ASC ),
    h(State, AvgHomePrice)
    AS (
        SELECT State, ROUND(AVG(HomePriceValue),2) AS 'AvgHomePrice'
        FROM HomePriceByLocation
        GROUP BY State
        ORDER BY State ASC
        )   
    SELECT s.State, 
           s.AvgAnnualSalary, 
           h.AvgHomePrice, 
           (h.AvgHomePrice / s.AvgAnnualSalary) AS 'YearsToBuyHome'
    FROM s
    LEFT JOIN h ON s.State = h.State
    ORDER BY YearsToBuyHome DESC
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
  getCitiesSalary: getCitiesSalary,
  getEmployersBySalaryRange: getEmployersBySalaryRange,
  getRentVsSalaryByState: getRentVsSalaryByState,
  getHomeVsSalaryByState: getHomeVsSalaryByState
}
