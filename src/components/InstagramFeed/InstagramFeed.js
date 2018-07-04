import React, { Component } from 'react';
import './App.css';
import Navigation from '../Navigation'
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/InstagramLogin';
import Sidebar from '../SideBar/SideBar'
import { base } from '../rebaseConfig/config'
import withAuthentication from '../Session/withAuthentication';


class InstagramFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      linkstasite: [],
      userProfile: [],
      accountName:'loading' 
    };
  }
  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
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
     
      
      if (this.state.authUser) {
        this.setState({
          authenticated: true,
          // currentUser: instagramUser['0'].instagramUserID,
          loading: false,
        })

      //   this.instaRef = base.syncState(`linkstasite/${user.uid}`, {
      //     context: this,
      //     state: 'linkstasite'
      //   });
      // } else {
      //   this.setState({
      //     authenticated: false,
      //     currentUser: null,
      //     loading: false,
      //   })

        base.removeBinding(this.instaRef);
      }
        }
      
      
    
    componentWillUnMount() {
      base.removeBinding(this.instafeedRef);
    }
  
  render() {
    console.log(this.state.userProfile)
    console.log(this.instaRef.context.state.linkstasite)
    // console.log(this.linkstasiteUserRef.context.state.userProfile)
    return (
      <div className="App">
    
     <Navigation/>
     <Sidebar/>
      <MediaList medias={this.state.linkstasite}/>
        
      
        
      </div>
    );
  }
 }
 export default withAuthentication(InstagramFeed);