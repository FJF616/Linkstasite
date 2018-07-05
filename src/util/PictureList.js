import React from 'react';
const createReactClass = require('create-react-class');
const redirectURI = "http://localhost:3000/";
const client_id = "0d744e65869b4acc8dde4d6e3c6a58e2";
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;

// const serviceAccount = require('./service-account.json');
// const admin = require('firebase-admin');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${serviceAccount.porject_id}.firebaseio.com`
// });
let accessToken;
let jsonResponse;
let instagramUser = {
  user: {},
  gallery:{},
};


/**
 *   This method uses the implicit authorization flow which is less secure than the explicit (server-sided) 
 *   authorization flow, however, it does not require server sided authentication.  We will rely on firebase
 *   for that.
 */




const InstagramLogin = {
    getAccessToken() {
      if (accessToken) {
        return new Promise(resolve => resolve(accessToken));
      }
      const Match = window.location.href.match(/access_token=([^&]*)/);
      if (Match) {
        //set access token to regex match group
        accessToken = Match[1];
        return accessToken;
      } else {
        //use redirect instead of popup window
       window.location = auth_url;
      }
    },
    async fetchUserInfo() {
      if (!accessToken) {
        this.getAccessToken();
      }
      const token_url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`;
      try {
        let response = await fetch(token_url, {
          method: 'GET'
        });
        if (response.ok) {
          console.log(response);
          jsonResponse = await response.json();
          instagramUser.user = jsonResponse.data.map(info => ({
            id: info.id,
            // image: info.images.standard_resolution.url,
            instagramUserID: info.user.id,
            url: info.link,
            title: info.caption ? info.caption.text : '',
            profilePic: info.user.profile_picture,
            userName:info.user.full_name,
            favorite: false,
            access_token: `${accessToken}`,
            likes: info.likes.count,
            tags: info.tags
          }));
            instagramUser.gallery = jsonResponse.data.map(info => ({
              src: info.images.standard_resolution.url,
              title: info.caption ? info.caption.text : '',
              id: info.id,
              url: info.link, 
              favorite: false     
                    
              // affiliateLink: '',
            }));
              return instagramUser;
        }
        throw new Error('Request failed!');
      } catch (error) {
        console.log(error);
      }
      
    }
};

 var Picture = createReactClass({

    // This component doesn't hold any state - it simply transforms
    // whatever was passed as attributes into HTML that represents a picture.

    clickHandler: function(e){
        
        // When the component is clicked, trigger the onClick handler that 
        // was passed as an attribute when it was constructed:
        console.log(e.target)
        this.props.onClick(e.target.ref);
    },

    render: function(){

       let cls = 'picture ' + (this.props.favorite ? 'favorite' : '');

        return (

            <div className={cls} onClick={this.clickHandler}>
                <img src={this.props.src} width="200" title={this.props.title} alt='1'/>
            </div>

        );

    }

});

var PictureList = createReactClass({

    getInitialState: function(){
        
        // The pictures array will be populated via AJAX, and 
        // the favorites one when the user clicks on an image:
        
        return { pictures: [], favorites: [] };
    },

    componentDidMount: function(){
        
        // When the component loads, send a jQuery AJAX request

        var self = this;
        InstagramLogin.fetchUserInfo().then(instagramUser => self.setState({
            pictures: [...instagramUser.gallery]
        }));
        // API endpoint for Instagram's popular images for the day

      

            //  pictures = result.data.map(function(p){

            //     return { 
            //         id: p.id, 
            //         url: p.link, 
            //         src: p.images.low_resolution.url, 
            //         title: p.caption ? p.caption.text : '', 
            //         favorite: false 
            //     };

            // });

            // Update the component's state. This will trigger a render.
            // Note that this only updates the pictures property, and does
            // not remove the favorites array.

            // self.setState({ pictures: pictures });

        

    },

    pictureClick: function(id){

        // id holds the ID of the picture that was clicked.
        // Find it in the pictures array, and add it to the favorites

           const favorites = [...this.state.favorites],
            pictures = [...this.state.pictures];

        for(let i = 0; i < pictures.length; i++){

            // Find the id in the pictures array

            if(pictures[i].id === id) {                  
                console.log(pictures[i])
                if(pictures[i].favorite){
                    return this.favoriteClick(id);
                }

                // Add the picture to the favorites array,
                // and mark it as a favorite:

                favorites.push(pictures[i]);
                pictures[i].favorite = true;

                break;
            }

        }

        // Update the state and trigger a render
        this.setState({pictures: pictures, favorites: favorites});

    },

    favoriteClick: function(id){

        // Find the picture in the favorites array and remove it. After this, 
        // find the picture in the pictures array and mark it as a non-favorite.

        var favorites = [...this.state.favorites],
            pictures = [...this.state.pictures];


        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].id === id) break;
        }

        // Remove the picture from favorites array
        favorites.splice(i, 1);


        for(i = 0; i < pictures.length; i++){
            if(pictures[i].id === id) {
                pictures[i].favorite = false;
                break;
            }
        }

        // Update the state and trigger a render
        this.setState({pictures: pictures, favorites: favorites});

    },

    render: function() {
        console.log(this.state.pictures)
        var self = this;

        var pictures = this.state.pictures.map(function(p){
            return <Picture key={p.id} ref={p.id} src={p.src} title={p.title} favorite={p.favorite} onClick={self.pictureClick} />
        });

        if(!pictures.length){
            pictures = <p>Loading images..</p>;
        }

        var favorites = this.state.favorites.map(function(p){
            return <Picture key={p.id} ref={p.id} src={p.src} title={p.title} favorite={true} onClick={self.favoriteClick} />
        });

        if(!favorites.length){
            favorites = <p>Click an image to mark it as a favorite.</p>;
        }

        return (

            <div>
                <h1>Popular Instagram pics</h1>
                <div className="pictures"> {pictures} </div>
                    
                <h1>Your favorites</h1>
                <div className="favorites"> {favorites} </div>
            </div>

        );
    }
});
export default PictureList;