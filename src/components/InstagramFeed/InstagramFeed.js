import React, { Component } from 'react';
import '../App/App.css';
import Navigation from '../Navigation'
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/InstagramLogin';
import Sidebar from '../SideBar/SideBar2'
import { base } from '../rebaseConfig/firebase'
import withAuthentication from '../Session/withAuthentication';
import { withRouter } from 'react-router-dom'
import  withAuthorization from '../Session/withAuthorization'
class InstagramFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: true,
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
          currentUser: this.state.userProfile['3'],
          loading: false,
        })

        this.instaRef = base.syncState(`linkstasite/${this.state.authUser.user}`, {
          context: this,
          state: 'linkstasite'
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })

        base.removeBinding(this.instaRef);
      }
        }
      
      
    
    componentWillUnMount() {
      base.removeBinding(this.instafeedRef);
    }
  
  render() {
    // console.log(this.state.userProfile)
    // console.log(this.instaRef.context.state.linkstasite)
    // console.log(this.linkstasiteUserRef.context.state.userProfile)
    return (
      <div className="App">
    
     
      <MediaList medias={this.state.linkstasite}/>
        
      
        
      </div>
    );
  }
 }
 

export default withRouter(InstagramFeed)
 