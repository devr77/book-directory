import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  HomePage,
  EditBookPage
} from './containers';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/:id" exact={true} component={EditBookPage} />
      </Switch>
    </Router>
  );
}

export default App;
