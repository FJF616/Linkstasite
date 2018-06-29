import React, { Component } from 'react';
import './App.css';
import { base } from '../rebaseConfig'
import Header from '../Header/Header.js';
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/InstagramLogin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkstasite: [],
      userProfile: {}
    };
  }


  componentDidMount() {
    InstagramLogin.fetchUser()
      .then(InstagramUser => {
        this.setState({
          linkstasite: InstagramUser,
          userProfile: InstagramUser['0']
        });
      });
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
        <MediaList medias={this.this.linkstafeedRef.context.state.linkstasite}/>
      </div>
    );
  }
}

export default App;
