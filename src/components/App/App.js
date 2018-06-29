import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/instagramLogin';

import { base } from '../rebaseConfig/config'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkstasite: [],
      userProfile: [],
      accountName:'' 
    };
  }


  componentDidMount() {
    InstagramLogin.display().then(instagramUser => this.setState({
          linkstasite: instagramUser,
          userProfile: [instagramUser.id, instagramUser.profilePic, instagramUser.userName, instagramUser.instagramUserID],
          accountName: instagramUser.userName
        })
      );
    }

    componentWillMount() {
      this.linkstafeedRef = base.syncState('linkstasite', {
        context: this,
        state: 'linkstasite',
        asArray: true
    })
  }
    componentWillUnMount() {
      base.removeBinding(this.linkstafeedRef);
    }

  render() {
    return (
      <div className="App">
        <Header accountName={this.state.accountName}/>
        <MediaList medias={this.linkstafeedRef.context.state.linkstasite}/>
      </div>
    );
  }
}

export default App;
