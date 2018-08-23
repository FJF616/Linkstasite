import React, { Component } from 'react';
import Plot from '../Graph/Plot';
import Bar from '../Graph/Bar';
// import InstagramLogin from '../../util/InstagramLogin';
// import ProgressBar from '../Graph/ProgressBar';
// import{ BrowserRouter } from 'react-router-dom';
// import Header from '../Header/Header';
import Graph from '../Graph/Graph'
import MarkSeries from '../Graph/MarkSeries';
import InstagramLogin from '../../util/InstagramLogin'
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
import Pie from '../Graph/Pie';
import Line from '../Graph/Line';
// import SubscriptionProvider from '../Session/SubscriptionProvider';
// import SubscriptionConsumer from '../Session/SubscriptionProvider';
// import InstagramImages from '../PhotoPicker/InstagramImages';
// import Delay from 'react-delay';
// import ShortenLink from '../../util/Bitly';
// import merge from 'deepmerge';

import withInstagram from '../Session/withInstagram';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // users: {},
      // accountStatus:'trial',
      // userProfile:{},
      // image:{},
      // proGallery:{}
    };
    
  }
   componentWillMount() {
    try {
      base.bindToState('imageUrls', {
        context: this,
        state: 'image',
        asArray: true
      })
      
    } catch (error) {
      console.log('no imageUrls database!!')
    }
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
  // }

  getPro() {
      InstagramLogin.getUserMedia(20).then(proGallery => this.setState({ proGallery }))    
  }  
  getTrial(){
    console.log('instagram user does not exist, please log into instagram before using linkstasite')
    InstagramLogin.getUserMedia(6).then(instagramUser => this.setState ({
      gallery: instagramUser.gallery,
      slides: instagramUser.slides,
      userProfile: instagramUser.user['0'],
      instagramUserID: instagramUser.user.instagramUserID,
      // image: instagramUser.image
    }))
    .catch(error => {
      if(error) {
        console.log('error fetching instagramUser', error);
      };
    })
  }
  getData = async () => {
    await base.fetch('userProfile', {
      context: this,
    })
    .then((data) => {
        this.setState({ userProfile: data })
        const { userProfile } = this.state;
          if (userProfile.hasOwnProperty('proSubscription') || userProfile.proSubscription === true) {
            this.setState({accountStatus: 'pro'})
          
          }
       
    })
  }
   
  componentDidMount() {
    
    // this.instaDialog.showDialog();
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
   
   .catch(err => {
      console.log('user galleries dont exist', err)
    })
  
  }
  
   render() {
    // const { users } = this.state;
    return (
  
      <GraphProvider>
        <GraphContext.Consumer>
        { (value ) =>
      
          <div className="App" style={{position: 'fixed', overflowY: 'scroll'}}>
            <Header />
              <SideBar2  /> 
             
              {/*<InstagramImages/>*/}
              <div className="home__page" >
              <div style={{marginTop: 25}} >
              <p><h1><b>Dashboard</b></h1>
              <ul>
                <li>affiliate link analytics</li>
                <li>keep track of your most active links</li>
                <li>data graphs updated in realtime</li>
                <li>total amount of clicks shown per link</li>
                <li>each is link customised without duplicates</li>
                <li><i>More features to come!</i></li>
              </ul></p></div>
              <div style={{position: 'relative', display: 'inlineBlock'}}>
             
                
            <Pie data-tip="total clicks per links" graphData={value.graphData} />
              <Line graphData={value.graphData}/>
            </div>
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
export default withAuthorization(authCondition)(withInstagram(HomePage));