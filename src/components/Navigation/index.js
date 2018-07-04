import React from 'react';
import { Link } from 'react-router-dom';
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import  'bootstrap/dist/css/bootstrap.css';
import './Navigation.scss'

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>

      <nav style={{backgroundColor: 'rgba(86, 59, 136, 55%)', height: 110, position: 'relative'}} className="navbar navbar-expand-lg  fixed-top">
        
      <div className="collapse navbar-collapse" id="navbarResponsive">
     


      <ol class="breadcrumb" aria-label="Left Align">
      <li class="breadcrumb-item active" aria-current="page">Home</li>

        <li class="breadcrumb-item"><Link to={routes.BILLING}>Billing</Link></li>
        <li class="breadcrumb-item"><Link to={routes.ACCOUNT}>Account Settings</Link></li>
        <li class="breadcrumb-item"><Link to={routes.LIST_VIEW}>List View</Link></li>
        <li class="breadcrumb-item"><Link to={routes.GRID_VIEW}>Grid View</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Pictures</li>
      </ol>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
         
      <ul className="navbar-nav ml-auto float float-right" style={{paddingTop: 85}} >
          <li className="nav-link" style={{ marginTop: '-10px', marginLeft: '-55px'}}><Link to={routes.LANDING}><Icon   icon={ICONS.COMPASS} size={125} mode={"contain"} color={"lime"}/></Link></li>
          <li className="nav-item active" style={{ marginTop: '-2px', marginLeft: '-55px'}}><Link to={routes.HOME}><span className="sr-only">(current)</span><Icon icon={ICONS.HOME} size={65} mode={"contain"} color={"gold"}/></Link></li>
          <li  className="nav-item" style={{ marginLeft: '5px'}}><Link to={routes.ACCOUNT}><Icon   icon={ICONS.INTERNET} size={125} mode={"contain"} color={"aquamarine"}/></Link></li>
          <li className="nav-item" style={{marginLeft: '-55px'}}><SignOutButton /></li>
        </ul>
        </div>
      </nav>



const NavigationNonAuth = () =>
    <nav style={{backgroundColor: 'rgba(86, 59, 136, 55%)', height: 110, position: 'relative'}} className="navbar navbar-expand-lg  fixed-top">
      <ul className="navbar-nav ml-auto float float-right" style={{paddingTop: 85}} >
       <li className="nav-link" style={{ marginTop: '-10px', marginLeft: '-55px'}}><Link to={routes.LANDING}><Icon   icon={ICONS.COMPASS} size={125} mode={"contain"} color={"lime"}/></Link></li>
        <li className="nav-link" style={{ marginTop: '-10px', marginLeft: '-55px'}}><Link to={routes.SIGN_IN}><Icon   icon={ICONS.LOGIN} size={105} mode={"contain"} color={"blue"}/></Link></li>
      </ul>
    </nav>
export default Navigation;