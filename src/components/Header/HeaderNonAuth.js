import React from 'react';
import './Header.scss';
import  'bootstrap/dist/css/bootstrap.css';
import * as routes from '../constants/routes'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import { Link } from 'react-router-dom'
import DropDown from './DropDown';
import withInstagram from '../Session/withInstagram'
import withAuthentication from '../Session/withAuthentication'
import InstagramProvider from '../Session/InstagramProvider'
import InstagramConsumer from '../Session/InstagramProvider'
import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import { InstagramLoginButton } from 'react-social-login-buttons'
// import ActionOpacity from 'material-ui/SvgIcon';
import  { db } from '../rebaseConfig';

class HeaderNonAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  check = () => {
    const { userProfile } = this.props;
    const instagramUserID =  (userProfile || {}).instagramUserID
    this.setState({
     instagramUserID: instagramUserID 
    });
    return
  }
//   updateState = (newState) => {
//   this.setState((prevState) => {
//     return { instagramUserID: [...prevState.instagramUserID, ...newState] };
//   });
// }
componentDidMount() {
  db.onceGetUsers().then(snapshot =>
    this.setState(() => ({ users: snapshot.val() }))
  ).then(() => {
  this.check();
}).catch((err) => {
  console.log('error finding instagramUserID', err)
})
}
  render () {
    
      
    
  
    
    return (
     
      <div className="header" style={{marginBottom:-70}}>
   
        <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95,}} className="navbar navbar-expand-lg  fixed-top">
        <h4 className="banner" style={{ color: 'skyblue', marginLeft: 65 }}>🅻🅸🅽🅺🆂🆃🅰🆂🅸🆃🅴</h4>
        {this.props.userProfile.proSubscription &&
         <Link to={ routes.HOME }>
           <InstagramLoginButton style={{marginLeft: 70, marginBottom: 25}}>
             <span><h3><b>Linkstasite Demo Profile</b></h3></span>
           </InstagramLoginButton></Link>
         }
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button> 
         
          <ul className="showHide navbar-nav ml-auto float float-right" style={{paddingTop: 75, overFlow: 'hidden'}} id="rightside" >

          <li className="nav-item active" data-tip="about" style={{ marginLeft: '-105px', marginRight: '215px', marginBottom: 30}}><Link to={routes.ABOUT}><span className="sr-only">(current)</span><Icon icon={ICONS.QUESTION} size={90} mode={"contain"} color={"gold"}/></Link></li>
          { !this.props.userProfile || !this.state.instagramUserID ?
            <li className="nav-item active" data-tip="home/dahsboard" style={{ marginLeft: '-225px'}}><Link to={ routes.SIGN_IN }><span className="sr-only">(current)</span><Icon icon={ ICONS.LOGIN } size={105} mode={"contain"} color={"gold"}/></Link></li>
           :<li className="nav-item active" data-tip="home/dahsboard" style={{ marginLeft: '-225px'}}><Link to={ routes.HOME }><span className="sr-only">(current)</span><Icon icon={ ICONS.HOME } size={65} mode={"contain"} color={"gold"}/></Link></li>
          }
          
          </ul> 
        </div>
     
      </nav> 
    
     
    </div>
     
    );
  }
}
// const authCondition = (authUser) => !!authUser;

export default withInstagram(HeaderNonAuth);
