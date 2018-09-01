import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { base } from '../rebaseConfig/firebase'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'
import { auth } from '../rebaseConfig'
// import ReactTooltip from 'react-tooltip';
export default class DropDown extends Component {
    state = {
        userProfile: [],
        listView: false
    }
    componentDidMount = () => {
     this.userProfileRef = base.syncState('userProfile', {
          context: this,
          state: 'userProfile'
      });
      this.authenticatedRef = base.syncState('authenticated', {
          context: this,
          state: 'authenticated'
      })
    }
    setListView() {
       if (this.state.listView === false) {
           this.setState({
               listView: true
           })
       }
    }
    setGridView() {
        if (this.state.listView) {
            this.setState({
                listView: false
            })
        }
    }
    changeAuth = () => {
        this.setState({ authenticated: false });
    }
    componentWillUnmount() {
        base.removeBinding(this.userProfileRef);
        base.removeBinding(this.authenticatedRef);
    }
    

render() { 
  return (
    <UncontrolledDropdown >
      <DropdownToggle style={{width: '75%', marginTop: '35px', marginLeft: '15px'}} color="primary"  caret>
      </DropdownToggle>
      <DropdownMenu >
        <DropdownItem header>Profile: <b style={{color: 'goldenrod'}}>{this.state.userProfile.userName + ' Demo Profile' || 'user'}</b></DropdownItem>
        <DropdownItem divider />
        <DropdownItem ><Link to={routes.HOME}>Home</Link></DropdownItem>
        <DropdownItem><Link  to={routes.LIST_VIEW}>Edit Images</Link></DropdownItem>
        <DropdownItem><Link  to={routes.GRID_VIEW}>Administrative Gallery</Link></DropdownItem>
        <DropdownItem><Link  to={routes.LANDING}>Preview with Click Stats</Link></DropdownItem>
        <DropdownItem ><Link to={routes.GUEST_PAGE}>Guest Landing Page</Link></DropdownItem>
        <DropdownItem><Link to={routes.ACCOUNT}>Account Settings</Link></DropdownItem>
        <DropdownItem><Link to={routes.BILLING_PAGE}>Billing</Link></DropdownItem>
        <DropdownItem><Link to={routes.ABOUT}>Quick Guide</Link></DropdownItem>

        <DropdownItem>
            <div onClick={this.changeAuth} style={{backgroundColor: 'transparent'}}>
                <a data-tip="Stop! once logged out you cannot log in with a different instagram account without first creating a developer account and getting approval!"  onClick={auth.doSignOut}>Log Out</a>
            </div>    
        </DropdownItem>
       {/* <ReactTooltip place="right" type="dark" effect="float"/> */}
        </DropdownMenu>
    </UncontrolledDropdown>
  );
 }
} 