import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import MediaList from '../MediaList/MediaList.js';
import InstagramLogin from '../../util/instagramLogin';

import { app, base } from '../rebaseConfig/config'
function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}

function ShowRoute({component: Component, items, param, ...rest}) {
  return (
    <Route
      {...rest}
      render={({match, ...props}) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )
        }

        const item = items[match.params[param]]
        if (item) {
          return <Component item={item} {...props} match={match} {...rest}/>
        } else {
          return <h1>Not Found</h1>
        }
      }}
    />
  )
}




class App extends Component {
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
      this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        })

        this.instaRef = base.syncState(`linkstasite/${user.uid}`, {
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
        });
      
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
      <BrowserRouter>
      <div>
      <Header medias={this.state.userProfile} authenticated={this.state.authenticated} />
        <div className="main-content" style={{padding: "1em"}}>
          <div className="workspace">
            <Route exact path="/login" render={(props) => {
              return <Login setCurrentUser={this.setCurrentUser} {...props} />
            }} />
            <Route exact path="/logout" component={Logout} />
            <AuthenticatedRoute
                  exact
                  path="/pictures"
                  authenticated={this.state.authenticated}
                  component={MediaList}
                  gallery={this.state.linkstasite} />
                <ShowRoute
                  path="/pictures/gridview"
                  component={MediaGrid}
                  authenticated={this.state.authenticated}
                  requireAuth={true}
                  param="songId"
                  />
              </div>
            </div>
          </div>
        </BrowserRouter>  
        
      </div>
    );
  }
}

export default App;
