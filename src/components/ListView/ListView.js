import React, { Component } from 'react';
import '../App/App.css';
import { withRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/InstagramLogin';
import SideBar from '../SideBar/SideBar';
import withAuthentication from '../Session/withAuthentication'
import { base } from '../rebaseConfig/firebase'
class ListView extends Component {
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
  }
    componentWillUnMount() {
      base.removeBinding(this.linkstafeedRef);
    }

  render() {
    console.log(this.state.userProfile)
    console.log(this.linkstafeedRef.context.state.linkstasite)
    const linkstafeed = [...this.linkstafeedRef.context.state.linkstasite]
    
    console.log(linkstafeed)
    return (
      <div className="App">
        
       
        <MediaList medias={linkstafeed}/>
      </div>
    );
  }
}

export default withRouter(ListView);
