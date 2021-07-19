import { Route } from 'react-router-dom';
import './App.css';
import { styles } from "./css-common"
import { withStyles } from '@material-ui/core';

import NonProfitRecords from './components/np-records.component';

function App() {
  return (
    <div>
      <Route exact path={["/", "/records"]} component={NonProfitRecords} />
    </div>
  );
}

export default withStyles(styles)(App);

