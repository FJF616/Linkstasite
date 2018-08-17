import React from 'react';
import AuthUserContext from '../Session/AuthUserContext';
import  'bootstrap/dist/css/bootstrap.css';
import './Navigation.scss'
import InstagramProvider from '../Session/InstagramProvider';
import InstagramConsumer from '../Session/InstagramProvider'
import HeaderNonAuth from '../Header/HeaderNonAuth'
import HomePage from '../Home'
// import SubscriptionProvider from '../Session/SubscriptionProvider'
// import SubscriptionConsumer from '../Session/SubscriptionProvider'
const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth authUser={authUser}/>
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>

    <InstagramProvider >
      <InstagramConsumer>
          { (userProfile, trialGallery, proGallery, userName) =>  <HomePage userProfile={{ state: {userProfile, trialGallery, proGallery, userName } }} /> }
      </InstagramConsumer>
    </InstagramProvider>
 

const NavigationNonAuth = () =>
      <HeaderNonAuth />
      
     
export default Navigation;