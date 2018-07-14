import React from 'react';
import './Header.scss';
// import Menupanel from './Menupanel'
import  'bootstrap/dist/css/bootstrap.css';
import * as routes from '../constants/routes'
// import instaUser from '../../util/instaUser'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
// import SignOutButton from '../SignOut';
// import MicrolinkCard from 'react-microlink'
// import { Card, Col, Row } from 'reactstrap';
// import AvatarEditor from 'react-avatar-editor'
// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';
import { Link } from 'react-router-dom'
class HeaderNonAuth extends React.Component {
  render () {
    return (
     
      <div className="header">
      <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95, }} className="navbar navbar-expand-lg  fixed-top">
      
      <div className="collapse navbar-collapse" id="navbarResponsive">
     


          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
         
      <ul className="navbar-nav ml-auto float float-right" style={{paddingTop: 85}} >
      <li className="nav-link" style={{ marginTop: '-8px', marginLeft: '-85px'}}><Link to={routes.LANDING}><Icon   icon={ICONS.COMPASS} size={125} mode={"contain"} color={"gold"}/></Link></li>
      <li className="nav-link" style={{ marginTop: '-8px', marginLeft: '-64px'}}><Link to={routes.SIGN_IN}><Icon   icon={ICONS.LOGIN} size={105} mode={"contain"} color={"goldenrod"}/></Link></li>
      </ul>
           
          </div>
         
       
      
      </nav> 
      </div>
    
    );
  }
}



export default HeaderNonAuth;
