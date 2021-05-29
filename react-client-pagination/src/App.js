import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { styles } from "./css-common"

// import logo from './logo.svg';
import './App.css';

// import AddRecord from "./components/add-record.component";
// import Record from "./components/record.component";
import RecordsList from "./components/records-list.component";

// import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    // const { classes } = this.props
    return (
      <div>
        {/* <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              School Search
            </Typography> */}
            {/* <Link to={"/records"} className={classes.link}>
              <Typography variant="body2">
                Records
              </Typography>
            </Link> */}
            {/* <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
              </Typography>
            </Link> */}
          {/* </Toolbar> */}
        {/* </AppBar> */}
        <Route exact path={["/", "/records"]} component={RecordsList} />
        {/* <switch> */}          
          {/* <Route exact path="/add" component={AddRecord} />
          <Route path="/records/:id" component={Record} /> */}
        {/* </switch> */}
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default withStyles(styles)(App);
