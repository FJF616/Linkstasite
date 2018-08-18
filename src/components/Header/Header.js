import React from 'react';
import './Header.scss';
import { NavItem } from 'mdbreact'
// import Menupanel from './Menupanel'
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
import Delay from 'react-delay';
import withInstagram from '../Session/withInstagram'
import { InstagramLoginButton } from 'react-social-login-buttons';

// import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import InstagramConsumer from '../Session/InstagramProvider';
// import ShortenLink from '../../util/Bitly'
class Header extends React.Component {
  state = {
   
    userProfile: [],
    subscriptionData: {},
    // auth: true,
    // anchorEl: null,
  }
    checkSubscriptionStatus() {
   this.state.subscriptionData
      ?  this.setState({ proSubscription: true }) 
      :  this.stripeRef = base.listenTo('stripe', {
          context: this,
          state: 'stripe',
            then(subscriptionData) {
            if(subscriptionData !== null) {
                this.setState({ subscriptionData })
            } else {
              console.log('failed to get subscription status')
            }
          }
        })
    }
  componentDidMount = () => {
    this.userProfileRef = base.syncState('userProfile', {
      context: this,
      state: 'userProfile',
      // asArray: true
    });
    this.checkSubscriptionStatus();
      
  }
  componentWillUnmount() {
    base.removeBinding(this.userProfileRef);
    // base.removeBinding(this.stripeRef);
  }
  // handleMenu = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };
  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };
  render () {
    // const { classes } = this.props;
    // const { auth, anchorEl } = this.state;
    // const open = Boolean(anchorEl);
    return (
      <div className="header">
      <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95, marginBottom: 55 }} className="navbar navbar-expand-lg  fixed-top">
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
          </Row>  
        </Card>{
          this.state.proSubscription
          ? <div id="leftside">
                <InstagramLoginButton style={{paddingLeft: 30, marginLeft: 245, width: 265, height:50}} >
                <span><h3>𝕘𝕖𝕥 𝕚𝕞𝕒𝕘𝕖𝕤</h3></span>
               </InstagramLoginButton>
            </div>
          :
          null
        }
        
          </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <ul className="showHide navbar-nav ml-auto float float-right" style={{paddingTop: 85, overFlow: 'hidden'}} id="rightside" >
            <NavItem className="nav-item active" style={{ marginTop: '-2px', marginLeft: '-55px'}}><Link to={routes.HOME}><span className="sr-only">(current)</span><Icon icon={ICONS.HOME} size={65} mode={"contain"} color={"gold"}/></Link></NavItem>
            <NavItem  className="nav-item" style={{ marginLeft: '5px'}}><Link to={routes.GUEST_PAGE}><Icon   icon={ICONS.INTERNET} size={125} mode={"contain"} color={"gold"}/></Link></NavItem>
            <NavItem className="nav-item" style={{marginLeft: '-65px'}}><SignOutButton /></NavItem>
          </ul>
        </nav> 
      </div>
    );
  }
}



export default withInstagram(Header);
