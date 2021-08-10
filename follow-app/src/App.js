import { Route } from 'react-router-dom';
import './App.css';
// import { styles } from "./css-common"
// import { withStyles } from '@material-ui/core';

import FollowGrid from "./components/followGrid.component";

function App() {
  return (
    <div>
      <Route exact path={["/", "/records"]} component={FollowGrid} />
    </div>
  );
}

// export default withStyles(styles)(App);
export default App;
