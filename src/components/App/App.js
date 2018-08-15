
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import GuestPage from '../GuestPage/GuestPage';
import NewPara from '../NewPara/NewPara';
import ListView from '../ListView/ListView';
import GridView from '../GridView/GridView';
import BillingPage from '../Billing/BillingPage'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountSettings from '../AccountSettings/AccountSettings';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
      <div>
        <Navigation />
          <Route exact path= {routes.GUEST_PAGE} component={() => <GuestPage />} />
          <Route exact path={routes.PARALLAX} component={() => <NewPara />} />
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage  />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountSettings />} />
          <Route exact path={routes.BILLING_PAGE} component={() => <BillingPage />} />
          <Route exact path={routes.GRID_VIEW} component={() => <GridView />} />
          <Route exact path={routes.LIST_VIEW} component={() => <ListView />} />
      </div>
    </Router>
export default withAuthentication(App);