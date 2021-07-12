import { Route } from 'react-router-dom';
import './App.css';
import NonProfitRecords from './components/non-profit-records.component';

function App() {
  return (
    <div>
      <Route exact path={["/", "/records"]} component={NonProfitRecords} />
    </div>
  );
}

export default App;
