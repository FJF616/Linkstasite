import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { base } from '../rebaseConfig/firebase'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'
import { auth } from '../rebaseConfig'
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
        <DropdownItem><Link onClick={this.setListView.bind(this)} to={routes.LIST_VIEW}>Edit Images</Link></DropdownItem>
        <DropdownItem><Link onClick={this.setGridView.bind(this)} to={routes.GRID_VIEW}>Gallery</Link></DropdownItem>
        <DropdownItem><Link to={routes.ACCOUNT}>Account Settings</Link></DropdownItem>

        <DropdownItem><a onClick={auth.doSignOut}>Log Out</a></DropdownItem>
     </DropdownMenu>
    </UncontrolledDropdown>
  );
 }
} 