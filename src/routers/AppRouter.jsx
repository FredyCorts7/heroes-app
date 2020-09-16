import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const {
    user: { authenticated },
  } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={authenticated}
            path='/login'
            component={LoginScreen}
          />

          <PrivateRoute
            isAuthenticated={authenticated}
            path='/'
            component={DashboardRoutes}
          />
        </Switch>
      </div>
    </Router>
  );
};
