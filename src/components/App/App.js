import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/instagramLogin';
import SideBar from '../SideBar/SideBar';
import { base } from '../rebaseConfig/config'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkstasite: [],
      userProfile: [],
      accountName:'loading' 
    };
  }


  componentDidMount() {
    InstagramLogin.fetchUserInfo().then(instagramUser => this.setState({
          linkstasite: instagramUser,
          userProfile: [instagramUser['0'].access_token, instagramUser['0'].profilePic, instagramUser['0'].userName, instagramUser['0'].instagramUserID],
          accountName: instagramUser['0'].userName,
          
        })).catch(error => {
          if (error) {
            console.log("error fetching instagramUser")
          }
      });
    }

    componentWillMount() {
      this.linkstafeedRef = base.syncState('linkstasite', {
        context: this,
        state: 'linkstasite',
        
    });
      // this.linkstasteUserRef = base.syncState('userProfile', {
      //   context: this,
      //   state: 'userProfile',
      //   asArray : true
      // });
  }
    componentWillUnMount() {
      base.removeBinding(this.linkstafeedRef);
    }

  render() {
    console.log(this.state.userProfile)
    console.log(this.linkstafeedRef.context.state.linkstasite)
    // console.log(this.linkstasiteUserRef.context.state.userProfile)
    return (
      <div className="App">
        <SideBar/>
        
        <Header medias={this.state.userProfile}/>
        <MediaList medias={this.linkstafeedRef.context.state.linkstasite}/>
      </div>
    );
  }
}

export default App;
