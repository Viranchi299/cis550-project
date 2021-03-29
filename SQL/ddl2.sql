-- check
select Zipcode from GreenCardApplication
where length(Zipcode) < 6
limit 1;

-- check
INSERT INTO VisaApplication (CaseNumber, JobTitle, JobCode, EmployerName, City, State, Zipcode, Salary, PayUnit)
Values ('I-200-20268-843355','Software Developers Applications', '15-1132',	'Hexaware Technologies Inc.',	'Iselin',	'NJ', '08830',103770,	'Year');


CREATE TABLE GreenCardApplication(
	CaseNumber varchar(255),
	JobTitle varchar(255)  NOT NULL,
	JobCode varchar(255) NOT NULL,
	EmployerName varchar(255),
	City varchar(255),
	State varchar(2),
	Zipcode varchar(10) NOT NULL,
	Salary int NOT NULL,
	PayUnit varchar(20) NOT NULL,
	EmployerEmployeeCount int,
	PRIMARY KEY (CaseNumber),
    CHECK (PayUnit IN ('Hour','Week','Bi-Weekly','Month','Year'))
	);



CREATE TABLE VisaApplication(
	CaseNumber varchar(255),
	JobTitle varchar(255)  NOT NULL,
	JobCode varchar(255) NOT NULL,
   	EmployerName varchar(255),
    City varchar(255),
	State varchar(2),
	Zipcode varchar(10) NOT NULL,	
	PayUnit varchar(20) NOT NULL,
	Salary int NOT NULL,
	PRIMARY KEY (CaseNumber),
    CHECK (PayUnit IN ('Hour','Week','Bi-Weekly','Month','Year'))
	);
	
CREATE TABLE RentalPriceByLocation(
	Zipcode varchar(10) NOT NULL,
           City varchar(10) NOT NULL,
	State varchar(2),
	RentalPriceValue int NOT NULL,
	PRIMARY KEY (Zipcode)
	);	

CREATE TABLE HomePriceByLocation(
	Zipcode varchar(10) NOT NULL,
    	City varchar(10) NOT NULL,
	State varchar(2),
	HomePriceValue int NOT NULL,
	PRIMARY KEY (Zipcode)
	);	