
  import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import InstagramFeed from '../InstagramFeed/InstagramFeed'
import ListView from '../ListView/ListView'
import MediaGrid from '../MediaList/MediaGrid'
import Billing from '../Billing/Billing'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../constants/routes';
import InstagramProvider from '../Session/InstagramProvider'
const App = () =>

  <Router>
    <div>
      <Navigation />

      <hr/>
      <InstagramProvider>
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.BILLING} component={() => <Billing />} />
      <Route exact path={routes.GRID_VIEW} component={() => <MediaGrid />} />
      <Route exact path={routes.LIST_VIEW} component={() => <ListView />} />
      
      <Route exact path={routes.INSTAGRAM_FEED} component={() => <InstagramFeed />} />
      </InstagramProvider>
    </div>
  </Router>

export default withAuthentication(App);