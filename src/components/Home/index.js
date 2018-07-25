import React, { Component } from 'react';
import InstagramLogin from '../../util/InstagramLogin';
// import ProgressBar from '../Graph/ProgressBar';
// import{ BrowserRouter } from 'react-router-dom';
// import Header from '../Header/Header';
import Graph from '../Graph/Graph'
// import InstagramLogin from '../../util/InstagramLogin'
import withAuthorization from '../Session/withAuthorization';
import  { firebase, auth, db } from '../rebaseConfig';
import SideBar2 from '../SideBar/SideBar2';
// import { base } from '../rebaseConfig/firebase';
// import InstagramConsumer from '../Session/InstagramProvider'
// import AvatarEditor from 'react-avatar-editor'
import Header from '../Header/Header'
// import ClickGraph from '../Graph/ClickGraph'
// import EditableTable from '../FormInputs/EditableTable'
import { base } from '../rebaseConfig/firebase';
import Bitlink from '../../util/BitlyHelper'
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      gallery: [] ,
      slides: [],   
      userProfile:[],
      proGallery:[],
    };
  }

  
  
  componentWillMount() {
    this.proGalleryRef = base.syncState('linkstasite', {
      context: this,
      state: 'proGallery'
    });
    this.galleryRef = base.syncState('gallery', {
      context: this,
      state: 'gallery'
    });
    this.slidesRef = base.syncState('slides', {
      context: this,
      state: 'slides'
    });
    this.userRef = base.syncState('userProfile', {
      context: this,
      state: 'userProfile',
      // asArray: true
    });
 
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    InstagramLogin.fetchUserInfo().then(instagramUser => this.setState ({
      gallery: instagramUser.gallery,
      slides: instagramUser.slides,
      userProfile: instagramUser.user['0'],
      instagramUserID: instagramUser.user.instagramUserID,
      image: instagramUser.image
    }));
    Bitlink.fetchClicks(`http://bit.ly/2L9BFIy`).then(clicks => this.setState({
      clicks: clicks.link_clicks,
      clickData: clicks
    }))

  }
  // componentWillUnmount() {
    // base.removeBinding(this.galleryRef);
    // base.removeBinding(this.slidesRef);
    // base.removeBinding(this.userRef);
    // base.removeBinding(this.proGalleryRef)
  // }
  

  render() {
    const { users } = this.state;

    return (
      <div className="App" >
      <div className="home__page">
     
     <Header/>
      <SideBar2/>
     <Graph/>
 
      </div>
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