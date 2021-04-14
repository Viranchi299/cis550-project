===============================================
Credentials
Instance identifier: housing-cis550-proj
master username: admin
password: **will be emailed to TA**

Endpoint / host: housing-cis550-proj.cgkmdltes6oq.us-east-1.rds.amazonaws.com
Port: 3306
Database: housing

===============================================
Queries and descriptions


//Query 1: Home values by state; returns min, max, and average home value price
    SELECT State, 
           ROUND(MIN(HomePriceValue),2) AS 'MinHVP',
           ROUND(MAX(HomePriceValue),2) AS 'MaxHVP',
           ROUND(AVG(HomePriceValue),2) AS 'AvgHVP'
    FROM HomePriceByLocation
    GROUP BY State
    ORDER BY State ASC
 

// Query 2: Monthly rent by state; returns min, max, and average monthly rent 
    SELECT State, 
           ROUND(MIN(RentalPriceValue),2) AS 'MinRent',
           ROUND(MAX(RentalPriceValue),2) AS 'MaxRent',
           ROUND(AVG(RentalPriceValue),2) AS 'AvgRent'
    FROM RentalPriceByLocation
    GROUP BY State
    ORDER BY State ASC
 


//Query 3: Allows users to input state and city; returns min, max, and average home value price based on the inputted city and state
    SELECT City, 
           State, 
           ROUND(MIN(HomePriceValue),2) AS 'MinHVP',
           ROUND(MAX(HomePriceValue),2) AS 'MaxHVP',
           ROUND(AVG(HomePriceValue),2) AS 'AvgHVP'
    FROM HomePriceByLocation
    WHERE State = '${inputState}'
    AND City = '${inputCity}'
 

// Query 4: Allows users to input state and city; returns min, max, and average monthly rent based on the inputted city and state
    SELECT City, 
           State, 
           ROUND(MIN(RentalPriceValue),2) AS 'MinRent',
           ROUND(MAX(RentalPriceValue),2) AS 'MaxRent',
           ROUND(AVG(RentalPriceValue),2) AS 'AvgRent'
    FROM RentalPriceByLocation
    WHERE State = '${inputState}'
    AND City = '${inputCity}'

// Query 5: Min, max, and average salary by all states (will be used to create heatmap of salaries by state)

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
 
// Query 6: Average salary by employer for user-inputted state and city, so that users know the highest-paying employers in the inputted state and city

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

// Query 7: Monthly Rent vs Salary by state; returns the % of salary that goes into rent by state on average
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
 

// Query 8: Home price vs salary by state; returns the number of years of salary required to purchase a home based on the average price of a home by state. This is known as the House-Price-to-Income Ratio, and the rule of thumb is that the cost of one's house should equal roughly 2.6 years of income. 

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

=== How we simplified queries

1. Originally, we had bigger table on left (shown below) for query 8. After week 9/10 of query optimization class,
we moved the smaller table to the right (as submitted in milestone 3).

    SELECT s.State, 
           s.AvgAnnualSalary, 
           h.AvgHomePrice, 
           (h.AvgHomePrice / s.AvgAnnualSalary) AS 'YearsToBuyHome'
    FROM h
    LEFT JOIN s ON s.State = h.State
    ORDER BY YearsToBuyHome DESC


2. Added index on zipcode fields for both greencard and visa tables; which shaved ~2% runtime off query 8.

CREATE INDEX gcZipcode
ON GreenCardApplication(Zipcode);

CREATE INDEX gcZipcode
ON VisaApplication(Zipcode);
