import './App.css';

import SearchBar from './components/search';
import { Component } from 'react';
import { Route } from "react-router-dom";

class App extends Component{
  render() {
    return (
      <div>
        <Route exact path={["/", "/records"]} component={SearchBar} />
      </div>
    )
  }
}

export default App;
