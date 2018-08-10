import React from 'react';
import './Header.scss';
import  'bootstrap/dist/css/bootstrap.css';
import * as routes from '../constants/routes'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import { Link } from 'react-router-dom'
// import ActionOpacity from 'material-ui/SvgIcon';
class HeaderNonAuth extends React.Component {
  render () {
    return (
      <div className="header" style={{marginBottom:-70}}>
      
        <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95,}} className="navbar navbar-expand-lg  fixed-top">
        <h2 style={{color: 'skyblue', marginLeft: 65 }}><b>𝓣𝓱𝓪𝓷𝓴 𝔂𝓸𝓾 𝓯𝓸𝓻 𝓿𝓲𝓼𝓲𝓽𝓲𝓷𝓰 𝓛𝓲𝓷𝓴𝓼𝓽𝓪𝓢𝓲𝓽𝓮 !!</b></h2>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button> 
          <ul className="showHide navbar-nav ml-auto float float-right" style={{paddingTop: 85, overFlow: 'hidden'}} id="rightside" >
            <li className="nav-link" style={{ marginTop: '-8px', marginLeft: '-85px'}}><Link to={routes.LANDING}><Icon   icon={ICONS.COMPASS} size={125} mode={"contain"} color={"darkorchid"}/></Link></li>
            <li className="nav-link" style={{ marginTop: '-8px', marginLeft: '-64px'}}><Link to={routes.SIGN_IN}><Icon   icon={ICONS.LOGIN} size={105} mode={"contain"} color={"darkorchid"}/></Link></li>
          </ul> 
        </div>
      </nav> 
    </div>
    );
  }
}
export default HeaderNonAuth;
