import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
import Posters from './Posters'

const App = () => {

		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							component={
								<Dashboard />
							}
						/>
						<Route
							exact
							path="/dashboard"
							component={
								<Dashboard />
							}
						/>
						<Route
							path="/recommendations"
							component={
								<Recommendations />
							}
						/>
						<Route
							path="/bestgenres"
							component={
								<BestGenres />
							}
						/>
						<Route
							path="/Posters"
							component={
								<Posters />
							}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
