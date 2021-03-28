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


/* ---- (Housing and Rent Analysis) ---- */
app.get('/homerent/homevaluestate', routes.getHomeValueByState);
app.get('/homerent/rentpricestate', routes.getRentByState);

app.get('/homerent/getstateshousing', routes.getStatesHousing);
app.get('/homerent/getcitieshousing/:state', routes.getCitiesHousing);
app.get('/homerent/:getstateshousing&:getcitieshousing', routes.getHomeValueByCity);

app.get('/homerent/getstatesrent', routes.getStatesRent);
app.get('/homerent/getcitiesrent', routes.getCitiesRent);
app.get('/homerent/:getstatesrent&:getcitiesrent', routes.getRentByCity);

/* ---- (Salary Analysis) ---- */
app.get('/salary/salarystate', routes.getSalaryByState);
app.get('/salary/getstatessalary', routes.getStatesSalary);
app.get('/salary/:getstatessalary&:salary_low&:salary_high', routes.getEmployersBySalaryRange);

/* ---- (Housing and Rent Based on Salary Analysis) ---- */
app.get('/homerentsalary/rentsalary', routes.getRentVsSalaryByState);
app.get('/homerentsalary/homesalary', routes.getHomeVsSalaryByState);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
