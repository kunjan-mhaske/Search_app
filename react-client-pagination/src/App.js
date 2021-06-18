import React, { Component } from "react";
import { Route } from "react-router-dom";

// Import the component
import RecordsList from "./components/records-list.component";

// CSS style for UI
import './App.css';
import { styles } from "./css-common"
import { withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path={["/", "/records"]} component={RecordsList} />
      </div>
    );
  }
}
export default withStyles(styles)(App);
