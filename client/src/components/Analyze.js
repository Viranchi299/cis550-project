import React, { useState, useEffect } from 'react';
import '../style/Analyze.css';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, makeStyles, withStyles, Typography } from "@material-ui/core";
import AnalyzeView from './AnalyzeView';

const Analyze = (props) => { 
	
	const [showChoices, setShowChoices] = useState(true);
	const [analyzeDataSet, setAnalyzeDataSet] = useState("");

	function handleChoice(choice) {
		setShowChoices(false);
		setAnalyzeDataSet(choice);
	}

	return (
		<div className="BestGenres">
			<PageNavbar active="analyze" />
			{console.log("value of show choices: " + showChoices)}
			{showChoices ? (<Choices handleChoice={handleChoice}/>) : (<AnalyzeView dataset={analyzeDataSet} showChoices={setShowChoices}/>)}
		</div>
	);
}
const Choices = (props) => {
	const useButtonStyles = makeStyles((theme) => ({
		root: {
		  '& > *': {
			margin: theme.spacing(),
		  },
		},
	  }));
	
	const WhiteTextTypography = withStyles({
		root: {
		  color: "#FFFFFF"
		}
	})(Typography);

	const classes = useButtonStyles();
	return (			
		<div className="center">
		<WhiteTextTypography variant="h4" component="h4" color="secondary">What would you like to Analyze?</WhiteTextTypography>
		<br/>
		<br/>
		<br/>
		<div className={classes.root}>
			<Button className="choice" variant="contained" onClick = {() => props.handleChoice("Home")}>Homes</Button>
			<Button className="choice" variant="contained" color="primary" onClick = {() => props.handleChoice("Rent")}>
			Rental Properties
			</Button>
			<Button className="choice" variant="contained" color="secondary" onClick = {() => props.handleChoice("Salary")}>
				Salaries
			</Button>
		</div>
</div>);
}

export default Analyze;