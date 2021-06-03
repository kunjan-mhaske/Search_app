import React, { Component } from "react";
import { Route } from "react-router-dom";
import { styles } from "./css-common"

import './App.css';

import RecordsList from "./components/records-list.component";

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
