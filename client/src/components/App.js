import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Recommendations from "./Recommendations";
import Analyze from "./Analyze";
// added import for EC portion
import Home from "./Home";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/analyze" component={Analyze} />
          {/* new route for posters page */}
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
