import React from 'react';
import './Header.scss';
import Menupanel from './Menupanel'
import  'bootstrap/dist/css/bootstrap.css';
import * as routes from '../constants/routes'
// import instaUser from '../../util/instaUser'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import SignOutButton from '../SignOut';
// import MicrolinkCard from 'react-microlink'
import { Card, Col, Row } from 'reactstrap';
import AvatarEditor from 'react-avatar-editor'
// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';
import { Link } from 'react-router-dom'
import { base } from '../rebaseConfig/firebase'
import DropDown from './DropDown'
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
class Header extends React.Component {
  state = {
    userProfile: []
  }
  componentDidMount = () => {
    base.syncState('userProfile', {
      context: this,
      state: 'userProfile'
    })
  }
  
  render () {
    return (
     
      <div className="header">
      <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95, }} className="navbar navbar-expand-lg  fixed-top">
      
      <div className="collapse navbar-collapse" id="navbarResponsive">
      <div  className="navbar  float float-left"  aria-label="Left Align">
          <Card className="profile"  >
          <Row className="profile__container">
           
              <AvatarEditor className="avatar__img"
              image={this.state.userProfile.profilePic}
              width={55}
              height={55}
              border={6}
              color={[185, 253, 255, 0.074]} // RGBA
              scale={1.25}
              rotate={1}
              /> 
              <Col style={{backgroundColor: 'transparent'}}> 
              <DropDown />
              </Col>
            {/* <div >
             <h5> <p><b className="userId" >{this.props.medias['2']}</b></p></h5> 
                 
            </div>   */}              
          </Row>
          
         
          
        </Card>
      </div>
     
      
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
         
      <ul className="navbar-nav ml-auto float float-right" style={{paddingTop: 85, overFlow: 'hidden'}} >
         
          <li className="nav-item active" style={{ marginTop: '-2px', marginLeft: '-55px'}}><Link to={routes.HOME}><span className="sr-only">(current)</span><Icon icon={ICONS.HOME} size={65} mode={"contain"} color={"gold"}/></Link></li>
          <li  className="nav-item" style={{ marginLeft: '5px'}}><Link to={routes.ACCOUNT}><Icon   icon={ICONS.INTERNET} size={125} mode={"contain"} color={"gold"}/></Link></li>
          <li className="nav-item" style={{marginLeft: '-65px'}}><SignOutButton /></li>
        </ul>
           
          </div>
     
     
       
      
      </nav> 
      </div>
    
    );
  }
}



export default Header;
