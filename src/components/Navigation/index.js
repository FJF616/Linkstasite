import React from 'react';
import AuthUserContext from '../Session/AuthUserContext';
import  'bootstrap/dist/css/bootstrap.css';
import './Navigation.scss'
import InstagramProvider from '../Session/InstagramProvider';
import InstagramConsumer from '../Session/InstagramProvider'
import HeaderNonAuth from '../Header/HeaderNonAuth'
import HomePage from '../Home'
const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth/>
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <InstagramProvider>
      <InstagramConsumer>
          { (userProfile, proSubscription) =>  <HomePage userProfile={{ state: {userProfile, proSubscription} }}/> }
      </InstagramConsumer>
      </InstagramProvider>
const NavigationNonAuth = () =>
      <HeaderNonAuth />
      
     
export default Navigation;