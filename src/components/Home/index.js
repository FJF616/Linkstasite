import React, { Component } from 'react';
import Plot from '../Graph/Plot';
import Bar from '../Graph/Bar';
import InstagramLogin from '../../util/InstagramLogin';
// import ProgressBar from '../Graph/ProgressBar';
// import{ BrowserRouter } from 'react-router-dom';
// import Header from '../Header/Header';
import Graph from '../Graph/Graph'
import MarkSeries from '../Graph/MarkSeries';
// import InstagramLogin from '../../util/InstagramLogin'
import withAuthorization from '../Session/withAuthorization';
import  { db } from '../rebaseConfig';
import SideBar2 from '../SideBar/SideBar2';
// import { base } from '../rebaseConfig/firebase';
// import InstagramConsumer from '../Session/InstagramProvider'
// import AvatarEditor from 'react-avatar-editor'
import Header from '../Header/Header'
// import ClickGraph from '../Graph/ClickGraph'
// import EditableTable from '../FormInputs/EditableTable'
import { base } from '../rebaseConfig/firebase';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      gallery: [] ,
      slides: [],   
      userProfile:[],
      proGallery:[],
      newGallery:{}
    };
  }
  
  
  componentWillMount() {
    try {
      base.bindToState('imageUrls', {
        context: this,
        state: 'image'
      })
    } catch (error) {
      console.log('no imageUrls database!!')
    }
    
      this.bitlyDataRef = base.syncState('bitlyData', {
        context: this,
        state: 'graphData'
      })
   
    
  
  //   this.proGalleryRef = base.syncState('linkstasite', {
  //     context: this,
  //     state: 'proGallery'
  //   });

  //   this.galleryRef = base.syncState('gallery', {
  //     context: this,
  //     state: 'gallery'
  //   });
  //   this.slidesRef = base.syncState('slides', {
  //     context: this,
  //     state: 'slides'
  //   });
  //   this.userRef = base.syncState('userProfile', {
  //     context: this,
  //     state: 'userProfile',
  //     // asArray: true
  //   });
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    InstagramLogin.fetchUserInfo().then(instagramUser => this.setState ({
      // gallery: instagramUser.gallery,
      // slides: instagramUser.slides,
      // userProfile: instagramUser.user['0'],
      // instagramUserID: instagramUser.user.instagramUserID,
      image: instagramUser.image
    }))
    .catch(error => {
      if(error) {
        console.log('error fetching instagramUser', error);
      };
    })
  }
  componentWillUnmount() {
    base.removeBinding(this.bitlyDataRef);
  }
  render() {
    // const { users } = this.state;
    return (
      <div style={{backgroundColor: 'paleturquoise'}}>
      <div className="App" >
        <div className="home__page">
          <Header />
          <SideBar2/>
          <MarkSeries/>
          <Bar graphData={this.state.graphData}/>
          <Graph/>
          <Plot/>
        </div>
       </div>
      </div>
    );
  }
}

// {/*const UserList = ({ users }) =>
//   <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key =>
//       <div key={key}>{users[key].username}</div>
//     )}
//   </div>
//   */}
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);