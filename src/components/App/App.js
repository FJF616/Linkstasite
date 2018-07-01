import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
// import TitleBarGridList from '../GridList/GridList'
import InstagramLogin from '../../util/instagramLogin';
import SideBar from '../SideBar/SideBar';
import { base } from '../rebaseConfig/config'
import MediaList from '../MediaList/MediaList'
import MediaGrid from '../MediaList/MediaGrid'
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
          linkstasite: instagramUser.gallery,
          userProfile: [instagramUser.user['0'].access_token, instagramUser.user['0'].profilePic, instagramUser.user['0'].userName, instagramUser.user['0'].instagramUserID],
          accountName: instagramUser.user['0'].userName,
          
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
        asArray: true
    });
  }
    componentWillUnMount() {
      base.removeBinding(this.linkstafeedRef);
    }

  render() {
    console.log(this.state.userProfile)
    // console.log(this.linkstafeedRef.context.state.linkstasite)
    const linkstafeed = [...this.linkstafeedRef.context.state.linkstasite]
    console.log(linkstafeed)
    return (
      <div className="App">
        <SideBar/>
        <MediaList medias={linkstafeed}/>
        <Header medias={this.state.userProfile}/>
      
      </div>
    );
  }
}

export default App;
