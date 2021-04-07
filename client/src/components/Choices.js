import React, { useState, useEffect } from 'react';
import '../style/Analyze.css';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, makeStyles, withStyles, Typography } from "@material-ui/core";

/*
Component used to display choices on initial visit to Analyze route. 
*/


const useButtonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
})(Typography);

const Choices = (props) => {
    const classes = useButtonStyles();
    
    function handleHomesClicked() {
      props.setShowChoices(false);
      props.setShowHousingData(true);
    }

    function handleRentalPropertiesClicked() {
      props.setShowChoices(false);
      props.setShowHousingData(true);
    }
    
    
    
    return (			
        <div className="center">
        <WhiteTextTypography variant="h4" component="h4" color="secondary">What would you like to analyze?</WhiteTextTypography>
        <br/>
        <br/>
        <br/>
        <div className={classes.root}>
            <Button variant="contained" onClick = {handleHomesClicked}>Homes</Button>
            <Button variant="contained" color="primary">
            Rental Properties
            </Button>
            <Button variant="contained" color="secondary">
                Salaries
            </Button>
        </div>
</div>);
}
export default Choices;

