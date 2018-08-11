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
import GraphContext from '../Session/GraphContext';
import GraphProvider from '../Session/GraphProvider';
// import ShortenLink from '../../util/Bitly';
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
   render() {
    // const { users } = this.state;
    return (
      <GraphProvider>
        <GraphContext.Consumer>
        { (value ) =>
      
          <div className="App" >
            <div className="home__page">
              <Header />
              <SideBar2/>
              <MarkSeries/>
                <Bar graphData={value.graphData} />    
              <Graph/>
              <Plot/> 
            </div>
            
        </div>
      
      }
      </GraphContext.Consumer>
    </GraphProvider>  
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