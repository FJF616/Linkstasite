import React from 'react';
// import { Link } from 'react-router-dom';
// import ICONS from '../Icons/constants'
// import Icon from '../Icons/Icon'
import AuthUserContext from '../Session/AuthUserContext';
// import SignOutButton from '../SignOut';
// import * as routes from '../constants/routes';
import  'bootstrap/dist/css/bootstrap.css';
import './Navigation.scss'
import InstagramConsumer from '../Session/InstagramProvider'
// import AvatarEditor from 'react-avatar-editor'
// import { Card, Col, Row } from 'reactstrap';
import HeaderNonAuth from '../Header/HeaderNonAuth'
import Header from '../Header/Header'
import LandingPage from '../Landing/index'
const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth/>
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>

    <InstagramConsumer>
      { userProfile => { 
        return (
         
        <LandingPage value={{state: userProfile}} />
       
      )}
      }
    </InstagramConsumer>

const NavigationNonAuth = () =>
   <HeaderNonAuth />
export default Navigation;