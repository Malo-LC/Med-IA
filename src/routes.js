import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoginPage from './App';
import DashboardPage from './dashboard';
import { useSelector } from 'react-redux';


const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute
          path="/dashboard"
          component={DashboardPage}
          isLoggedIn={isLoggedIn}
        />
      </Switch>
    </Router>
  );
};

export default App;
