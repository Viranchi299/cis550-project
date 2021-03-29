With VisaCounts
AS
(select state, count(CaseNumber) as visaApp
 from VisaApplication
  group by state),
  
GreenCardCounts
AS
(select state, count(CaseNumber) as gcApp
 from GreenCardApplication
  group by state)
 
 SELECT v.state, visaApp, gcApp
 from VisaCounts v
 JOIN GreenCardCounts gc
 ON v.state = gc.state;
 