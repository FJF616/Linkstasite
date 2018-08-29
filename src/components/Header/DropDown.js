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
      base.syncState('userProfile', {
          context: this,
          state: 'userProfile'
      });
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
render() { 
  return (
    <UncontrolledDropdown >
      <DropdownToggle style={{width: '75%', marginTop: '35px', marginLeft: '15px'}} color="primary"  caret>
      </DropdownToggle>
      <DropdownMenu >
        <DropdownItem header>Profile: <b style={{color: 'goldenrod'}}>{this.state.userProfile.userName  || 'user'}</b></DropdownItem>
        <DropdownItem divider />
        <DropdownItem ><Link to={routes.HOME}>Home</Link></DropdownItem>
        <DropdownItem><Link  to={routes.LIST_VIEW}>Edit Images</Link></DropdownItem>
        <DropdownItem><Link  to={routes.GRID_VIEW}>Gallery</Link></DropdownItem>
        <DropdownItem><Link to={routes.ACCOUNT}>Account Settings</Link></DropdownItem>
        <DropdownItem><Link to={routes.BILLING_PAGE}>Billing</Link></DropdownItem>
        <DropdownItem><a data-tip="Stop! once logged out you cannot log in with a different instagram account without first creating a developer account and getting approval!" disabled={true} onClick={auth.doSignOut}>Log Out</a></DropdownItem>
       {/* <ReactTooltip place="right" type="dark" effect="float"/> */}
        </DropdownMenu>
    </UncontrolledDropdown>
  );
 }
} 