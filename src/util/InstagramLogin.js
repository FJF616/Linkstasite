const redirectURI = "http://localhost:3000/"
const client_id = "0d744e65869b4acc8dde4d6e3c6a58e2";
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;

let accessToken;
let instagramUser;


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
        let jsonResponse = await response.json();
        instagramUser = jsonResponse.data.map(info => ({
          id: info.id,
          image: info.images.standard_resolution.url,
          instagramUserID: info.user.id,
          url: info.link,
          title: info.caption ? info.caption.text : '',
          profilePic: info.user.profile_picture,
          userName:info.user.full_name,
          affiliatedLink: '',
          favorite: false,
          access_token: `${accessToken}`,
          likes: info.likes.count,
          tags: info.tags
        }));
        
        return instagramUser 
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
  }
}

export default InstagramLogin;
