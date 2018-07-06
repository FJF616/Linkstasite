import React, { Component } from 'react';
import '../App/App.css'
// import{ BrowserRouter } from 'react-router-dom';
// import Header from '../Header/Header';

// import InstagramLogin from '../../util/InstagramLogin'
import withAuthorization from '../Session/withAuthorization';
import { db } from '../rebaseConfig';
import SideBar2 from '../SideBar/SideBar';
// import { base } from '../rebaseConfig/firebase';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {}
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div className="App">
      <SideBar2/>
       {/* <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

       { !!users && <UserList users={users} /> }}*/}
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);